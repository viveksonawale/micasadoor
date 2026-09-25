"use client";

import React, { useState, useRef, useEffect } from "react";
import { Factory, Layers, Flame, Wrench, Trees, Gauge } from "lucide-react";
import styles from "./WhyUsSection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const REASONS = [
  { icon: Factory, title: "Manufacturing Expertise", desc: "A dedicated production unit running controlled, stage-gated manufacturing." },
  { icon: Gauge, title: "12,000+ Door Capacity", desc: "Production scale for large developments without losing batch consistency." },
  { icon: Trees, title: "Multiple Wood Options", desc: "Teak, Red Meranti, Steamed Beech and Pine — matched to budget." },
  { icon: Layers, title: "Engineered Frames", desc: "LVL, BWP and Marine grade frames engineered for dimensional stability." },
  { icon: Flame, title: "Certified Fire Doors", desc: "IS 3614 certified wooden fire doors with full documentation support." },
  { icon: Wrench, title: "Expert Installation", desc: "From measurement to final inspection — fitted by trained teams." },
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

export default function WhyUsSection() {
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
    <section className={styles.sectionContainer} id="why-us">
      {/* ── Centered Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="06 WHY MICASA" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Built like a manufacturer.", 0, false)}
          {renderStrandplyText("Not a trader.", 25, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          We control the entire process from timber selection to final finish, ensuring absolute accountability.
        </p>
      </div>

      <div className={styles.gridContainer}>
        {REASONS.map((r, i) => (
          <div key={r.title} className={styles.featureCard}>
            <div className={styles.iconBox}>
              <r.icon className={styles.icon} />
            </div>
            <h3 className={styles.cardTitle}>{r.title}</h3>
            <p className={styles.cardDesc}>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
