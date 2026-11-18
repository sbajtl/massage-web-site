/**
 * Language Hint Module
 * On the Croatian page, offers the English page to visitors whose browser
 * is not set to a language that reads Croatian. No automatic redirect, so
 * search engines always index the Croatian page at "/".
 */

const STORAGE_KEY = 'venera-language-hint-dismissed';

/** Browser languages whose speakers read the Croatian page comfortably */
const READS_CROATIAN = ['hr', 'bs', 'sr', 'sh'];

export class LanguageHint {
    private banner: HTMLElement | null = null;

    constructor() {
        if (this.shouldShow()) this.render();
    }

    private shouldShow(): boolean {
        if (document.documentElement.lang !== 'hr') return false;
        if (this.isDismissed()) return false;

        const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
        return !languages.some(lang => READS_CROATIAN.includes(lang.slice(0, 2).toLowerCase()));
    }

    private isDismissed(): boolean {
        try {
            return localStorage.getItem(STORAGE_KEY) === '1';
        } catch {
            return false;
        }
    }

    private render(): void {
        const banner = document.createElement('aside');
        banner.className = 'language-hint';
        banner.lang = 'en';
        banner.setAttribute('aria-label', 'Language');
        banner.innerHTML = `
            <a class="language-hint-link" href="/en/" hreflang="en">View this page in English</a>
            <button class="language-hint-close" type="button" aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
        `;

        banner.querySelector('.language-hint-close')?.addEventListener('click', () => this.dismiss());

        document.body.prepend(banner);
        document.body.classList.add('has-language-hint');
        this.banner = banner;
        this.syncHeight();
        window.addEventListener('resize', () => this.syncHeight(), { passive: true });
    }

    /** The fixed navbar sits below the banner, so it needs the banner's height */
    private syncHeight(): void {
        if (!this.banner) return;
        document.documentElement.style.setProperty('--language-hint-h', `${this.banner.offsetHeight}px`);
    }

    private dismiss(): void {
        try {
            localStorage.setItem(STORAGE_KEY, '1');
        } catch {
            // Storage blocked: the banner just comes back on the next visit
        }
        this.banner?.remove();
        this.banner = null;
        document.body.classList.remove('has-language-hint');
        document.documentElement.style.removeProperty('--language-hint-h');
    }
}
