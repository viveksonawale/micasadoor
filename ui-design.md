# MICASA — Website Design System

**Status:** v1 draft — overview level, to be refined as we build.
**Stack:** Next.js
**Companion file:** `color-palette.md` (CSS variables for `global.css`)

---

## 1. Design Direction

You picked "all of the above" for mood — here's how that resolves into one coherent language instead of four competing ones:

**"Confident Industrial-Premium"**

- **Base layer (Clean & Premium):** Generous white space, light neutral backgrounds (`#f1f2f3`), restrained use of color — most of the page is quiet so the orange means something when it shows up.
- **Structure layer (Corporate/Technical, à la Metanoia):** Mega-menu navigation, numbered "how it works" process blocks, stat counters, "Us vs. Industry" comparison tables. This is what makes the site feel credible and linked to Metanoia's visual family without copying it.
- **Energy layer (Bold & Industrial):** Primary CTAs, key numbers, active states, and section dividers use the full-strength brand orange (`#e14401`) at high contrast — heavier font weights on headlines, not thin corporate type.
- **Texture layer (Warm & Earthy):** Reserved for imagery — product/timber photography, background tints (`#fed193`), and section backgrounds where you want the material itself (wood grain, board texture) to breathe. Earthy tone lives in photography and accents, not in UI chrome.

Rule of thumb: **structure and layout borrow from Metanoia/Strandply's professionalism; color and weight borrow from the logo's boldness; photography and select backgrounds carry the warmth.**

---

## 2. Typography

**Recommendation: Sora (headings) + Inter (body)**

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / H1 | Sora | 700–800 | Geometric, bold, slightly technical — matches the logo's angular "M" |
| H2–H4 | Sora | 600–700 | Same family, lighter weight for hierarchy |
| Body / paragraphs | Inter | 400–500 | Neutral, extremely readable at small sizes, safe for long product copy |
| UI labels / buttons | Inter | 600 | Slightly heavier for tap targets |
| Stats / big numbers | Sora | 800 | For "7000+ sheets/day" style counters |

Why this pairing: Sora gives you the punchy, slightly industrial character for headlines (echoes the diagonal cuts in the MICASA "M"), while Inter keeps body copy calm and corporate-credible like Metanoia's site — avoiding the generic AI-generated feel of the current client site.

**Alternative body font** if you want more warmth: Manrope (rounder, friendlier than Inter, still professional).

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');

:root {
  --font-heading: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

### Type Scale

| Token | Size | Line Height | Use |
|---|---|---|---|
| `--text-xs` | 12px | 1.4 | fine print, labels |
| `--text-sm` | 14px | 1.5 | captions, meta |
| `--text-base` | 16px | 1.6 | body copy |
| `--text-lg` | 18px | 1.6 | lead paragraphs |
| `--text-xl` | 22px | 1.4 | H4 |
| `--text-2xl` | 28px | 1.3 | H3 |
| `--text-3xl` | 36px | 1.2 | H2 |
| `--text-4xl` | 48px | 1.1 | H1 |
| `--text-5xl` | 64px | 1.05 | Hero headline (desktop) |

---

## 3. Color System

Full token list lives in `color-palette.md`. Quick reference for this doc:

| Token | Hex | Role |
|---|---|---|
| `--color-primary-base` | `#e14401` | Brand anchor — CTAs, links, active nav |
| `--color-primary` | `#fd7101` | Secondary orange |
| `--color-primary-light` | `#fd8c0b` | Accents, icons |
| `--color-primary-lightest` | `#fed193` | Soft backgrounds, badges |
| `--color-primary-dark` | `#a11e00` | Hover states |
| `--color-primary-darker` | `#7c1a02` | Active/pressed, focus rings |
| `--color-neutral-100` | `#f1f2f3` | Page background |
| `--color-neutral-300` | `#8d8f93` | Borders, muted text |
| `--color-neutral-700` | `#525152` | Body text |

**Usage discipline:** No more than one saturated-orange element per "view" above the fold (one hero CTA, or one highlighted stat — not both competing). This keeps the bold color feeling premium instead of loud.

---

## 4. Spacing Scale

8px base unit — consistent rhythm across sections, cards, and components.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |
| `--space-32` | 128px |

**Section padding:** `--space-24` top/bottom on desktop, `--space-12` on mobile — matches the generous breathing room seen on both reference sites.

---

## 5. Border Radius — Mixed System

Per your choice: sharp on structural elements, rounded on interactive ones.

| Token | Value | Applied to |
|---|---|---|
| `--radius-none` | 0px | Section dividers, full-bleed image blocks, stat blocks |
| `--radius-sm` | 4px | Cards, panels, tables, form containers |
| `--radius-md` | 8px | Inputs, small tags/badges |
| `--radius-full` | 999px | Buttons (primary/secondary), pills, avatar/icon chips |

This mix is what gives you the "industrial + premium" feel simultaneously — flat, confident card edges, but tactile, friendly pill-shaped buttons that invite the click.

---

## 6. Elevation / Shadows

Keep shadows minimal — this is a materials/engineering brand, not a soft SaaS product.

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.06);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 12px 32px rgba(0,0,0,0.12);
--shadow-focus: 0 0 0 3px rgba(225,68,1,0.35); /* primary-base at 35% */
```

Use `--shadow-sm` for resting cards, `--shadow-md` on hover, `--shadow-lg` only for modals/dropdowns (like a mega-menu panel).

---

## 7. Buttons

### Primary Button
```css
.btn-primary {
  background: var(--color-primary-base);
  color: #ffffff;
  font-family: var(--font-body);
  font-weight: 600;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  border: none;
  transition: background 0.2s ease, transform 0.15s ease;
}
.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
}
.btn-primary:active {
  background: var(--color-primary-darker);
  transform: translateY(0);
}
.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}
.btn-primary:disabled {
  background: var(--color-neutral-300);
  color: var(--color-neutral-100);
  cursor: not-allowed;
  transform: none;
}
```

### Secondary Button (outline)
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary-base);
  border: 1.5px solid var(--color-primary-base);
  border-radius: var(--radius-full);
  padding: 14px 28px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: var(--color-primary-base);
  color: #ffffff;
}
```

### Ghost / Tertiary (nav links, "View All →" style like Metanoia)
```css
.btn-ghost {
  color: var(--color-neutral-700);
  font-weight: 500;
  border-bottom: 1.5px solid transparent;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.btn-ghost:hover {
  color: var(--color-primary-base);
  border-color: var(--color-primary-base);
}
```

---

## 8. Cards

```css
.card {
  background: #ffffff;
  border: 1px solid var(--color-neutral-100);
  border-radius: var(--radius-sm);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

Product cards (OSB/board-type cards, like Strandply's product carousel) should use a **sharp top edge, image bleeding to the card's edges**, with only the content padding rounded slightly — mirrors how both reference sites present product tiles.

---

## 9. Forms & Inputs

```css
.input {
  border: 1.5px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: var(--text-base);
  background: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input:focus {
  border-color: var(--color-primary-base);
  box-shadow: var(--shadow-focus);
  outline: none;
}
.input::placeholder {
  color: var(--color-neutral-300);
}
.input-error {
  border-color: var(--color-primary-darker);
}
```

---

## 10. Navigation --> not needed similar to meta just reference

Borrowing Metanoia's mega-menu structure (Products → sub-categories in columns) but styled with MICASA's palette:

- Sticky header, white background, `--shadow-sm` on scroll only.
- Logo left, nav center/right, one primary CTA button ("Get a Quote" / "Contact Us") always visible top-right.
- Dropdown/mega-menu panel: white background, `--radius-sm`, `--shadow-lg`, category columns with a bold Sora heading + Inter sub-links (same pattern as Metanoia's Products mega-menu).
- Active/hover nav item: text turns `--color-primary-base`, with a thin animated underline (2px, primary-base, scale-in from center on hover).

---

## 11. Signature Components (from reference sites, restyled) --> depends on their requirements

### Stat Counter Block (Strandply-style)
Large Sora numeral (`--text-5xl`, `--color-primary-base`) + small Inter caption below (`--color-neutral-700`). Used in a 3-column row, sharp-edged section (`--radius-none`), light gray or dark background alternating with white sections for rhythm.

### "Why MICASA" / Comparison Table (Metanoia-style)
Two-column "Industry Challenges vs. MICASA Advantage" layout. Left column neutral/muted, right column highlighted with a subtle `--color-primary-lightest` background tint and a checkmark icon in `--color-primary-base`.

### Process Steps ("How We Work")
Numbered steps (01–04), alternating image/text layout, connected by a thin vertical line in `--color-neutral-300` with the active/passed step's number circle filled in `--color-primary-base`.

---

## 12. Motion & Transitions

Keep it subtle and mechanical — not bouncy. This is an engineering-materials brand.

| Property | Duration | Easing |
|---|---|---|
| Color/background changes | 200ms | `ease` |
| Hover lift (cards/buttons) | 150–250ms | `ease-out` |
| Menu/dropdown open | 250ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page section reveal on scroll | 400–600ms | `ease-out`, fade + 16px translate-Y |

Avoid: springy/bouncy easing, spinning icons, anything playful — save personality for color and photography, not motion.

---

## 13. Grid & Breakpoints

| Breakpoint | Width | Columns | Gutter |
|---|---|---|---|
| Mobile | < 640px | 4 | 16px |
| Tablet | 640–1024px | 8 | 24px |
| Desktop | 1024–1440px | 12 | 32px |
| Wide | > 1440px | 12 (max-width 1280–1400px container) | 32px |

---

## 14. Imagery Guidelines

- Real product/material photography (timber, OSB texture, boards) over stock/generic renders — this is the single biggest fix versus the current AI-generated client site, which likely leans on generic or placeholder visuals.
- Warm, natural color grading on photography (let the wood tones carry warmth) while UI chrome stays clean/neutral.
- Consistent image treatment: no drop shadows on photos, subtle bottom gradient overlay only where text sits on top of an image (for legibility), matching Strandply's full-bleed hero pattern.

---

## 15. Open Items / To Refine Later

- [ ] Final icon set (recommend a single consistent line-icon library — e.g. Phosphor or Lucide — rather than mixed styles)
- [ ] Dark-mode / dark-section treatment (both reference sites use occasional dark bands — decide if MICASA does too)
- [ ] Confirm whether Tailwind CSS will be layered on top of Next.js (this doc's tokens map directly into a `tailwind.config` theme if so)
- [ ] Logo lockup rules (min size, clear space, on-dark vs on-light version)
- [ ] Accessibility pass: confirm text/background contrast ratios once real copy and image overlays are in place

---

## 16. Color Pallete
- Reference color-palette.md [text](color-palette.md)
- its our global.css i will use same 