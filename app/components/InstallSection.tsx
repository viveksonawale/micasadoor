"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./InstallSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import BeforeAfter from "./BeforeAfter";

const FLOW = [
  "Measurement",
  "Production",
  "Delivery",
  "Site Coordination",
  "Professional Installation",
  "Final Inspection",
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

export default function InstallSection() {
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
    <section className={styles.sectionContainer} id="installation">
      {/* ── Centered Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="07 PROFESSIONAL INSTALLATION" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Manufactured right.", 0, false)}
          {renderStrandplyText("Installed right.", 19, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          A door only performs as well as its fitting. Our teams handle measurement, delivery, site coordination and professional installation — closing the loop between factory and finished opening.
        </p>
      </div>

      {/* ── Split Content ── */}
      <div className={styles.splitContainer}>
        {/* Left: Process Flow */}
        <div className={styles.flowColumn}>
          <div className={styles.flowList}>
            {FLOW.map((step, index) => (
              <div key={step} className={styles.flowRow}>
                <span className={styles.flowNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.flowTitle}>{step}</h3>
              </div>
            ))}
          </div>

          <button className={styles.primaryButton}>
            REQUEST INSTALLATION SUPPORT
          </button>
        </div>

        {/* Right: Architectural Image (Before & After) */}
        <div className={styles.imageColumn}>
          <BeforeAfter
            beforeImg="https://images.unsplash.com/photo-1541888087611-66521dd9f2d1?q=80&w=1200&auto=format&fit=crop"
            afterImg="https://images.unsplash.com/photo-1541888087611-66521dd9f2d1?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}
