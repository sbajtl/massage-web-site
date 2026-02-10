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
    'site-title': string;
    'nav-home': string;
    'nav-services': string;
    'nav-about': string;
    'nav-location': string;
    'hero-title': string;
    'hero-subtitle': string;
    'hero-text': string;
    'hero-cta': string;
    'services-title': string;
    'services-subtitle': string;
    'service-badge': string;
    // Category titles
    'category-classic-title': string;
    'category-relax-title': string;
    'category-anticellulite-title': string;
    'category-energy-title': string;
    // Classic Massage services
    'service-back': string;
    'service-legs': string;
    'service-hands': string;
    'service-head-face': string;
    'service-full-body': string;
    'service-feet-butter': string;
    // Relax Massage services
    'service-relax-back': string;
    'service-relax-full': string;
    'service-royal': string;
    // Anti-cellulite Program services
    'service-anticellulite': string;
    'service-body-scrub': string;
    'service-paraffin': string;
    'service-cupping': string;
    'service-lymphatic': string;
    // Energy Massage services
    'service-volcanic-back': string;
    'service-volcanic-full': string;
    'service-reflexology': string;
    'service-aroma-back': string;
    'service-aroma-full': string;
    'service-shiatsu': string;
    'service-raindrop': string;
    'service-combo': string;
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
    'location-title': string;
    'location-subtitle': string;
    'address-label': string;
    'phone-label': string;
    'phone-order': string;
    'contact-label': string;
    'contact-desc': string;
    'hours-label': string;
    'hours-every-day': string;
    'footer-tagline': string;
    'footer-rights': string;
}

/**
 * Translations object type
 */
export type Translations = Record<SupportedLanguage, TranslationKeys>;

/**
 * Language change listener callback
 */
export type LanguageChangeListener = (lang: SupportedLanguage) => void;

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
