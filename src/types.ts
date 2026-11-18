/**
 * Type Definitions for Venera App
 */

/**
 * Vite Import Meta interface
 */
interface ImportMetaEnv {
    readonly DEV: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly SSR: boolean;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

/**
 * Supported languages
 */
export type SupportedLanguage = 'en' | 'hr';

/**
 * Translation keys schema
 */
export interface TranslationKeys {
    // Page metadata and language switch
    'meta-title': string;
    'meta-description': string;
    'page-url': string;
    'og-locale': string;
    'og-locale-alt': string;
    'lang-switch-label': string;
    'lang-switch-url': string;
    'lang-switch-code': string;
    'lang-switch-aria': string;
    'site-title': string;
    'nav-home': string;
    'nav-services': string;
    'nav-about': string;
    'nav-location': string;
    'nav-aria': string;
    'menu-aria': string;
    'call-aria': string;
    // Hero
    'hero-title': string;
    'hero-text': string;
    'hero-cta': string;
    'book-cta': string;
    'hours-short': string;
    // Services
    'services-title': string;
    'services-subtitle': string;
    // Classic massage
    'cat-classic': string;
    'cat-classic-desc': string;
    'svc-classic-full': string;
    'svc-classic-back': string;
    'svc-classic-legs': string;
    // Relax massage
    'cat-relax': string;
    'cat-relax-desc': string;
    'svc-relax-full': string;
    // Energy massage
    'cat-energy': string;
    'cat-energy-desc': string;
    'svc-reflex': string;
    'svc-shiatsu': string;
    // Sports program
    'cat-sport': string;
    'cat-sport-desc': string;
    'svc-trigger': string;
    'svc-stretch': string;
    // Combinations
    'cat-combo': string;
    'cat-combo-desc': string;
    'combo-relax-name': string;
    'combo-relax-desc': string;
    'combo-stress-name': string;
    'combo-stress-desc': string;
    // About
    'about-title': string;
    'about-text1': string;
    'about-text2': string;
    'about-text3': string;
    'feature1-title': string;
    'feature1-desc': string;
    'feature2-title': string;
    'feature2-desc': string;
    'feature3-title': string;
    'feature3-desc': string;
    'about-img-alt': string;
    // Location
    'location-title': string;
    'location-subtitle': string;
    'address-label': string;
    'hours-label': string;
    'hours-every-day': string;
    'contact-label': string;
    'contact-desc': string;
    'directions-cta': string;
    'map-title': string;
    // Footer
    'footer-tagline': string;
    'footer-rights': string;
}


/**
 * Module interface
 */
export interface IModule {
    init?(): void | Promise<void>;
    destroy?(): void;
}

/**
 * App configuration
 */
export interface AppConfig {
    debug?: boolean;
    modules?: string[];
}
