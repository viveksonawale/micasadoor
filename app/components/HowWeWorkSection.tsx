"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HowWeWorkSection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const steps = [
  {
    number: "01",
    title: "Raw Material",
    description: "Selected timber and engineered boards enter the Gandhidham unit.",
  },
  {
    number: "02",
    title: "Seasoning / Preparation",
    description: "Material is conditioned and prepared for machining.",
  },
  {
    number: "03",
    title: "Precision Manufacturing",
    description: "Machining, pressing and assembly to production drawings.",
  },
  {
    number: "04",
    title: "Quality Inspection",
    description: "In-process checks on dimensions, bonding and build.",
  },
  {
    number: "05",
    title: "Finishing",
    description: "Sanding, polishing and factory finish systems.",
  },
  {
    number: "06",
    title: "Final Inspection",
    description: "Every door checked before dispatch clearance.",
  },
  {
    number: "07",
    title: "Dispatch",
    description: "Packed, labelled and shipped to project sites.",
  },
  {
    number: "08",
    title: "Professional Installation",
    description: "Fitted by trained teams with site coordination",
  },
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

export default function HowWeWorkSection() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lineProgress, setLineProgress] = useState(0);

  // Strandply Animation Observer
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

  // Step Active Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry to set as active
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px", // Trigger when step is in the upper middle of the screen
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth Progress Line Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the timeline column has scrolled past the middle of the screen
      const startTrigger = windowHeight / 2;
      const scrolled = startTrigger - rect.top;
      const totalScrollable = rect.height;
      
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setLineProgress(progress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentWrapper}>
        
        {/* Header Column (Sticky) */}
        <div className={styles.headerColumn}>
          <SectionEyebrow label="Precision in Every Step" />
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

        {/* Timeline Column (Scrolls naturally) */}
        <div ref={timelineRef} className={styles.timelineColumn}>
          <div className={styles.timelineLine}>
            <div 
              className={styles.timelineProgress} 
              style={{ height: `${lineProgress}%` }}
            />
          </div>
          
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <div 
                  key={step.number} 
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`
                    ${styles.stepItem} 
                    ${isActive ? styles.stepActive : ""} 
                    ${isPast ? styles.stepPast : ""}
                  `}
                >
                  <div className={styles.stepDot} />
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
