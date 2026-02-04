/**
 * Navbar Module
 * Handles navbar scroll effects and mobile menu
 */

export class Navbar {
    private navbar: HTMLElement;
    private hamburger: HTMLElement | null;
    private navMenu: HTMLElement | null;

    constructor() {
        this.navbar = document.getElementById('navbar')!;
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    private init(): void {
        this.initScrollEffect();
        this.initMobileMenu();
        this.initActiveLinkHighlight();
    }

    /**
     * Add scroll effect to navbar
     */
    private initScrollEffect(): void {
        const SCROLL_THRESHOLD = 50;

        window.addEventListener('scroll', () => {
            this.navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
        }, { passive: true });
    }

    /**
     * Initialize mobile menu functionality
     */
    private initMobileMenu(): void {
        if (!this.hamburger) return;

        // Toggle menu on hamburger click
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking on a link
        this.navMenu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target) return;
            const target = e.target as Element;
            if (!target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu open/close
     */
    private toggleMobileMenu(): void {
        this.hamburger?.classList.toggle('active');
        this.navMenu?.classList.toggle('active');
    }

    /**
     * Close mobile menu
     */
    private closeMobileMenu(): void {
        this.hamburger?.classList.remove('active');
        this.navMenu?.classList.remove('active');
    }

    /**
     * Highlight active navigation link based on scroll position
     */
    private initActiveLinkHighlight(): void {
        const sections = document.querySelectorAll<HTMLElement>('section[id]');
        const LINK_ACTIVE_OPACITY = '1';
        const LINK_INACTIVE_OPACITY = '0.6';

        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = this.navMenu?.querySelector<HTMLAnchorElement>(`a[href="#${sectionId}"]`);

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navMenu?.querySelectorAll('a').forEach(link => {
                        link.style.opacity = LINK_INACTIVE_OPACITY;
                    });
                    navLink?.style.setProperty('opacity', LINK_ACTIVE_OPACITY);
                }
            });
        }, { passive: true });
    }
}
