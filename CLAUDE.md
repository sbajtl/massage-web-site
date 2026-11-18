# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commit Rules

- NEVER add `Co-Authored-By: Claude` (or any Claude/AI attribution) to commit messages. Commits are authored by the repo owner only.

## Project Overview

Venera Body Care - A single-page responsive website for a massage studio in Galižana, 4 km from Pula, Croatia. Croatian is the main page (`/`), English lives at `/en/`. Sections: hero, services (5 categories, no prices or durations), about, and location with Google Maps.

**Build System:** Vite + TypeScript
**Theme:** Večernje ulje (dark olive, warm amber, linen)

## Running the Site

```bash
# Install dependencies (first time only)
npm install

# Development server with HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# TypeScript type checking
npm run type-check
```

## Architecture

### File Structure
```
venera-web/
├── index.html           # Main page (Vite entry point)
├── main.ts              # Application entry point
├── styles.css           # All styles with CSS variables
├── package.json         # NPM dependencies & scripts
├── tsconfig.json        # TypeScript configuration (strict mode)
├── vite.config.js       # Vite build configuration
├── build/
│   └── i18n-pages.ts    # Vite plugin: renders HR (/) and EN (/en/) pages
├── .gitignore           # Git ignore rules
├── src/                 # Source modules (TypeScript)
│   ├── types.ts         # Type definitions
│   ├── navbar.ts        # Navbar module
│   ├── scroll.ts        # Smooth scroll
│   └── language-hint.ts # "View this page in English" bar
├── i18n/                # Translations (TypeScript)
│   ├── en.ts            # English translations
│   └── hr.ts            # Croatian translations
├── assets/
│   ├── images/          # evening-hands.jpg (hero), evening-oil.jpg (about)
│   └── logos/
│       ├── venera-logo.svg   # Linen to amber gradients
│       └── venera-icon.svg   # Old ocean blue icon (unused)
├── public/              # CNAME, robots.txt, sitemap.xml, og-image.jpg
├── dist/                # Build output (generated)
├── CLAUDE.md            # This file
└── PROGRESS.md          # Progress log
```

### Internationalization (i18n) and SEO

**How it works:**
- Translations are in `i18n/hr.ts` and `i18n/en.ts`; keys are typed in `src/types.ts`
- Pages are rendered per language at build time by `build/i18n-pages.ts` (a Vite plugin):
  - `/` is the Croatian main page, `/en/` is the English page (`dist/en/index.html`)
  - `data-lang="key"` replaces an element's text
  - `data-lang-attr="attr:key;attr:key"` sets attributes (meta content, alt, aria-label, href)
  - `<script type="application/ld+json" data-jsonld>` is filled with the LocalBusiness schema
- The EN/HR button is a plain link between the two pages; there is no client-side text switching
- `src/language-hint.ts` shows a one-line "View this page in English" bar on the Croatian page when the browser language is not hr/bs/sr; dismissal is remembered in localStorage. There is deliberately no automatic redirect, so Google keeps indexing the Croatian page
- The dev server serves `/en/` through the same plugin
- A missing key fails the build

**Adding/modifying translations:**
1. Add the key to `src/types.ts`, `i18n/hr.ts` and `i18n/en.ts`
2. Use it in `index.html` with `data-lang` or `data-lang-attr`

**SEO files:** `public/robots.txt`, `public/sitemap.xml` (update `lastmod` on content changes), `public/og-image.jpg` (1200x630 social preview).

### Styling System

**Theme: Večernje ulje (evening oil)** — a treatment room in the evening: dark olive page, warm amber lamp light, linen text and a linen "treatment menu" card for services. Tokens live on `:root` in `styles.css`.

| Token | Hex | Use |
|-------|-----|-----|
| `--olive` | `#1E2420` | Page background |
| `--olive-deep` | `#161B17` | Footer, scrolled navbar, language hint |
| `--olive-raised` | `#262E28` | Quiet raised surfaces on dark |
| `--amber` | `#C8A15A` | CTA buttons and small accents (sparingly) |
| `--amber-soft` | `#E0C38A` | Amber text on dark |
| `--linen` | `#EDE6D6` | Text on dark, services menu card |
| `--linen-dim` | `#C9C2B1` | Body text on dark |
| `--sage` | `#9AA98B` | Secondary text on dark |
| `--ink` / `--ink-muted` | `#1E2420` / `#59604F` | Text on linen |

**Fonts** (Google Fonts):
- `--font-display`: Gloock (headings)
- `--font-body`: Manrope (body and UI)

**Motion:** one moment only — the amber hero glow brightens once on page load; disabled under `prefers-reduced-motion`. No per-section scroll fade-ins.

### JavaScript Modules

TypeScript modules in `src/`:
- `types.ts` - Translation key types
- `navbar.ts` - Navbar background on scroll, mobile menu (`aria-expanded`), floating contact buttons appear after the hero (`body.past-hero`)
- `scroll.ts` - Smooth scroll to anchors, offset below the fixed navbar
- `language-hint.ts` - English page hint for non-Croatian browsers

### Logo

Original Venera script logo, recoloured to the theme:
- **Venera text**: linen to amber gradient `#F3EDE0` → `#EDE6D6` → `#D9C9A6` → `#C8A15A`
- **Accent**: amber gradient `#D8B678` → `#C8A15A` → `#B08A45`

Logo file: `assets/logos/venera-logo.svg` (navigation). The footer uses a "Venera" wordmark in Gloock.

### Contact Buttons

- **Call**: amber pill in the hero (`tel:+385995929457`)
- **Viber**: brand purple `#7360F2`
- **WhatsApp**: brand green `#1FAF55`
- Floating call/Viber/WhatsApp buttons on mobile only, shown after scrolling past the hero

### Hero Background

Local photo `assets/images/evening-hands.jpg` (lamp and hands) with the amber radial glow on top.

## Location Details

- **Address**: Puljska cesta 49A, 52215 Galižana, Croatia
- **Coordinates**: 44.93193, 13.85698
- **Phone**: +385 99 592 9457
- **Hours**: Every day 8:00 - 21:00
- **Booking**: Phone, Viber, or WhatsApp

Google Maps embed is in the `#location` section iframe.

Note: Some browsers with ad blockers may show `ERR_BLOCKED_BY_CLIENT` for Google Maps CSP test - this is harmless and the map still loads.

## Pending Work

### Content Updates Needed
- [ ] Replace stock photos with real photos of the studio
- [ ] Add real email if one should be shown

### Outside the code (SEO)
- [ ] Google Business Profile: category "Masaža", same name/address/phone, link to the site, photos, hours
- [ ] Collect Google reviews
- [ ] Google Search Console: verify the domain and submit `sitemap.xml`

### Optional Enhancements
- [ ] Add analytics tracking
- [ ] Add more languages if needed (new `i18n/{lang}.ts`, a path in `build/i18n-pages.ts`, hreflang links and sitemap entries)

## Deployment

### Production Build
```bash
npm run build
```

### Deploy
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/` to the `gh-pages` branch (GitHub Pages, custom domain `venera-masaza.hr` via `public/CNAME`).

## Known Issues

- Google Maps may show `ERR_BLOCKED_BY_CLIENT` in console due to ad blockers (harmless, map still works)
