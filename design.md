# MICASA Doors & Frames — Design System Specification

**Client:** MICASA Doors Pvt. Ltd.
**Scope:** Catalog site — Doors (6 types), Frames (8 materials × finishes, many-to-many)
**Nav:** Home | Doors | Frames | Gallery | About | Contact
**Theme:** Light only. No dark mode.

Decisions locked in for this spec:
- Button radius: **4–6px** (no pill shapes anywhere in the system)
- Hero: **full-bleed photography, minimal overlay**
- Animation: **rich** (parallax-tier, paced off strandplyosb.com — visual language is our own)

---

## 1. Color Palette

Colors were extracted by pixel-sampling the actual logo file (not eyeballed):
measured brand orange clusters at **#FD7600** (pure/median tone) and **#FC7302**
(average including gradient shading). The wordmark's metallic lettering samples at
**#BABBBF** (highlight) / **#67696C** (shadow) — reused below as a secondary
"graphite" accent for hardware/hinge iconography, tying UI chrome back to the
logo's own metal treatment.

Everything else (warm neutrals, semantic states) is derived mathematically from
that orange, not invented separately, so the palette reads as one family.

| Token | Hex | Role | Rationale |
|---|---|---|---|
| `--color-bg` | `#FBF7F2` | Page background | Warm ivory, not pure white — reads as "wood-adjacent" without using brown |
| `--color-surface` | `#FFFFFF` | Cards, nav (scrolled), modals | Pure white against the ivory bg creates a subtle lift for surfaces, no shadow needed to separate them |
| `--color-surface-alt` | `#F2ECE3` | Alternating sections (image/text rhythm) | One step warmer/darker than bg, for the alternating-section rhythm borrowed from the reference site |
| `--color-border` | `#E3DBCE` | Dividers, input borders, card outlines | Warm beige-gray, visible on both bg and surface without reading as "gray UI" |
| `--color-text-primary` | `#1C1712` | Headings, body copy | Warm near-black (18% brown-black mix) instead of `#000` — softer, on-brand with wood tones. 16.7:1 contrast on bg |
| `--color-text-secondary` | `#6B5F52` | Captions, meta text, nav labels | Warm mid-gray. 5.8:1 contrast on bg — passes AA for normal text |
| `--color-text-muted` | `#8A7D6E` | De-emphasized labels only | 3.76:1 on bg — **use only at 18px+/bold**, not for body-size copy (fails AA at small sizes) |
| `--color-accent` | `#FD7600` | Primary brand color — CTAs, links, active states, price highlights | The logo's core orange, used at full strength as the single brand accent |
| `--color-accent-hover` | `#DF6800` | Hover state on accent elements | Accent darkened 12% toward black |
| `--color-accent-active` | `#C55C00` | Pressed/active state | Accent darkened 22% toward black |
| `--color-accent-tint` | `#FFF1E6` | Badges, subtle section highlights, selected-finish swatch background | Accent mixed 10% into white |
| `--color-accent-tint-subtle` | `#FFF7F0` | Hover background on ghost buttons/list rows | Accent mixed 6% into white |
| `--color-graphite` | `#64605E` | Hardware/hinge icons, fine dividers, secondary UI accents | Logo's metallic shadow tone, warmed 25% to sit inside the palette |
| `--color-graphite-light` | `#A7A4A3` | Disabled states, hairline rules on dark imagery | Logo's metallic highlight tone, warmed 20% |
| `--color-error` | `#B3261E` | Form validation only | Muted brick-red — reads as "wood-adjacent red" (like a rosewood tone), not a jarring alert red |
| `--color-success` | `#3F6B3F` | Form validation / confirmation only | Muted forest green, same treatment as error — semantic only, never decorative |

**Rule:** `--color-accent` is the *only* saturated color in the system. Graphite and
the semantic error/success tokens exist strictly for function (hardware icons, form
feedback) — never used for decorative emphasis, badges, or illustration fills.

**Button text on accent:** Primary buttons use `--color-text-primary` (#1C1712) as
label color on the `#FD7600` background, **not white**. White-on-#FD7600 measures
2.7:1 contrast — fails WCAG AA. Dark text on the same background measures 6.6:1.
This keeps the exact brand orange usable everywhere without a separate "accessible
button shade."

---

## 2. Typography

**Display/Headings:** Playfair Display (700 for h1–h3, 600 for h4–h6)
**Body/UI:** Inter (400 body, 500 UI labels, 600 buttons/nav)

**Why Inter pairs with Playfair Display:**
- **Personality contrast:** Playfair Display is a high-contrast transitional serif
  with dramatic thin/thick strokes and ball terminals — it carries the brand
  "voice." Inter is a neutral, low-contrast grotesque with almost no personality
  of its own, so it never competes with the serif for attention — it just does the
  job of being legible.
- **x-height compatibility:** Inter was built with a tall x-height tuned for screen
  legibility at small sizes. Set next to Playfair Display's relatively open,
  large x-height, body copy doesn't look cramped or shrunken sitting under a
  serif headline at similar visual weight.
- **Weight range:** Inter ships 100–900 as a variable font, so body/UI/buttons can
  each get a distinct optical weight (400/500/600) without introducing a third
  typeface.
- **Numerals:** Inter's tabular figures keep price tables and spec sheets
  (dimensions, finish codes) aligned in columns — Playfair Display's numerals are
  display-oriented and wrong for that job.

**Font stack:**
```
--font-display: "Playfair Display", Georgia, serif;
--font-body: "Inter", -apple-system, "Segoe UI", sans-serif;
```

**Type scale** (desktop / mobile):

| Token | Size (desktop) | Size (mobile) | Line-height | Weight | Font |
|---|---|---|---|---|---|
| h1 (hero) | 56px | 36px | 1.1 | 700 | Playfair Display |
| h2 (section title) | 40px | 28px | 1.15 | 700 | Playfair Display |
| h3 (subsection) | 32px | 24px | 1.2 | 600 | Playfair Display |
| h4 (card/product title) | 24px | 20px | 1.25 | 600 | Playfair Display |
| h5 (minor heading) | 20px | 18px | 1.3 | 600 | Inter |
| h6 (eyebrow/overline) | 13px | 13px | 1.4 | 600 | Inter, uppercase, letter-spacing 0.08em |
| body-lg (intro paragraphs) | 18px | 17px | 1.65 | 400 | Inter |
| body (default) | 16px | 16px | 1.6 | 400 | Inter |
| body-sm (UI text, nav) | 14px | 14px | 1.5 | 500 | Inter |
| caption | 12px | 12px | 1.45 | 500 | Inter, letter-spacing 0.02em |

**Line-height rule:** headings stay tight (1.1–1.3) since Playfair Display's
open letterforms need less breathing room; body copy stays relaxed (1.5–1.65)
for long-form readability (About page, product descriptions); captions sit at
1.4–1.45 minimum even at small size, never tighter.

---

## 3. Spacing & Layout

**Base unit:** 8px. All spacing is a multiple of this.

```
--space-1: 4px    (tight icon/label gaps — half-step exception)
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
--space-7: 64px
--space-8: 96px
--space-9: 128px
```

**Breakpoints:**

| Name | Range |
|---|---|
| mobile | 0–639px |
| tablet | 640–1023px |
| desktop | 1024–1439px |
| wide | 1440px+ |

**Container:**
- Max-width: 1200px, centered
- Side padding: 20px (mobile) / 32px (tablet) / 64px (desktop)
- Grid: 4 columns (mobile) / 8 columns (tablet) / 12 columns (desktop), 24px gutter

**Section rhythm:** 48px (`--space-6`) vertical padding between sections on
mobile, 96px (`--space-8`) on desktop — matches the generous alternating-section
pacing from the reference site.

---

## 4. Components

### Buttons

Radius scale (per your decision — no pill shapes anywhere):
```
--radius-sm: 4px   (inputs, tags, small thumbnails)
--radius-md: 6px   (buttons)
--radius-lg: 12px  (cards, modals, larger surfaces)
```

| Variant | Background | Text | Border | Radius | Padding |
|---|---|---|---|---|---|
| Primary | `--color-accent` | `--color-text-primary` | none | 6px | 14px 28px |
| Secondary (outline) | transparent | `--color-text-primary` | 1.5px `--color-text-primary` | 6px | 14px 28px |
| Ghost | transparent | `--color-accent` | none | 6px | 12px 16px |

**States:**
- Hover — Primary: bg → `--color-accent-hover`, `translateY(-2px)`, 150ms ease-out
- Active/pressed — Primary: bg → `--color-accent-active`, `scale(0.98)`, 100ms
- Secondary hover: bg fills `--color-surface-alt`
- Ghost hover: bg → `--color-accent-tint-subtle`, text underlines
- Focus-visible (all): 2px outline, `--color-accent-active`, 2px offset
- Disabled: 40% opacity, no pointer events, no hover transform

### Cards (product/door/frame cards)

- Background: `--color-surface`
- Radius: `--radius-lg` (12px)
- Border: 1px `--color-border` **or** shadow-only elevation — pick shadow-only
  for a lighter, more premium feel:
  `box-shadow: 0 1px 2px rgba(28,23,18,0.04), 0 8px 24px rgba(28,23,18,0.06)`
- Image fills top of card edge-to-edge, `border-radius` applied only to top
  corners (12px 12px 0 0) — image itself is never separately rounded/framed
- Padding (text area below image): 24px
- Hover: `translateY(-4px)`, shadow deepens to
  `0 4px 8px rgba(28,23,18,0.06), 0 16px 32px rgba(28,23,18,0.10)`, 200ms
  ease-out, product image inside scales `1.0 → 1.04` (400ms, contained by
  `overflow: hidden`) — signals "inspect" without needing a lightbox click

### Nav bar

- Height: 80px desktop / 64px mobile
- **State 1 — top of page (over full-bleed hero):** transparent background,
  logo/text rendered in white/cream, no border/shadow
- **State 2 — scrolled past 80px:** background snaps to `--color-surface`,
  1px bottom border in `--color-border`, subtle shadow
  `0 2px 12px rgba(28,23,18,0.06)`, logo swaps to full-color version, text
  switches to `--color-text-primary`. Transition: 220ms ease on
  background-color/color/box-shadow, driven by scroll position, not a hard
  toggle at a single pixel value (small hysteresis band to avoid flicker)
- Active nav link: 2px underline in `--color-accent`, width animates
  0→100% on hover/active, 200ms — no filled pill/background on nav items
- **Mobile (<1024px):** hamburger icon, right-aligned. Tap opens full-screen
  drawer, slides in from right, 280ms ease, background `--color-surface`,
  stacked links at `h5` size, minimum 48px tap target per item

### Form inputs

- Height: 48px, radius `--radius-sm` (4px)
- Border: 1px `--color-border`, background `--color-surface`
- Padding: 12px 16px, font: Inter 16px (16px minimum avoids iOS auto-zoom)
- Focus: border → `--color-accent`, 2px focus ring in `--color-accent-tint`,
  150ms transition
- Label: 14px medium, `--color-text-secondary`, 6px gap above input
- Error state: border → `--color-error`, helper text 13px in `--color-error`
- Helper/caption text: 13px, `--color-text-secondary`, 6px gap below input

---

## 5. Animation Guidelines

Tier: **Rich** — parallax-level, paced against strandplyosb.com's rhythm, but
built on our own easing/visual language (no pill CTAs, no generic centered hero
motion copied from the reference).

**Standard easing tokens:**
```
--ease-standard: cubic-bezier(0.16, 1, 0.3, 1);   /* fast-out, gentle settle — used for reveals */
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);      /* state toggles: nav bg, drawer open/close */
```

**What triggers what:**

| Trigger | Effect | Duration | Notes |
|---|---|---|---|
| Section enters viewport (20% threshold) | Fade + rise: `opacity 0→1`, `translateY 24px→0` | 600ms, `--ease-standard` | Children stagger 80–100ms apart |
| Hero on page load | Eyebrow → headline → subtext → CTA fade/rise in sequence | 500ms each, 80ms stagger | Runs once, not scroll-triggered |
| Hero background image, on scroll | Parallax: background translates at 0.3–0.4× scroll speed | tied to scroll position | **Disabled below 768px width** — replaced with static image (parallax on touch scroll feels janky and costs battery) |
| Stat-counter strip enters viewport | Count up 0 → target value | 1400–1800ms, ease-out | Fires once only, never re-triggers on re-scroll |
| Product carousel | Horizontal snap-scroll, drag on desktop, native swipe on mobile | per-drag | Centered item at scale 1.0, adjacent items 0.94 scale / 0.7 opacity, 300ms |
| Card hover | Lift + shadow deepen + image scale 1.04 | 200–400ms | See Cards section above |
| Button hover/press | Lift / darken / scale | 100–150ms | See Buttons section above |
| Nav scroll-state change | Background/text/shadow crossfade | 220ms, `--ease-inout` | — |

**What NOT to animate:**
- No auto-looping/auto-advancing motion anywhere by default. If the product
  carousel auto-advances at all, it's ≥6s interval, pauses on hover/touch, and
  is fully disabled under reduced motion.
- No bounce/elastic/spring easing — reads playful, wrong for a premium wood
  brand.
- No parallax on text or CTA buttons — only background imagery moves; anything
  the user reads or clicks stays pinned and stable.
- No color/gradient animation on every scroll frame beyond the single nav
  background toggle.
- Respect `prefers-reduced-motion: reduce` globally: disable parallax, replace
  scroll-reveals with instant `opacity` swaps, keep only functional
  hover/focus feedback at near-zero duration.

---

## 6. Imagery Direction

Hard constraint says the reference site's *centered-text, full-bleed stock-photo*
hero reads generic — but you've chosen full-bleed. The way this stays premium
and not templated is composition and subject, not layout:

- **Composition:** asymmetric crop, not centered. Product/material occupies the
  right two-thirds (or a diagonal split); headline sits left-aligned in the
  remaining third, low or middle in the frame — not vertically/horizontally
  centered like a generic template.
- **Overlay:** a single-direction gradient scrim behind the text block only
  (e.g. left-to-right or bottom-to-top), not a flat dark layer over the whole
  photo — the image stays visible and detailed outside the text zone.
- **Subject matter:** close, tactile shots of actual craftsmanship — door grain
  macro texture, frame joinery corners, hinge/hardware detail. Not generic
  "family in a living room" lifestyle stock, and not cool-toned architectural
  renders (avoid the reference site's snow-mountain render aesthetic entirely —
  it's cool/blue, the opposite of the warm-wood mandate here).
- **Lighting:** warm, directional, single soft key light — like raking
  late-afternoon window light across grain, to bring out texture and depth.
  Avoid flat, evenly-lit catalog lighting (cheap) and avoid cool/blue studio
  lighting (breaks the warm-wood feel outright).
- **Color grading:** consistent warm white balance (~3200–3600K look) across
  every shoot, slightly lifted blacks (avoid crushed shadows). Consistency
  matters most for the Frames catalog, where 8 materials × multiple finishes
  need to look like one coherent system, not ad-hoc photos shot at different
  times.
- **Finish/material shots:** same angle, same lighting rig, same crop for every
  material swatch — so comparing finishes feels systematic, like a real
  materials library, not a stock photo grid.
- **Aspect ratios:** hero 21:9 (desktop) / 4:5 safe-crop (mobile); product
  cards 4:3; gallery/detail shots 1:1.
- **Avoid outright:** hand-turning-a-door-handle stock clichés, empty staged
  rooms with no product focus, any cool/blue-toned imagery, drop shadows or
  glossy "3D render" product cutouts — everything should look photographed and
  material-first, not illustrated.
