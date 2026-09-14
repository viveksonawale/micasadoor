# Section Generation Rules

Any agent generating or modifying website sections in this project must follow these rules:

1. **Mandatory Heading Highlight Questioning:**
   - Whenever creating or modifying a section heading, the agent MUST ask the user which word or phrase should be highlighted with the orange accent (`#e14401`) if not already specified.

2. **Typography & Hierarchy (Strict adherence to ProjectsSection):**
   - Headings (`h2`): `var(--font-playfair, serif)`, font-size `48px` (mobile `36px`), font-weight `700`, line-height `1.1`, letter-spacing `-0.02em`.
   - Subtitles (`p`): `var(--font-dm-sans, sans-serif)`, font-size `20px` (mobile `16px`), color `var(--color-text-secondary, #666)`, line-height `1.6`, margin-bottom `32px`.
   - Eyebrow: `<SectionEyebrow label="..." />`.

3. **Mandatory Motion & On-Load Animation:**
   - Headings MUST always implement the signature Strandply character-reveal animation using `renderStrandplyText` and `IntersectionObserver`.

4. **Card Border Radius & Spacing:**
   - Container max width `1600px`, desktop gutter `48px`, tablet `36px`, mobile `20px`.
   - Section vertical padding: `80px 0`.
   - Card border radius: `var(--radius-xl, 28px)`.
