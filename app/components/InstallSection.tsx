"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./InstallSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import Button from "./Button";
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
      <div className={styles.contentWrapper}>
        <SectionEyebrow label="07 PROFESSIONAL INSTALLATION" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Manufactured right. ", 0, false)}
          {renderStrandplyText("Installed right.", 18, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          A door only performs as well as its fitting. Our teams handle measurement, delivery, site coordination and professional installation  closing the loop between factory and finished opening.
        </p>
      </div>

      {/* ── Split Content ── */}
      <div className={styles.splitContainer}>
        {/* Left: Process Flow */}
        <div className={styles.flowColumn}>
          <div className={styles.flowList}>
            {FLOW.map((step, index) => (
              <Link key={step} href="/contact" className={styles.flowRow}>
                <div className={styles.flowLeft}>
                  <span className={styles.flowNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.flowTitle}>{step}</h3>
                </div>
                <span className={styles.flowArrow} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <Button href="/contact" variant="primary" size="lg" className={styles.primaryButton}>
            REQUEST INSTALLATION SUPPORT
          </Button>
        </div>

        {/* Right: Architectural Image (Before & After) */}
        <div className={styles.imageColumn}>
          <BeforeAfter
            beforeImg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
            afterImg="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}



