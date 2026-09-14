# MICASA Section Generation Rules for AI Agents

> **Mandate:** Any AI agent generating or refactoring a section in this project MUST strictly adhere to these rules.

---

## 1. Mandatory Questioning: Heading Highlight Selection
**CRITICAL RULE:** Whenever you are tasked with creating, designing, or adding a new section:
- You **MUST ASK THE USER** which word or phrase in the section heading should be highlighted with the orange brand accent (`var(--color-primary-base, #e14401)` / `.highlight`).
- Do not make an unconfirmed assumption about which word to highlight when introducing new headings unless the user has already specified it.

---

## 2. Layout, Viewport & Spacing Tokens

### 2.1 Section Container
- **Full Width:** `width: 100%; position: relative;`
- **Background:** `var(--color-surface, #ffffff)` or designated section theme.
- **Vertical Spacing:** `padding: 80px 0;` (use `padding: 80px 0 0 0;` only if the bottom element is a full-bleed grid).

### 2.2 Content Wrapper
- **Max Width:** `max-width: var(--container-max-width, 1600px);`
- **Margin:** `margin: 0 auto; margin-bottom: 40px;`
- **Horizontal Responsive Gutters:**
  ```css
  padding: 0 var(--gutter-desktop, 48px);
  
  @media (max-width: 1024px) {
    padding: 0 var(--gutter-tablet, 36px);
  }
  @media (max-width: 640px) {
    padding: 0 var(--gutter-mobile, 20px);
  }
  ```
- **Alignment:** When centered, apply:
  ```css
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ```

### 2.3 Cards & Geometry
- **Card Border Radius:** Must always use `border-radius: var(--radius-xl, 28px);` for modern architectural rounded cards (as standardized in `StatsSection` and `ProductRangeSection`).

---

## 3. Typography Hierarchy

### 3.1 Eyebrow Component
- Always use the dedicated `<SectionEyebrow label="..." />` component.
- The eyebrow container handles its own pill background, orange circular arrow icon, and typography.
- Spacing below eyebrow: `margin-bottom: 24px;`

### 3.2 Section Title (`h2`)
```css
.sectionTitle {
  font-family: var(--font-playfair, serif);
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text-primary, #1a1a1a);
  margin-bottom: 24px;
  line-height: 1.1;
  letter-spacing: -0.02em;
  perspective: 900px;
  transform-style: preserve-3d;
}

@media (max-width: 768px) {
  .sectionTitle {
    font-size: 36px;
  }
}
```

### 3.3 Accent Highlight Color
```css
.highlight {
  color: var(--color-primary-base, #e14401);
}
```

### 3.4 Section Subtitle (`p`)
```css
.sectionSubtitle {
  font-family: var(--font-dm-sans, sans-serif);
  font-size: 20px;
  color: var(--color-text-secondary, #666);
  max-width: 640px; /* or up to 680px-720px when centered */
  line-height: 1.6;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .sectionSubtitle {
    font-size: 16px;
  }
}
```

---

## 4. Mandatory On-Load / On-Scroll Headline Animation

Every section heading **MUST** implement the signature Strandply character reveal animation triggered via `IntersectionObserver`.

### 4.1 React Helper Function
```tsx
const renderStrandplyText = (lineText: string, startIndex: number = 0, isHighlight: boolean = false) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span key={wordIndex} className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}>
        {chars.map((char, charIndex) => {
          const i = wordStartIndex + charIndex;
          return (
            <span
              key={charIndex}
              aria-hidden="true"
              className={styles.strandplyChar}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  });
};
```

### 4.2 Observer Implementation
```tsx
const [isVisible, setIsVisible] = useState(false);
const headerRef = useRef<HTMLHeadingElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.2 }
  );

  const currentRef = headerRef.current;
  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
}, []);
```

### 4.3 Animation CSS
```css
.wordWrapper {
  display: inline-flex;
  white-space: nowrap;
  margin-right: 0.28em;
}

.strandplyChar {
  display: inline-flex;
  opacity: 0.001;
  filter: blur(15px);
  transform: translateY(10px) scale(2);
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter;
}

.animate .strandplyChar {
  animation: strandplyAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--i) * 0.05s + 0.1s);
}

@keyframes strandplyAppear {
  0% {
    opacity: 0.001;
    filter: blur(15px);
    transform: translateY(10px) scale(2);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0) scale(1);
  }
}
```
