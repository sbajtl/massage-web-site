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

        const update = (): void => {
            this.navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
            // Floating contact buttons appear once the hero call button is out of view
            document.body.classList.toggle('past-hero', window.scrollY > window.innerHeight * 0.7);
        };

        window.addEventListener('scroll', update, { passive: true });
        update();
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
        const isOpen = this.navMenu?.classList.toggle('active') ?? false;
        this.hamburger?.classList.toggle('active', isOpen);
        this.hamburger?.setAttribute('aria-expanded', String(isOpen));
    }

    /**
     * Close mobile menu
     */
    private closeMobileMenu(): void {
        this.hamburger?.classList.remove('active');
        this.hamburger?.setAttribute('aria-expanded', 'false');
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
