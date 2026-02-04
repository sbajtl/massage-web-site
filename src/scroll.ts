/**
 * Scroll Module
 * Handles smooth scroll and scroll animations
 */

export class SmoothScroll {
    constructor() {
        this.init();
    }

    private init(): void {
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    private handleClick(e: MouseEvent): void {
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');

        if (href === '#' || href === '#!') return;

        const target = document.querySelector<HTMLElement>(href!);
        if (target) {
            e.preventDefault();
            this.scrollTo(target);
        }
    }

    private scrollTo(target: HTMLElement): void {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

export class ScrollAnimations {
    private observerOptions: IntersectionObserverInit;
    private observer: IntersectionObserver;

    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersect(entries),
            this.observerOptions
        );
        this.init();
    }

    private init(): void {
        // Observe service cards, features, and info items with staggered delay
        const animatedElements = document.querySelectorAll<HTMLElement>(
            '.service-card, .feature, .info-item'
        );

        animatedElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.classList.add('animate-on-scroll');
            this.observer.observe(el);
        });

        // Observe section headers
        document.querySelectorAll<HTMLElement>('.section-header').forEach(el => {
            el.classList.add('animate-on-scroll');
            this.observer.observe(el);
        });
    }

    private handleIntersect(entries: IntersectionObserverEntry[]): void {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }
}
