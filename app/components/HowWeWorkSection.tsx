"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HowWeWorkSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import { StackedCards } from "@/components/ui/glass-cards";

const steps = [
  {
    number: "01",
    title: "Raw Material Procurement",
    description: "Selected timber and engineered boards enter the Gandhidham unit.",
    color: "#e14401"
  },
  {
    number: "02",
    title: "Seasoning of Wood",
    description: "Material is conditioned and prepared for machining.",
    color: "#ff7e40"
  },
  {
    number: "03",
    title: "Precision Manufacturing",
    description: "Machining, pressing and assembly to production drawings.",
    color: "#e14401"
  },
  {
    number: "04",
    title: "Finishing with inspection",
    description: "Sanding, polishing, and factory finish systems with rigorous quality checks.",
    color: "#ff7e40"
  },
  {
    number: "05",
    title: "Dispatch",
    description: "Packed, labelled and shipped to project sites.",
    color: "#e14401"
  },
  {
    number: "06",
    title: "Professional Installation",
    description: "Fitted by trained teams with site coordination.",
    color: "#ff7e40"
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
  const [isVisible, setIsVisible] = useState(false);

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

  const cardData = steps.map(s => ({
    id: s.number,
    title: `${s.title}`, // The user said "number and then the heading", so I'll just keep title as title, because we show the number separately as the huge text.
    description: s.description,
    color: s.color,
    image: "/hero-image/hero.avif"
  }));

  return (
    <section className={styles.sectionContainer} id="about" style={{ paddingBottom: 0 }}>

      {/* Centered Header */}
      <div className={styles.headerWrapper}>
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

      {/* DESIGN 3: GSAP Stacking White Cards */}
      <div style={{ width: '100%', marginTop: 0 }}>
        <StackedCards cards={cardData} />
      </div>

    </section>
  );
}
