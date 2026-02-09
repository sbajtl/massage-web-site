# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Venera Massage Center - A single-page responsive website for a massage therapy center in Galižana, Croatia. The site supports bilingual content (English/Croatian) and includes sections for services, about, and location with Google Maps integration.

**Build System:** Vite + TypeScript
**Theme:** Coastal Beach (ocean blues, sandy beiges, seafoam accents)

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
├── .gitignore           # Git ignore rules
├── src/                 # Source modules (TypeScript)
│   ├── types.ts         # Type definitions
│   ├── i18n.ts          # i18n service
│   ├── navbar.ts        # Navbar module
│   ├── scroll.ts        # Scroll modules
│   └── language-toggle.ts
├── i18n/                # Translations (TypeScript)
│   ├── en.ts            # English translations
│   └── hr.ts            # Croatian translations
├── assets/
│   └── logos/
│       ├── venera-logo.svg   # Ocean blue gradients
│       └── venera-icon.svg   # Ocean blue gradient
├── dist/                # Build output (generated)
├── CLAUDE.md            # This file
└── PROGRESS.md          # Progress log
```

### Internationalization (i18n)

**How it works:**
- Translations are in `i18n/en.ts` and `i18n/hr.ts` as TypeScript modules
- Elements with `data-lang` attribute get their `textContent` replaced
- Language preference is persisted in `localStorage`
- Type-safe translations with TypeScript interfaces

**Adding/modifying translations:**
1. Edit `i18n/en.ts` and/or `i18n/hr.ts`
2. Add `data-lang="your-key"` to any HTML element you want translated

**Adding a new language:**
1. Create `i18n/{lang}.ts` with the same keys as `en.ts`
2. Update the language toggle logic in `src/language-toggle.ts`

### Styling System

**Theme: Coastal Beach** (inspired by Holden Beach Massage)

| Purpose | Color Name | Hex |
|---------|------------|-----|
| Primary (Ocean) | Main ocean | `#3A7D8C` |
| Primary (Deep) | Deep ocean | `#2C5F6D` |
| Primary (Light) | Aqua blue | `#5FB3BD` |
| Secondary (Sand) | Soft sand | `#E8DFD3` |
| Secondary (Deep) | Deep sand | `#D4C5B0` |
| Secondary (Light) | Light cream | `#F7F3EC` |
| Accent (Seafoam) | Soft seafoam | `#7DB5B8` |
| Accent (Aqua) | Warm aqua | `#6BA5A8` |
| Accent (Light) | Light aqua | `#9DC5C7` |

**Fonts:**
- `--font-heading`: Cormorant Garamond (serif)
- `--font-body`: Montserrat (sans-serif)

### JavaScript Modules

TypeScript modules in `src/`:
- `types.ts` - Type definitions for translations
- `i18n.ts` - Translation service with loading and switching
- `navbar.ts` - Navbar scroll effect (bg changes when scrolled)
- `scroll.ts` - Smooth scroll and scroll animations (IntersectionObserver)
- `language-toggle.ts` - Language switching between EN/HR

### Logo

The logo uses SVG with ocean gradients:
- **Venera text**: Ocean blue gradient `#5FB3BD` → `#3A7D8C` → `#2C5F6D`
- **Massage Center**: Aqua gradient `#9DC5C7` → `#7DB5B8` → `#6BA5A8`

Logo file: `assets/logos/venera-logo.svg`

### Contact Buttons

- **Viber**: Ocean blue gradient (#3A7D8C → #2C5F6D)
- **WhatsApp**: Official green (#25D366 → #128C7E)

### Hero Background

B&W spa image from Unsplash with coastal blue overlay (25-35% opacity)
URL: `https://unsplash.com/photos/FhDeYh4I3Nw/download?force=true`

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
- [ ] Replace Lorem Ipsum text with real service descriptions
- [ ] Add real pricing for services
- [ ] Update working hours if different
- [ ] Add real email (currently: info@venera-massage.hr)
- [ ] Replace placeholder images with real photos

### Optional Enhancements
- [ ] Add favicon
- [ ] Add meta tags for SEO
- [ ] Add Open Graph tags for social sharing
- [ ] Create "View on Google Maps" button
- [ ] Add more languages if needed
- [ ] Add analytics tracking

## Deployment

### Production Build
```bash
npm run build
```

### Deploy `dist/` folder to:
- **Netlify**: Drag & drop `dist/` folder
- **Vercel**: `vercel deploy dist`
- **GitHub Pages**: Push `dist/` to gh-pages branch

## Known Issues

- Google Maps may show `ERR_BLOCKED_BY_CLIENT` in console due to ad blockers (harmless, map still works)
