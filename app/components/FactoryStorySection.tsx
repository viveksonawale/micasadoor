"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FactoryStorySection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const STEPS = [
  { n: "01", t: "Raw Material", d: "Selected timber and engineered boards enter the Gandhidham unit." },
  { n: "02", t: "Seasoning / Preparation", d: "Material is conditioned and prepared for machining." },
  { n: "03", t: "Precision Manufacturing", d: "Machining, pressing and assembly to production drawings." },
  { n: "04", t: "Quality Inspection", d: "In-process checks on dimensions, bonding and build." },
  { n: "05", t: "Finishing", d: "Sanding, polishing and factory finish systems." },
  { n: "06", t: "Final Inspection", d: "Every door checked before dispatch clearance." },
  { n: "07", t: "Dispatch", d: "Packed, labelled and shipped to project sites." },
  { n: "08", t: "Professional Installation", d: "Fitted by trained teams with site coordination." },
];

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

export default function FactoryStorySection({ eyebrow = "03 PRECISION IN EVERY STEP" }: { eyebrow?: string }) {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className={styles.sectionContainer}>
      
      {/* Centered Header */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label={eyebrow} />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("From ", 0, false)}
          {renderStrandplyText("raw timber ", 5, true)}
          {renderStrandplyText("to ", 15, false)}
          {renderStrandplyText("installed door.", 18, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          Our end-to-end process ensures that every product leaving our Gandhidham unit meets the highest standards of architectural precision.
        </p>
      </div>

      <div className={styles.timelineContainer}>
        {/* Connecting Line */}
        <div className={styles.timelineLine} />

        <div className={styles.timelineGrid}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.stepNode}>
              {/* Square Node */}
              <div className={styles.stepSquare}>
                {step.n}
              </div>

              {/* Text Content */}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.t}</h3>
                <p className={styles.stepDescription}>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
