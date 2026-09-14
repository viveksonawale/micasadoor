# MICASA Architectural Engineering — UI & Design Rules for AI Agents

> **Audience:** All AI coding agents, subagents, and developers working on this codebase.  
> **Mandate:** These rules MUST be strictly followed across ALL current and future pages, components, and layouts in this project.

---

## 1. Viewport Geometry & Horizontal Margin Rules

### 1.1 Abolishment of Narrow Max-Width Bottlenecks
* **NEVER** use small, arbitrary constraints like `max-width: 1200px` or `max-width: 1240px` on top-level section containers or headers. On modern displays (1440px, 1920px, 2K, 4K), narrow containers create excessive, wasted empty margins on the left and right edges.
* **All sections must utilize the available viewport width** with modern, expansive container sizing.

### 1.2 Layout Tokens (`app/globals.css`)
Agents must consume and adhere to the standardized container and gutter tokens:

```css
:root {
  /* Container & Viewport Scale */
  --container-max-width: 1600px;

  /* Responsive Horizontal Gutters */
  --gutter-mobile: 20px;       /* < 640px */
  --gutter-tablet: 36px;       /* 640px – 1023px */
  --gutter-desktop: 48px;      /* 1024px – 1439px */
  --gutter-wide: 64px;         /* 1440px – 1919px */
  --gutter-ultrawide: 80px;    /* >= 1920px */
}
```

### 1.3 Navigation Header Specification (`Navbar.module.css`)
* Navbars container uses a bounded width centered horizontally:
  ```css
  .container {
    width: 100%;
    max-width: 1240px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  @media (min-width: 640px)  { .container { padding: 0 32px; } }
  @media (min-width: 1024px) { .container { padding: 0 40px; } }
  ```
* **Result:** The brand logo is kept at its normal size on the left, while the navigation links and CTA button sit comfortably within a centered 1240px container instead of stretching across the entire monitor.

### 1.4 Content Sections & Future Page Guidelines
All section containers (e.g., catalog, product showcases, feature comparisons, contact forms) must be structured with:
```css
.sectionContainer {
  width: 100%;
  max-width: var(--container-max-width, 1600px);
  margin: 0 auto;
  padding-left: var(--gutter-mobile);
  padding-right: var(--gutter-mobile);
}

@media (min-width: 640px)  { .sectionContainer { padding-left: var(--gutter-tablet); padding-right: var(--gutter-tablet); } }
@media (min-width: 1024px) { .sectionContainer { padding-left: var(--gutter-desktop); padding-right: var(--gutter-desktop); } }
@media (min-width: 1440px) { .sectionContainer { padding-left: var(--gutter-wide); padding-right: var(--gutter-wide); } }
@media (min-width: 1920px) { .sectionContainer { padding-left: var(--gutter-ultrawide); padding-right: var(--gutter-ultrawide); } }
```

---

## 2. Typography & Color Tokens

### 2.1 Font Hierarchy
* **Headings (`h1`–`h6`):** `var(--font-playfair)` (Playfair Display, serif) — elegant, high-contrast architectural character.
* **Body / UI Labels / Buttons:** `var(--font-inter)` (Inter, sans-serif) — neutral, highly legible at all scales.

### 2.2 Brand Colors (`color-palette.md`)
* **Primary Brand Core:** `--color-primary-base: #e14401` (Main CTA, active states, key highlights).
* **Hover Accent:** `--color-primary-dark: #a11e00` (Hover fills, deep state accents).
* **Active / Focus:** `--color-primary-darker: #7c1a02` (Pressed states, focus rings).
* **Backgrounds & Neutrals:**
  * App background: `--color-neutral-100: #f1f2f3`
  * Text body: `--color-neutral-700: #525152`
  * Headings: `--color-neutral-900: #2b2a2b`
  * Pure White: `--color-white: #ffffff`
  * Deep Dark: `--color-black: #1a1a1a`

---

## 3. Signature Motion & Animation Standards (Strandply OSB Benchmarks)

### 3.1 Headline On-Mount Text Reveal
Extracted directly from [Strandply OSB](https://www.strandplyosb.com/):
* **Execution:** Triggered strictly **ONCE on page mount** (`trigger: 'onMount'`), NEVER in an infinite loop.
* **Structure:** Group words in `.wordWrapper` to prevent responsive hyphenation breaks; split characters into `.strandplyChar`.
* **Properties:**
  * Initial state: `opacity: 0.001; filter: blur(15px); transform: translateY(10px) scale(2);`
  * Transition: `0.8s cubic-bezier(0.16, 1, 0.3, 1)` (spring physics: damping 40, stiffness 200, mass 1).
  * Stagger: `animation-delay: calc(var(--i) * 0.05s + 0.1s);`
  * Settled state: `opacity: 1; filter: blur(0px); transform: translateY(0px) scale(1);`

### 3.2 Button Interaction Architecture (`Button.module.css`)
* **Geometry:** Tactile pill radius `border-radius: var(--radius-full);`.
* **Expanding Circle Hover Effect:**
  * An internal `.circleFill` span sits at `bottom: -8px; left: 50%; transform: translate(-50%, 50%) scale(0)`.
  * On `:hover`: Springs outward to `scale(28)` via `transition: transform 0.52s cubic-bezier(0.16, 1, 0.3, 1)` (damping: 30, stiffness: 180), smoothly flooding the button background.
  * Inner text is elevated with `position: relative; z-index: 2;` and slightly lifts `translateY(-1px)`.
* **Active Press:** `transform: scale(0.97)` on click.
* **Variants:**
  * `primary`: `#e14401` background with `#a11e00` expanding circle fill.
  * `outline`: White translucent border (`rgba(255, 255, 255, 0.65)`) with white expanding circle fill, turning text to `#1a1a1a` on hover.

---

## 4. Universal Page Development Checklist for Subagents

When creating or modifying ANY new page or section:
1. `[ ]` **Width Check:** Verify container uses `width: 100%` and `max-width: 1600px` (or `max-width: 100%` for navigation headers).
2. `[ ]` **Margin / Gutter Check:** Verify that content extends comfortably across the screen, respecting the `--gutter-*` tokens rather than leaving empty 300px+ side gutters.
3. `[ ]` **Typography:** Apply `var(--font-playfair)` to headings and `var(--font-inter)` to body copy.
4. `[ ]` **CTA Buttons:** Use the `<Button />` component with `variant="primary"` or `variant="outline"` to preserve the Strandply expanding circle animation.
5. `[ ]` **Smooth Scroll:** Do not interfere with the Lenis smooth scroll provider mounted in `app/layout.tsx`.
