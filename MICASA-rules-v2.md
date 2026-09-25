# MICASA — UI & Design Rules for AI Coding Agents

## 0. Purpose & Authority

These rules are the visual and layout source of truth for the MICASA website.

**Audience:** All AI coding agents, subagents, and developers working on this codebase.

**Core mandate:** Preserve the existing MICASA visual identity and functionality. When adapting reference code, implement the requested structure or features using the existing MICASA design system rather than replacing it with the reference site's styling.

### Source-of-truth hierarchy

1. **Existing application functionality and routing** — preserve unless a requested change requires it.
2. **`app/globals.css`** — source of truth for colors, global typography variables, spacing, container tokens, and shared visual tokens already implemented there.
3. **This `rules.md`** — source of truth for layout behavior, page architecture, geometry, responsive behavior, and AI-agent constraints.
4. **Reference implementation (`ref-micasa`) / Emergent code** — reference for structure, content hierarchy, feature ideas, and requested visual composition only. It must not override the MICASA design system.

---

# 1. Master Layout System

## 1.1 Navbar Defines the Master Horizontal Grid

The **navbar establishes the master content width of the entire website**.

This is a critical architectural rule.

The same horizontal container/grid must be used consistently from the top of the website through the main content and footer.

The following should visually align to the same left and right boundaries:

- Navbar content
- Hero text
- Page titles
- Section content
- Text blocks
- Images that are not intentionally full-bleed
- Cards and grids
- Forms
- Tables
- CTA sections
- Footer content

### Goal

The website should feel like **one designed system**, not a collection of independently built components.

Do NOT create a situation where:

- the navbar uses one width,
- one section uses another,
- an image uses another,
- and the footer uses another.

That destroys visual consistency and makes the site feel assembled rather than authored.

### Mental model

```text
Viewport
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    NAVBAR                           │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    SECTION                          │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    SECTION                          │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                    FOOTER                           │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

All major content remains centered.

## 1.2 Centering

The master container must remain horizontally centered:

```css
margin-inline: auto;
```

Use the existing container/gutter variables from `app/globals.css`.

Do not create arbitrary page-specific horizontal margins when the shared container system can be used.

## 1.3 Width Rules

Use the existing layout tokens from `app/globals.css`.

Current master tokens:

```css
--container-max-width: 1600px;

--gutter-mobile: 20px;
--gutter-tablet: 36px;
--gutter-desktop: 48px;
--gutter-wide: 64px;
--gutter-ultrawide: 80px;
```

Do not introduce random values such as:

```css
max-width: 1180px;
max-width: 1200px;
max-width: 1240px;
padding-left: 73px;
margin-left: 91px;
```

unless there is a specific, documented component-level reason.

The objective is a consistent architectural grid, not arbitrary pixel positioning.

---

# 2. Navbar

## 2.1 Preserve Functionality

The existing navbar is functional and must not be unnecessarily rewritten.

When modifying the navbar, focus on:

- width
- spacing
- alignment
- typography
- sizing
- visual hierarchy
- responsive layout

Do NOT unnecessarily change:

- routing
- dropdown functionality
- menu state
- mobile menu logic
- navigation destinations
- existing interaction behavior

## 2.2 Navbar as the Visual Reference

The navbar's horizontal content width is the primary reference for all other page content.

If the navbar's container is adjusted, verify the rest of the website still aligns with it.

Do not allow different pages to introduce competing container widths.

---

# 3. Responsive Design — Required From the Beginning

Every new component and page must be responsive from its first implementation.

Do NOT follow this workflow:

```text
Build desktop
    ↓
Finish everything
    ↓
"Fix mobile later"
```

Instead:

```text
Design component
    ↓
Mobile behavior
    ↓
Tablet behavior
    ↓
Desktop behavior
    ↓
Wide desktop behavior
```

## 3.1 Responsive requirements

Every page must avoid:

- horizontal scrolling
- text overflow
- overlapping content
- broken image crops
- navbar collisions
- buttons overflowing their containers
- fixed-width layouts that break on smaller screens
- excessive empty space
- desktop-only assumptions

Typography, spacing, grids, images, and navigation must adapt intentionally.

## 3.2 Breakpoint behavior

Use the existing project breakpoints and CSS architecture where available.

Do not create a separate breakpoint system for individual pages unless necessary.

---

# 4. Internal Routed Page Architecture

This is the standard pattern for all internal/routed pages.

Examples:

```text
/about
/projects
/doors
/frames
/contact
```

Every internal page should follow the same high-level structure.

## 4.1 Standard internal page structure

```text
NAVBAR
   ↓
FULL-WIDTH IMAGE HERO
   ↓
PAGE TITLE + SUPPORTING DESCRIPTION
   ↓
MAIN PAGE CONTENT
   ↓
NUMBERED SECTIONS
   ↓
FOOTER
```

## 4.2 Internal Page Hero

The internal-page hero must:

- span the full viewport width
- use a large photographic/image background
- have no border radius
- visually establish the page
- contain the page name/title
- optionally contain a supporting description
- use an overlay when necessary for text readability
- maintain responsive image cropping
- sit directly beneath/behind the navbar according to the existing navbar architecture

### Height

Target approximately:

```text
35–45vh
```

on desktop, depending on the composition of the image and amount of text.

Do not force an exact fixed height when the content or responsive layout requires adjustment.

## 4.3 Important distinction: full-width image vs content width

The hero IMAGE may be full-bleed:

```text
████████████████████████████████████████████████
```

But the hero TEXT must follow the master navbar grid:

```text
████████████████████████████████████████████████
     ┌────────────────────────────────────┐
     │ About Micasa                       │
     │ Supporting description              │
     └────────────────────────────────────┘
████████████████████████████████████████████████
```

Do not place hero text using arbitrary left offsets.

## 4.4 About Page as the Reference Pattern

The current `/about` page establishes the intended internal-page pattern:

- full-width manufacturing/architectural image
- dark image overlay
- page title inside the hero
- supporting description
- main content beginning below the hero
- structured sections inside the master content grid

Use this architecture for future routed pages unless a specific page requirement says otherwise.

---

# 5. Section Eyebrows

Major sections should use numbered eyebrows instead of decorative arrow markers.

## 5.1 Format

Use:

```text
01  OUR STORY
02  OUR APPROACH
03  OUR CAPABILITIES
04  WHY MICASA
```

## 5.2 Rules

- Use sequential numbering.
- Use `01`, `02`, `03`, etc.
- Use uppercase section labels where appropriate.
- Use Inter for the eyebrow.
- Keep the eyebrow visually subordinate to the main heading.
- Use the number as the structural marker.
- Do NOT use an arrow such as `→` as the primary section marker.
- Do NOT use decorative arrow icons as a replacement for numbering.
- Do not number every tiny subsection; numbering is for major page sections.

The numbering should communicate structure and progression without becoming visually dominant.

---

# 6. Typography

MICASA uses **two fonts only**.

## 6.1 Heading Font

All headings:

```text
Playfair Display, serif
```

Use the existing project variable:

```css
var(--font-playfair)
```

when available.

This applies to:

- H1
- H2
- H3
- H4
- H5
- H6
- major display headings
- hero page titles

## 6.2 Body/UI Font

Use:

```text
Inter, sans-serif
```

for:

- paragraphs
- navigation
- buttons
- labels
- eyebrows
- metadata
- forms
- supporting UI text

## 6.3 Font Lock

Do NOT introduce additional fonts.

Do NOT replace Playfair Display with:

- Sora
- DM Sans
- Manrope
- Poppins
- Montserrat
- Space Grotesk
- other display fonts

Do NOT replace Inter with another body font.

Do not modify the typography system unless explicitly instructed.

---

# 7. Color System

`app/globals.css` is the authoritative source for the MICASA color system.

Use the existing CSS variables.

Do NOT create a second competing color palette inside individual components or pages.

## 7.1 Brand colors

The existing system includes:

```css
--color-primary-lightest
--color-primary-light
--color-primary
--color-primary-base
--color-primary-dark
--color-primary-darker
```

Use these existing variables rather than hardcoding new brand colors.

## 7.2 Neutrals

Use the existing neutral tokens:

```css
--color-neutral-100
--color-neutral-200
--color-neutral-300
--color-neutral-700
--color-neutral-900
--color-white
--color-black
```

## 7.3 Color lock

Do NOT:

- change the MICASA orange palette
- introduce a new brand accent
- replace the orange with another primary color
- create arbitrary Tailwind colors
- invent new brand gradients
- duplicate color definitions inside components

If a new visual state is required, first reuse an existing semantic token from `global.css`.

Changing the color system requires explicit instruction.

---

# 8. Geometry — Sharp Corners

MICASA uses a **sharp architectural geometry system**.

## 8.1 Global rule

Use:

```css
border-radius: 0;
```

for structural and interactive elements unless a specific existing component has a documented functional reason otherwise.

This includes:

- buttons
- cards
- panels
- images
- forms
- inputs
- badges
- tags
- CTA blocks
- menus
- dropdown panels
- section containers
- image containers

## 8.2 Do NOT use

- pill buttons
- rounded cards
- circular CTA containers
- excessive rounded image masks
- SaaS-style rounded panels
- arbitrary `rounded-lg`
- arbitrary `rounded-xl`
- arbitrary `rounded-full`

The visual language should feel architectural, engineered, and premium.

---

# 9. Buttons

Buttons should be rectangular with sharp corners while retaining refined interaction.

## 9.1 Geometry

```css
border-radius: 0;
```

Buttons should have:

- clear rectangular proportions
- sufficient horizontal/vertical padding
- strong typography
- clear hierarchy
- MICASA brand colors

## 9.2 Primary button

Use the existing primary color token:

```css
var(--color-btn-primary-bg)
```

Hover:

```css
var(--color-btn-primary-hover)
```

Active:

```css
var(--color-btn-primary-active)
```

## 9.3 Animation

Buttons SHOULD have subtle, premium interaction.

Good options include:

- smooth background-color transition
- darker orange hover state
- subtle vertical movement
- subtle text movement
- restrained background sweep
- understated scale/press response

Animation should feel:

- mechanical
- architectural
- controlled
- premium

Avoid:

- bouncy animations
- playful spring effects
- oversized expanding circles
- excessive scaling
- spinning effects
- flashy gradients

The existing button animation may be retained/refined if it fits the new sharp rectangular geometry.

**Important:** removing rounded geometry does NOT mean removing button interaction.

---

# 10. Cards & Content Blocks

Cards and content blocks should follow the same sharp architectural language.

Default:

```css
border-radius: 0;
```

Use:

- clean rectangular edges
- restrained borders
- minimal shadows
- strong spacing
- clear typography

Avoid excessive SaaS-style elevation.

If a component uses an image, the image may bleed to the edges of the content block.

---

# 11. Spacing

Use the existing spacing system from `app/globals.css`.

Current scale:

```css
--space-1
--space-2
--space-3
--space-4
--space-6
--space-8
--space-12
--space-16
--space-24
--space-32
```

Prefer these shared tokens over arbitrary values.

## 11.1 Spacing discipline

MICASA should have generous editorial spacing, but empty space must be intentional.

Do NOT add huge blank gaps merely to make a page feel premium.

Spacing should respond to:

- content hierarchy
- image composition
- section importance
- viewport size
- responsive layout

---

# 12. Imagery

Use high-quality real architectural/product/manufacturing imagery whenever available.

Preferred subjects:

- timber
- doors
- frames
- manufacturing
- architecture
- interiors
- material details
- finished projects

## 12.1 Image treatment

Images should generally:

- remain rectangular
- have no border radius
- use consistent aspect ratios where appropriate
- use `object-fit: cover` when used as a visual block
- use a subtle dark overlay when text is placed over the image

Do not add unnecessary filters, heavy shadows, or artificial effects.

---

# 13. Reference Implementation / Emergent Code

A reference implementation may be placed in:

```text
ref-micasa/
```

or another clearly separated reference directory.

It may contain extracted Emergent code.

## 13.1 What reference code is for

Use reference code to understand:

- page structure
- section ordering
- content hierarchy
- component ideas
- desired features
- approximate composition
- interaction concepts
- requested changes from the client

## 13.2 What reference code is NOT

Reference code is NOT the source of truth for:

- fonts
- colors
- border radius
- container widths
- spacing tokens
- navbar architecture
- existing project functionality
- global CSS
- responsive architecture

## 13.3 Adapt — do not blindly copy

When implementing a reference feature:

```text
Reference implementation
        ↓
Understand required structure/function
        ↓
Map it to MICASA components
        ↓
Use existing MICASA tokens
        ↓
Implement in current project
```

Do NOT simply copy the reference CSS/Tailwind classes into the production project.

Do NOT allow the reference implementation to introduce a second visual system.

---

# 14. Existing Functionality Must Be Preserved

When modifying an existing page:

- preserve working routes
- preserve working interactions
- preserve existing navigation behavior
- preserve existing dropdown behavior
- preserve existing mobile behavior
- preserve existing data flow
- preserve existing components where possible

Do not rewrite an entire page when a targeted modification is sufficient.

## Modification philosophy

Prefer:

```text
Existing component
      ↓
Targeted modification
      ↓
Preserve working behavior
```

instead of:

```text
Existing component
      ↓
Delete everything
      ↓
Rebuild from reference
```

Only restructure major architecture when the requested change genuinely requires it.

---

# 15. Page-to-Page Consistency

All pages must feel like part of the same website.

Maintain consistency in:

- navbar width
- content alignment
- footer width
- typography
- colors
- button geometry
- eyebrow structure
- section spacing
- image treatment
- responsive behavior
- interaction style

A page must not look like it was designed by a different system.

## Visual authenticity rule

If one component is visually much wider/narrower than neighboring components without a deliberate reason, correct it.

If one page has different outer margins from another page without a deliberate reason, correct it.

If the footer does not align with the navbar/content grid, correct it.

---

# 16. Footer

The footer follows the same master horizontal grid as the navbar and main content.

Its internal content should align to the same centered container.

Do not give the footer an unrelated max-width.

The footer may use a full-width background, but its content must follow the site's master grid.

---

# 17. Motion & Interaction

MICASA motion should be:

- subtle
- smooth
- deliberate
- architectural
- premium

Prefer:

```text
200–500ms
ease-out / custom smooth easing
```

for most interface transitions.

Avoid:

- excessive bounce
- playful spring animations
- spinning elements
- distracting continuous animations
- animation that interferes with usability
- animation everywhere

Motion should support hierarchy and interaction rather than become the visual identity itself.

---

# 18. Accessibility & UX

Every new component should maintain:

- readable contrast
- visible focus states
- keyboard accessibility
- semantic HTML
- usable tap targets
- responsive text
- meaningful image alt text where applicable

Do not sacrifice usability for visual effects.

---

# 19. AI Agent Workflow for New Pages

When asked to create or modify a page, follow this sequence.

### Step 1 — Inspect

Inspect:

- current page
- current components
- `app/globals.css`
- existing shared layout components
- navbar
- footer
- relevant reference code

### Step 2 — Identify the requested change

Separate:

```text
Required functionality
Required layout
Required visual changes
Existing functionality that must remain
```

### Step 3 — Establish the master grid

Before creating new sections, determine the same container width used by the navbar.

All major content must align to it.

### Step 4 — Build responsive structure

Implement:

```text
Mobile
Tablet
Desktop
Wide desktop
```

as part of the initial implementation.

### Step 5 — Apply MICASA design system

Use:

- Playfair Display
- Inter
- existing `global.css` colors
- existing spacing tokens
- sharp corners
- numbered eyebrows
- consistent buttons
- shared container system

### Step 6 — Compare against reference

Use `ref-micasa` to verify that the requested structure/features have been carried over.

Do NOT copy its visual system blindly.

### Step 7 — Verify consistency

Check:

- navbar alignment
- left/right content edges
- hero
- section spacing
- footer alignment
- typography
- colors
- buttons
- mobile behavior
- tablet behavior
- desktop behavior

---

# 20. Centered Header Pattern

All new sections must follow the standard centered header pattern exactly as defined below. This ensures typographic consistency and perfectly centered alignments across all pages.

## 20.1 Structure

Every new section header must consist of three centered elements in this exact order:
1. **Eyebrow**: A `SectionEyebrow` component with the section number (e.g. `04 SECTION NAME`).
2. **Heading**: The `H2` section title.
3. **Subheading**: A `p` description.

## 20.2 CSS Implementation

The wrapper must use the `headerWrapper` class to center everything:
```css
.headerWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: var(--container-max-width, 1600px);
  margin: 0 auto;
  margin-bottom: 48px;
  padding: 0 var(--gutter-desktop, 48px);
}
```

## 20.2 Heading Animation (Strandply Effect)

All section headings (`H2`) must use the **Strandply scroll-triggered character animation**. 
This creates a premium, staggered 3D reveal effect as the user scrolls to the section.

### TSX Implementation:
1. Define the `renderStrandplyText` helper function (which splits text into animated spans).
2. Use `IntersectionObserver` to detect when the header enters the viewport and set an `isVisible` state.
3. Apply the `.animate` class to the `H2` dynamically.
4. Pass the text to `renderStrandplyText`, using `isHighlight: true` on the final keyword to color it with the primary brand color.

### CSS Implementation:
The title must use the `sectionTitle` class with 3D perspective enabled:
```css
.sectionTitle {
  font-family: var(--font-playfair, serif);
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text-primary, #1a1a1a);
  margin-bottom: 20px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  perspective: 900px;
  transform-style: preserve-3d;
}
```

Include the standard Strandply CSS classes (`wordWrapper`, `highlight`, `strandplyChar`) and the `@keyframes strandplyAppear` in the component's module CSS to handle the staggered blur and 3D rotation reveal.

## 20.3 Subtitle Implementation

The subtitle must use the `sectionSubtitle` class (Inter):
```css
.sectionSubtitle {
  font-family: var(--font-inter, sans-serif);
  font-size: 17px;
  color: var(--color-text-secondary, #666);
  max-width: 590px;
  line-height: 1.6;
  margin-bottom: 0;
}
```
All of these elements must be perfectly centered on the screen.

---

# 21. Universal Pre-Commit Checklist

Before considering any page complete:

```text
[ ] Navbar functionality is unchanged unless explicitly requested.
[ ] Navbar establishes the master horizontal grid.
[ ] Main content aligns with the navbar.
[ ] Footer aligns with the same master grid.
[ ] Major containers are centered.
[ ] New section headers perfectly follow the 3-part Centered Header Pattern (Eyebrow -> Title -> Subtitle).
[ ] No arbitrary narrow max-width was introduced.
[ ] Internal routed pages use the standard full-width image hero.
[ ] Hero text aligns with the master grid.
[ ] Hero has no border radius.
[ ] Page title uses Playfair Display.
[ ] Body/UI text uses Inter.
[ ] No third font was introduced.
[ ] Major sections use numbered eyebrows where appropriate.
[ ] Arrow-based section eyebrows were not introduced.
[ ] Buttons have sharp corners.
[ ] Cards have sharp corners.
[ ] Images have sharp corners.
[ ] No unnecessary border-radius values were introduced.
[ ] Existing MICASA color variables are used.
[ ] No competing color palette was introduced.
[ ] Button animation is subtle and premium.
[ ] No playful/bouncy animation was introduced.
[ ] Mobile layout has been tested.
[ ] Tablet layout has been considered.
[ ] Desktop layout has been tested.
[ ] Wide-screen alignment has been considered.
[ ] No horizontal overflow exists.
[ ] Existing routes and functionality still work.
[ ] Reference code did not override the MICASA design system.
[ ] No unnecessary full-page rewrite was performed.
```

---

# 22. Final Non-Negotiable Rules

When there is ambiguity, follow these principles:

1. **Navbar width defines the master website grid.**
2. **All major content remains centered and aligned to that grid.**
3. **The same visual structure must continue from navbar to footer.**
4. **Every internal route begins with a full-width photographic hero and page title.**
5. **Hero image can be full-bleed; hero text follows the master grid.**
6. **Build responsive behavior from the beginning, not as a later repair.**
7. **Playfair Display is mandatory for headings.**
8. **Inter is mandatory for body/UI text.**
9. **Use only the existing MICASA color system from `app/globals.css`.**
10. **Do not create a competing design system.**
11. **Use sharp 0px geometry throughout the interface.**
12. **Buttons remain rectangular and may use refined interaction animation.**
13. **Major section eyebrows use sequential numbers instead of arrows.**
14. **Preserve existing functionality unless the user explicitly requests a functional change.**
15. **Reference/Emergent code informs structure and requirements; it does not override MICASA styling.**
16. **Prefer targeted modifications over unnecessary rewrites.**
17. **Every new component must belong visually and responsively to the same MICASA system.**

**MICASA should feel like one coherent architectural website — not a collection of independently generated pages.**
