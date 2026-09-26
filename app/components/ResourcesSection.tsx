"use client";

import React, { useState, useRef, useEffect } from "react";
import { FileText, ArrowUpRight } from "lucide-react";
import styles from "./ResourcesSection.module.css";
import SectionEyebrow from "./SectionEyebrow";

export const RESOURCES = [
  { name: "Product Catalogue", note: "Full door & frame range" },
  { name: "Fire Door Certificate", note: "IS 3614 documentation" },
  { name: "Technical Datasheets", note: "Per product line" },
  { name: "Door Specifications", note: "Sizes & build-ups" },
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

export default function ResourcesSection() {
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
    <section className={styles.sectionContainer} id="resources">
      {/* ── Centered Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="09 TECHNICAL RESOURCES" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Documents for consultants &", 0, false)}
          {renderStrandplyText("site teams.", 27, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          Catalogues, certificates, datasheets and installation guidelines — shared on request while our automated download library is being populated.
        </p>
      </div>

      {/* ── 4 Column Grid ── */}
      <div className={styles.gridContainer}>
        {RESOURCES.map((r) => (
          <a key={r.name} href="/contact" className={styles.resourceCard}>
            {/* <div className={styles.iconBox}>
              <FileText className={styles.icon} />
            </div> */}
            
            <div className={styles.contentWrapper}>
              <h3 className={styles.cardTitle}>{r.name}</h3>
              <p className={styles.cardDesc}>{r.note}</p>
            </div>

            <span className={styles.requestLink}>
              REQUEST <ArrowUpRight size={14} className={styles.arrowIcon} />
            </span>
          </a>
        ))}
      </div>

      <div className={styles.viewAllWrapper}>
        <a href="/resources" className={styles.viewAllLink}>
          VIEW ALL RESOURCES
        </a>
      </div>
    </section>
  );
}
