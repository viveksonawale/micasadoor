"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FactoryStorySection.module.css";
import NewSectionEyebrow from "./NewSectionEyebrow";

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

interface FactoryStoryProps {
  eyebrow?: string;
  subtitle?: string;
  image?: string;
}

export default function FactoryStorySection({
  eyebrow = "03 PRECISION IN EVERY STEP",
  subtitle = "Our manufacturing unit in Gandhidham, Gujarat runs a controlled stage-gated process so the thousandth door matches the first.",
  image = "/factory/factory-team.jpg",
}: FactoryStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.sectionContainer} id="about">
      <div className={styles.layoutGrid}>
        {/* Left Column (Sticky) */}
        <div className={styles.stickyColumn}>
          <div className={styles.stickyContent}>
            <NewSectionEyebrow label={eyebrow} />
            <h2 className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}>
              {renderStrandplyText("From raw timber ", 0, false)}
              {renderStrandplyText("to installed door.", 13, true)}
            </h2>
            <p className={styles.sectionSubtitle}>
              {subtitle}
            </p>
            <div className={styles.imageWrapper}>
              <img
                src={image}
                alt="Team handling board stacks at the Micasa manufacturing unit, Gandhidham"
                className={styles.factoryImage}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column (Scrolls first, vertical timeline steps) */}
        <div className={styles.scrollColumn}>
          <div className={styles.timelineContainer}>
            {isVisible && (
              <>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineLineFill}></div>
              </>
            )}
            
            {STEPS.map((step, index) => (
              <div
                key={step.n}
                className={`${styles.stepItem} ${isVisible ? styles.animateItem : ''}`}
                style={{ "--step-i": index } as React.CSSProperties}
              >
                {isVisible && (
                  <div className={styles.stepMarker}>
                    <div className={styles.stepInnerDot} />
                  </div>
                )}
                
                <p className={styles.stepNumber}>{step.n}</p>
                <h3 className={styles.stepTitle}>{step.t}</h3>
                <p className={styles.stepDescription}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


