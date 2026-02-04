/**
 * i18n Service - Internationalization
 * Handles language switching and translations
 */

import type {
    SupportedLanguage,
    TranslationKeys,
    Translations,
    LanguageChangeListener
} from './types';

import enTranslations from '../i18n/en';
import hrTranslations from '../i18n/hr';

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'hr'];
const STORAGE_KEY = 'venera-language';

/**
 * i18n Service Class
 */
class I18nService {
    private translations: Translations;
    private currentLang: SupportedLanguage;
    private listeners: Set<LanguageChangeListener>;

    constructor() {
        this.translations = {
            en: enTranslations as TranslationKeys,
            hr: hrTranslations as TranslationKeys
        };
        this.currentLang = this.getStoredLanguage();
        this.listeners = new Set();
    }

    /**
     * Get language from localStorage or detect from browser
     */
    private getStoredLanguage(): SupportedLanguage {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && this.isSupported(stored as SupportedLanguage)) {
            return stored as SupportedLanguage;
        }

        // Auto-detect from browser
        const browserLang = navigator.language.slice(0, 2) as SupportedLanguage;
        return this.isSupported(browserLang) ? browserLang : 'en';
    }

    /**
     * Check if language is supported
     */
    private isSupported(lang: string): lang is SupportedLanguage {
        return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
    }

    /**
     * Get current language
     */
    getLanguage(): SupportedLanguage {
        return this.currentLang;
    }

    /**
     * Get translation for a key
     */
    t<K extends keyof TranslationKeys>(key: K, lang?: SupportedLanguage): string {
        const targetLang = lang || this.currentLang;
        return this.translations[targetLang]?.[key] || key;
    }

    /**
     * Set language and update UI
     */
    async setLanguage(lang: SupportedLanguage): Promise<void> {
        if (!this.isSupported(lang)) {
            console.warn(`Language "${lang}" is not supported`);
            return;
        }

        this.currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;

        this.notifyListeners();
        this.updateUI();
    }

    /**
     * Toggle between languages
     */
    async toggleLanguage(): Promise<void> {
        const newLang: SupportedLanguage = this.currentLang === 'en' ? 'hr' : 'en';
        return this.setLanguage(newLang);
    }

    /**
     * Get the other language (for toggle button)
     */
    getOtherLanguage(): SupportedLanguage {
        return this.currentLang === 'en' ? 'hr' : 'en';
    }

    /**
     * Get label for language toggle button
     */
    getToggleButtonLabel(): string {
        return this.currentLang === 'en' ? 'EN / HR' : 'HR / EN';
    }

    /**
     * Subscribe to language changes
     * Returns unsubscribe function
     */
    subscribe(callback: LanguageChangeListener): () => void {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    /**
     * Notify all listeners of language change
     */
    private notifyListeners(): void {
        this.listeners.forEach(callback => callback(this.currentLang));
    }

    /**
     * Update all translatable elements in the DOM
     */
    private updateUI(): void {
        document.querySelectorAll('[data-lang]').forEach((element) => {
            const key = element.getAttribute('data-lang') as keyof TranslationKeys;
            if (key) {
                const translation = this.t(key);
                if (translation !== key) {
                    element.textContent = translation;
                }
            }
        });
    }

    /**
     * Initialize i18n service
     */
    init(): this {
        document.documentElement.lang = this.currentLang;
        this.updateUI();
        return this;
    }
}

// Export singleton instance
export const i18n = new I18nService().init();

// Export types
export type { SupportedLanguage, TranslationKeys, LanguageChangeListener };
