# MICASA Brand Color Palette

Extracted from the logo, organized into a usable design-system with hover/active states.

## 1. Primary — Orange (Brand Core)

| Role | Hex | Preview |
|---|---|---|
| `--color-primary-lightest` | `#fed193` | pale peach — backgrounds, badges |
| `--color-primary-light` | `#fd8c0b` | light orange — subtle accents, icons |
| `--color-primary` | `#fd7101` | **secondary brand orange** |
| `--color-primary-base` | `#e14401` | **main brand orange (logo "M")** |
| `--color-primary-dark` | `#a11e00` | hover / active state |
| `--color-primary-darker` | `#7c1a02` | pressed / focus-ring / deep accents |

## 2. Neutrals — Grayscale

| Role | Hex | Preview |
|---|---|---|
| `--color-neutral-100` | `#f1f2f3` | app background / cards |
| `--color-neutral-300` | `#8d8f93` | borders, placeholders, muted text |
| `--color-neutral-700` | `#525152` | body text on light bg, dark surfaces |
| `--color-neutral-900` | `#2b2a2b` | *(computed)* headings, high-contrast text |
| `--color-white` | `#ffffff` | *(computed)* pure white |
| `--color-black` | `#1a1a1a` | *(computed)* near-black for max contrast |

## 3. Semantic / State Mapping

| Purpose | Default | Hover | Active/Pressed |
|---|---|---|---|
| Primary Button | `#e14401` | `#a11e00` | `#7c1a02` |
| Secondary Button | `#fd7101` | `#fd8c0b`→`#e14401` | `#a11e00` |
| Accent / Highlight | `#fd8c0b` | `#fd7101` | `#e14401` |
| Light Surface | `#f1f2f3` | `#e5e6e7` *(computed)* | `#d8d9da` *(computed)* |
| Text Muted | `#8d8f93` | — | — |
| Text Body | `#525152` | — | — |
| Link | `#e14401` | `#a11e00` | `#7c1a02` |
| Success (unrelated, computed) | `#2e7d32` | `#1b5e20` | — |
| Error (using dark family) | `#a11e00` | `#7c1a02` | `#5c1201` *(computed)* |

## 4. Ready-to-use `global.css`

```css
:root {
  /* Primary — Orange scale */
  --color-primary-lightest: #fed193;
  --color-primary-light: #fd8c0b;
  --color-primary: #fd7101;
  --color-primary-base: #e14401;
  --color-primary-dark: #a11e00;
  --color-primary-darker: #7c1a02;

  /* Neutrals */
  --color-neutral-100: #f1f2f3;
  --color-neutral-200: #e5e6e7;
  --color-neutral-300: #8d8f93;
  --color-neutral-700: #525152;
  --color-neutral-900: #2b2a2b;
  --color-white: #ffffff;
  --color-black: #1a1a1a;

  /* Semantic tokens */
  --color-bg: var(--color-neutral-100);
  --color-surface: var(--color-white);
  --color-text: var(--color-neutral-700);
  --color-text-muted: var(--color-neutral-300);
  --color-heading: var(--color-neutral-900);

  --color-btn-primary-bg: var(--color-primary-base);
  --color-btn-primary-hover: var(--color-primary-dark);
  --color-btn-primary-active: var(--color-primary-darker);

  --color-btn-secondary-bg: var(--color-primary);
  --color-btn-secondary-hover: var(--color-primary-light);
  --color-btn-secondary-active: var(--color-primary-base);

  --color-link: var(--color-primary-base);
  --color-link-hover: var(--color-primary-dark);

  --color-border: var(--color-neutral-300);
  --color-focus-ring: var(--color-primary-darker);
}
```

## 5. Usage Notes

- **`#e14401`** is the true brand anchor — use it for primary CTAs, active nav items, and key highlights.
- **`#fd7101` / `#fd8c0b`** work well as secondary buttons, icon fills, or gradient stops with the base orange.
- **`#a11e00` / `#7c1a02`** are your natural hover/active/focus states — they're already darker tints of the same hue family, so they stay on-brand without needing extra tools.
- **`#fed193`** is great for soft backgrounds behind orange text/icons (badges, tags, highlight boxes) since it keeps contrast comfortable.
- **`#f1f2f3` / `#8d8f93` / `#525152`** form your neutral text/background scale — light background, muted secondary text, and body/heading text respectively.
- Two computed neutrals (`#e5e6e7`, `#2b2a2b`) and pure white/black were added to round out the scale for hover states on light surfaces and high-contrast headings — swap these if you'd prefer to stick strictly to logo-extracted colors.
