/// <reference types="node" />
/**
 * i18n Pages Plugin
 * Renders one static HTML page per language from index.html, so search
 * engines see real Croatian text at "/" and English text at "/en/".
 *
 * Markup contract:
 * - data-lang="key"                    replaces the element's text
 * - data-lang-attr="attr:key;attr:key"  sets attributes from translations
 * - <script type="application/ld+json" data-jsonld></script>
 *                                      is filled with the business schema
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin, ResolvedConfig } from 'vite';

import type { SupportedLanguage, TranslationKeys } from '../src/types';
import hr from '../i18n/hr';
import en from '../i18n/en';

const SITE_URL = 'https://venera-masaza.hr';

const DICTIONARIES: Record<SupportedLanguage, TranslationKeys> = { hr, en };

/** Path each language is served from; Croatian is the main page */
const LANGUAGE_PATHS: Record<SupportedLanguage, string> = { hr: '/', en: '/en/' };

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function translate(dict: TranslationKeys, key: string, lang: SupportedLanguage): string {
    const value = (dict as unknown as Record<string, string>)[key];
    if (value === undefined) {
        throw new Error(`[i18n-pages] Missing "${key}" in i18n/${lang}.ts`);
    }
    return value;
}

function setAttribute(tag: string, name: string, value: string): string {
    const escaped = escapeHtml(value);
    const existing = new RegExp(`(\\s${name}=)"[^"]*"`);
    if (existing.test(tag)) {
        return tag.replace(existing, `$1"${escaped}"`);
    }
    return tag.replace(/\s*(\/?)>$/, ` ${name}="${escaped}"$1>`);
}

/**
 * Business schema for Google, built from the page's own translations
 */
function buildJsonLd(dict: TranslationKeys, lang: SupportedLanguage): string {
    const t = (key: keyof TranslationKeys): string => dict[key];
    const services = (category: keyof TranslationKeys, items: (keyof TranslationKeys)[]) => ({
        '@type': 'OfferCatalog',
        name: t(category),
        itemListElement: items.map(item => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: t(item) }
        }))
    });

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HealthAndBeautyBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Venera Body Care',
        description: t('meta-description'),
        url: `${SITE_URL}${LANGUAGE_PATHS[lang]}`,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: '+385995929457',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Puljska cesta 49A',
            addressLocality: 'Galižana',
            postalCode: '52215',
            addressRegion: 'Istarska županija',
            addressCountry: 'HR'
        },
        geo: { '@type': 'GeoCoordinates', latitude: 44.93193, longitude: 13.85698 },
        hasMap: 'https://www.google.com/maps/search/?api=1&query=Puljska+cesta+49A%2C+52215+Gali%C5%BEana',
        openingHoursSpecification: [{
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '21:00'
        }],
        areaServed: ['Pula', 'Galižana', 'Vodnjan', 'Fažana'].map(name => ({ '@type': 'City', name })),
        amenityFeature: {
            '@type': 'LocationFeatureSpecification',
            name: t('feature3-title'),
            value: true
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: t('services-title'),
            itemListElement: [
                services('cat-classic', ['svc-classic-full', 'svc-classic-back', 'svc-classic-legs']),
                services('cat-relax', ['svc-relax-full']),
                services('cat-energy', ['svc-reflex', 'svc-shiatsu']),
                services('cat-sport', ['svc-trigger', 'svc-stretch']),
                services('cat-combo', ['combo-relax-name', 'combo-stress-name'])
            ]
        }
    };

    // Keep "</script>" sequences out of the inline script
    return JSON.stringify(schema).replace(/</g, '\\u003c');
}

/**
 * Render a page in the given language. Works on already rendered output too,
 * because the data-lang attributes stay in place.
 */
export function renderPage(html: string, lang: SupportedLanguage): string {
    const dict = DICTIONARIES[lang];

    return html
        .replace(/<html\b[^>]*>/, tag => setAttribute(tag, 'lang', lang))
        .replace(
            /(<([a-z][a-z0-9]*)\b[^>]*\sdata-lang="([^"]+)"[^>]*>)[^<]*(<\/\2>)/g,
            (_match, open: string, _tag: string, key: string, close: string) =>
                open + escapeHtml(translate(dict, key, lang)) + close
        )
        .replace(/<[a-z][a-z0-9]*\b[^>]*\sdata-lang-attr="([^"]+)"[^>]*>/g, (tag: string, spec: string) =>
            spec.split(';').reduce((result, pair) => {
                const [attr, key] = pair.split(':').map(part => part.trim());
                return setAttribute(result, attr, translate(dict, key, lang));
            }, tag)
        )
        .replace(
            /(<script type="application\/ld\+json" data-jsonld>)[\s\S]*?(<\/script>)/,
            (_match, open: string, close: string) => open + buildJsonLd(dict, lang) + close
        );
}

export function i18nPages(): Plugin {
    let config: ResolvedConfig;

    return {
        name: 'venera-i18n-pages',

        configResolved(resolved) {
            config = resolved;
        },

        // The source index.html becomes the Croatian main page
        transformIndexHtml: {
            order: 'pre',
            handler: html => renderPage(html, 'hr')
        },

        // Serve /en/ during development
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = req.url?.split('?')[0];
                if (url === '/en') {
                    res.statusCode = 301;
                    res.setHeader('Location', '/en/');
                    res.end();
                    return;
                }
                if (url !== '/en/' && url !== '/en/index.html') {
                    next();
                    return;
                }
                try {
                    const source = readFileSync(resolve(config.root, 'index.html'), 'utf-8');
                    const html = await server.transformIndexHtml('/en/', source);
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end(renderPage(html, 'en'));
                } catch (error) {
                    next(error);
                }
            });
        },

        // Write dist/en/index.html from the finished Croatian page
        closeBundle() {
            if (config.command !== 'build') return;
            const outDir = resolve(config.root, config.build.outDir);
            const html = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
            mkdirSync(resolve(outDir, 'en'), { recursive: true });
            writeFileSync(resolve(outDir, 'en', 'index.html'), renderPage(html, 'en'));
        }
    };
}
