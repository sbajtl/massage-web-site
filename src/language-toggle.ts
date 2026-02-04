/**
 * Language Toggle Module
 * Handles language toggle button functionality
 */

import { i18n } from './i18n';

type I18nServiceType = typeof i18n;

export class LanguageToggle {
    private i18n: I18nServiceType;
    private button: HTMLElement | null;

    constructor(i18nService: I18nServiceType) {
        this.i18n = i18nService;
        this.button = document.getElementById('langToggle');
        this.init();
    }

    private init(): void {
        if (!this.button) return;

        this.updateButton();
        this.button.addEventListener('click', () => this.handleToggle());

        // Subscribe to language changes
        this.i18n.subscribe(() => this.updateButton());
    }

    private async handleToggle(): Promise<void> {
        await this.i18n.toggleLanguage();
    }

    private updateButton(): void {
        if (this.button) {
            this.button.textContent = this.i18n.getToggleButtonLabel();
        }
    }
}
