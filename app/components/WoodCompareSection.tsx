"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./WoodCompareSection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const WOODS = [
  {
    name: "Teak",
    tone: "#6b4423",
    appearance: "Rich golden-brown, pronounced grain",
    application: "Premium residences, hotels, entrances",
    character: "The classic Indian hardwood",
    use: "Where the door is a design feature",
  },
  {
    name: "Red Meranti",
    tone: "#7c3b26",
    appearance: "Warm reddish-brown, even grain",
    application: "Developer projects, hotels, institutions",
    character: "Balanced premium hardwood",
    use: "Mid-premium projects at scale",
  },
  {
    name: "Steamed Beech",
    tone: "#b98a5e",
    appearance: "Pale, fine and uniform",
    application: "Modern apartments, offices",
    character: "Quiet, contemporary, consistent",
    use: "Painted / laminated modern interiors",
  },
  {
    name: "Pine",
    tone: "#d8b183",
    appearance: "Light, soft grain with knots",
    application: "Bedrooms, internal & wet areas",
    character: "Practical and economical",
    use: "Large internal-door programmes",
  },
];

const renderStrandplyText = (
  lineText: string,
  startIndex: number = 0,
  isHighlight: boolean = false
) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span
        key={wordIndex}
        className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}
      >
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

export default function WoodCompareSection() {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const currentRef = headerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section className={styles.sectionContainer} id="wood-compare">
      {/* ── Centered Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="08 WOOD SELECTION" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Choose the", 0, false)}
          {renderStrandplyText("right wood.", 10, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          Four timbers, four characters. We help you match species, finish and frame to the application — not the other way around.
        </p>
      </div>

      {/* ── 4 Column Grid ── */}
      <div className={styles.gridContainer}>
        {WOODS.map((wood) => (
          <div key={wood.name} className={styles.woodCard}>
            {/* The animated top color bar */}
            <div
              className={styles.woodTone}
              style={{ backgroundColor: wood.tone }}
            />
            
            <h3 className={styles.woodName}>{wood.name}</h3>
            
            <dl className={styles.woodDetails}>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Appearance</dt>
                <dd className={styles.detailValue}>{wood.appearance}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Typical Application</dt>
                <dd className={styles.detailValue}>{wood.application}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Character</dt>
                <dd className={styles.detailValue}>{wood.character}</dd>
              </div>
              <div className={styles.detailRow}>
                <dt className={styles.detailLabel}>Recommended Use</dt>
                <dd className={styles.detailValue}>{wood.use}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
