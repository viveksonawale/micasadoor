"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Flame, ShieldCheck, FileBadge } from "lucide-react";
import styles from "./FireSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import Button from "./Button";

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

export default function FireSection() {
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

  const features = [
    "Fire-rated wooden door construction",
    "Fire-rated frame options",
    "Intumescent seal compatibility",
    "Fire-rated hardware compatibility",
    "Professional installation",
    "Project documentation support",
  ];

  const FIRE_PLACEHOLDERS = [
    { label: "Fire Rating", value: "30 / 60 / 90 / 120 MINS" },
    { label: "Thickness", value: "45mm - 55mm" },
    { label: "Standard", value: "IS 3614 / BS 476" },
    { label: "Core", value: "Proprietary Fire Core" },
  ];

  return (
    <section className={styles.sectionContainer} id="fire-rated-doors">
      {/* Light Background Image with Overlay */}
      <div className={styles.backgroundWrapper}>
        <Image
          src="https://images.unsplash.com/photo-1542840410-3092f99611a3?q=80&w=2000&auto=format&fit=crop"
          alt="Fire rated wooden door background"
          fill
          className={styles.backgroundImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.backgroundOverlay} />
      </div>

      <div className={styles.contentWrapper}>
        {/* Centered Header */}
        <div className={styles.headerWrapper}>
          <SectionEyebrow label="10 FIRE-RATED WOODEN DOORS" />
          
          <h2 
            ref={headerRef} 
            className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
          >
            {renderStrandplyText("Safety should never", 0, false)}
            {renderStrandplyText("compromise design.", 17, true)}
          </h2>
          
          <p className={styles.sectionSubtitle}>
            Fire protection, engineered in wood. Micasa manufactures wooden fire-rated
            doors with IS 3614 certification — combining tested fire performance with
            the warmth of real timber, professional installation and full project documentation.
          </p>
        </div>

        <div className={styles.gridContainer}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.leftColTop}>
              <div className={styles.badgeBox}>
                <Flame className={styles.flameIcon} size={22} />
                <span className={styles.badgeText}>
                  IS 3614 Certified Wooden Fire Doors
                </span>
              </div>

              <ul className={styles.featureList}>
                {features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <ShieldCheck size={18} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actionGroup}>
              <Button href="/contact"  variant="primary" size="md">
                Request Technical Data
              </Button>
              <Button href="/contact"  variant="secondary" size="md">
                Talk to a Specialist
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            <div className={styles.certBox}>
              <div className={styles.certHeader}>
                <FileBadge className={styles.certIcon} size={20} />
                <p className={styles.certTitle}>
                  Certification Details — Editable Slots
                </p>
              </div>
              
              <dl className={styles.certList}>
                {FIRE_PLACEHOLDERS.map((f, idx) => (
                  <div key={idx} className={styles.certRow}>
                    <dt className={styles.certLabel}>{f.label}</dt>
                    <dd className={styles.certValue}>{f.value}</dd>
                  </div>
                ))}
              </dl>
              
              <p className={styles.certFooter}>
                Placeholder slots — replaced with actual certification documents and values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
