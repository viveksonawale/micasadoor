"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import IntroGate from "./IntroGate";
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
    if (sessionStorage.getItem("micasa-entered")) {
      setIsReady(true);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Start hero animations only after the IntroGate finishes
    const onGateDone = () => setIsReady(true);
    window.addEventListener("micasa-gate-done", onGateDone);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("micasa-gate-done", onGateDone);
    };
  }, []);

  const line1 = "Doors Built to Last.";
  const line2 = "Delivered to Scale";
  const line1CharCount = line1.replace(/\s/g, "").length;

  return (
    <section className={styles.heroSection}>
      <IntroGate />
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
              {isReady ? renderStrandplyLine(line1, 0) : <span style={{ opacity: 0 }}>{line1}</span>}
            </div>
            <div
              className={styles.headlineLine}
              role="img"
              aria-label={line2}
            >
              {isReady ? renderStrandplyLine(line2, line1CharCount) : <span style={{ opacity: 0 }}>{line2}</span>}
            </div>
          </h1>

          {/* Subheading */}
          <p className={`${styles.subheading} ${isReady ? styles.animateStats : ""}`} style={{ opacity: isReady ? undefined : 0 }}>
            Precision-engineered doors and frames manufactured for projects<br />
            that demand durability, consistency, and scale.
          </p>

          {/* CTAs with Fade Effect */}
          <div className={`${styles.ctas} ${isReady ? styles.animateCtas : ""}`} style={{ opacity: isReady ? undefined : 0 }}>
            <Button href="/doors" variant="primary" size="lg" className={styles.heroButton}>
              EXPLORE OUR DOORS
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className={styles.heroButton}
            >
              REQUEST A PROJECT QUOTE
            </Button>
          </div>

        </div>
      </div>

    </section>
  );
}
