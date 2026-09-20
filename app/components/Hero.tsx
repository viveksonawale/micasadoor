"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import styles from "./Hero.module.css";

const renderStrandplyLine = (lineText: string, startIndex: number = 0) => {
  let currentIndex = startIndex;
  const words = lineText.split(" ");

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span key={wordIndex} className={styles.wordWrapper}>
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

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if preloader was already shown (in case component mounts after event fired)
    if (typeof window !== 'undefined' && sessionStorage.getItem('micasa-preloader-shown')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }

    const handlePreloaderDone = () => setIsReady(true);
    window.addEventListener('preloaderDone', handlePreloaderDone);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('preloaderDone', handlePreloaderDone);
    };
  }, []);

  const line1 = "Doors Built to Last.";
  const line2 = "Delivered to Scale";
  const line1CharCount = line1.replace(/\s/g, "").length;

  return (
    <section className={`${styles.heroSection} ${!isReady ? styles.heroWaiting : ""}`}>
      {/* Background Image Container with Zoom Parallax */}
      <div
        className={styles.bgContainer}
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <Image
          src="/hero-image/hero.avif"
          alt="MICASA Precision Engineered Wood Door Manufacturing Facility"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />

        {/* Full-width dark scrim overlay for text visibility */}
        <div className={styles.scrimOverlay} />
      </div>

      {/* Content Container (Center aligned) */}
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          
          {/* Headline with Strandply-exact Character onMount Animation */}
          <h1 className={styles.headline}>
            <div
              className={styles.headlineLine}
              role="img"
              aria-label={line1}
            >
              {renderStrandplyLine(line1, 0)}
            </div>
            <div
              className={styles.headlineLine}
              role="img"
              aria-label={line2}
            >
              {renderStrandplyLine(line2, line1CharCount)}
            </div>
          </h1>

          {/* Inline Small Info Tags */}
          <div className={`${styles.statsGroup} ${styles.animateStats}`}>
            <span className={styles.statItem}>12,000+ Doors/Month</span>
            <span className={styles.statDivider}></span>
            <span className={styles.statItem}>1M+ Doors Delivered</span>
            <span className={styles.statDivider}></span>
            <span className={styles.statItem}>4 Lakh Sq. Ft. Facility</span>
          </div>

          {/* CTAs with Fade Effect */}
          <div className={`${styles.ctas} ${styles.animateCtas}`}>
            <Button href="#explore" variant="primary" size="lg">
              EXPLORE OUR DOORS
            </Button>
            <Button
              href="#quote"
              variant="outline"
              size="lg"
            >
              REQUEST A PROJECT QUOTE
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
