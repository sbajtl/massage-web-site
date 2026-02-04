# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Venera Massage Center - A single-page responsive website for a massage therapy center in Galižana, Croatia. The site supports bilingual content (English/Croatian) and includes sections for services, about, and location with Google Maps integration.

## Running the Site

Since the site uses `fetch()` to load translation JSON files, it must be served via HTTP - opening `index.html` directly (`file://` protocol) will not work due to CORS restrictions.

```bash
# Python 3
python3 -m http.server 8000

# Node.js with npx
npx serve

# VS Code: Use "Live Server" extension (right-click index.html → "Open with Live Server")
```

Then open `http://localhost:8000` in your browser.

## Architecture

### File Structure
```
venera-web/
├── index.html           # Main HTML with sections: hero, services, about, location, footer
├── styles.css           # All styling with CSS custom properties for theming
├── script.js            # Language switching, navbar scroll, mobile menu, smooth scroll, animations
├── i18n/
│   ├── en.json          # English translations
│   └── hr.json          # Croatian translations
└── assets/
    └── logos/
        ├── venera-logo.svg    # Full logo with "Venera" + "Massage Center"
        └── venera-icon.svg    # Icon-only version
```

### Internationalization (i18n)

**How it works:**
- `script.js` loads translations from `i18n/{lang}.json` via `fetch()`
- Elements with `data-lang` attribute get their `textContent` replaced
- Language preference is persisted in `localStorage`
- Other language is preloaded on page init for faster switching

**Adding/modifying translations:**
1. Edit `i18n/en.json` and/or `i18n/hr.json`
2. Add `data-lang="your-key"` to any HTML element you want translated

**Adding a new language:**
1. Create `i18n/{lang}.json` with the same keys as `en.json`
2. Update the language toggle logic in `script.js` if needed

### Styling System

CSS custom properties (`:root`) define the color scheme:
- `--primary-color`: Main green/sage (#5a7d7c)
- `--secondary-color`: Light green (#8b9d83)
- `--accent-color`: Gold/sand (#d4a574)
- `--text-dark`, `--text-light`, `--text-white`
- `--bg-light`, `--bg-cream`, `--bg-dark`
- `--font-heading`: Cormorant Garamond (serif)
- `--font-body`: Montserrat (sans-serif)

### JavaScript Modules

All code is in `script.js` with these functions:
- `loadTranslations(lang)` - Fetches `i18n/{lang}.json`
- `setLanguage(lang)` - Updates all `data-lang` elements
- `toggleLanguage()` - Switches between EN/HR
- `initNavbar()` - Adds scroll effect (bg changes when scrolled)
- `initMobileMenu()` - Hamburger menu toggle
- `initSmoothScroll()` - Smooth scroll for anchor links
- `initScrollAnimations()` - IntersectionObserver for fade-in animations

### Logo

The logo uses SVG with gradients:
- `logoGradient`: Sage to mint green (main "Venera" text)
- `logoAccent`: Sand to soft gold ("Massage Center" text)

Logo file: `assets/logos/venera-logo.svg`

## Location Details

Current address: Puljska cesta 49A, 52215 Galižana, Croatia
Phone: +385 99 592 9457 (booking by phone only)
Hours: Every day 8:00 - 21:00
Google Maps embed is in the `#location` section iframe.

Note: Some browsers with ad blockers may show `ERR_BLOCKED_BY_CLIENT` for Google Maps CSP test - this is harmless and the map still loads.
