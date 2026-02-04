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
    'service1-title': string;
    'service1-desc': string;
    'service2-title': string;
    'service2-desc': string;
    'service3-title': string;
    'service3-desc': string;
    'service4-title': string;
    'service4-desc': string;
    'service5-title': string;
    'service5-desc': string;
    'service6-title': string;
    'service6-desc': string;
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
