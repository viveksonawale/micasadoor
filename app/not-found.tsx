"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./not-found.module.css";
import SectionEyebrow from "./components/SectionEyebrow";

export default function NotFound() {
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

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.contentWrapper}>
        <SectionEyebrow label="Error 404" />
        
        <h1 
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Page ", 0)}
          {renderStrandplyText("Not Found", 5, true)}
        </h1>

        <p className={styles.sectionSubtitle}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link href="/" className={styles.homeButton}>
          Return to Home
        </Link>
      </div>
    </section>
  );
}
