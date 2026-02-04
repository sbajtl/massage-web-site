/**
 * Venera Massage Center - Main Application Entry Point
 * A clean, modular SPA implementation with TypeScript
 */

// ===== Import Styles =====
import './styles.css';

// ===== Import Services =====
import { i18n } from './src/i18n';

// ===== Import Modules =====
import { Navbar } from './src/navbar';
import { SmoothScroll, ScrollAnimations } from './src/scroll';
import { LanguageToggle } from './src/language-toggle';

/**
 * Application Class
 * Manages app initialization and lifecycle
 */
class App {
    private modules: Record<string, unknown>;
    private isReady: boolean;

    constructor() {
        this.modules = {};
        this.isReady = false;
    }

    /**
     * Initialize the application
     */
    async init(): Promise<void> {
        if (this.isReady) return;

        try {
            // Initialize core services
            await this.initServices();

            // Initialize UI modules
            this.initModules();

            // Mark as ready
            this.isReady = true;

            console.log('Venera app initialized successfully');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    /**
     * Initialize core services
     */
    private async initServices(): Promise<void> {
        // i18n is already initialized in the module
        // Any additional services can be added here
    }

    /**
     * Initialize UI modules
     */
    private initModules(): void {
        // Initialize navbar
        this.modules.navbar = new Navbar();

        // Initialize smooth scroll
        this.modules.smoothScroll = new SmoothScroll();

        // Initialize scroll animations
        this.modules.scrollAnimations = new ScrollAnimations();

        // Initialize language toggle
        this.modules.languageToggle = new LanguageToggle(i18n);
    }

    /**
     * Get a module by name
     */
    getModule<K extends string>(name: K): unknown {
        return this.modules[name];
    }
}

/**
 * Bootstrap the application when DOM is ready
 */
function bootstrap(): App {
    const app = new App();
    app.init();

    // Expose app globally for debugging (removed in production build)
    if (import.meta.env.DEV) {
        (window as any).app = app;
        (window as any).i18n = i18n;
    }

    return app;
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
} else {
    bootstrap();
}

// Export app instance
export default bootstrap;
