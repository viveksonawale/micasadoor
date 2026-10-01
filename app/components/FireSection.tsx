"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Flame, ShieldCheck, FileBadge } from "lucide-react";
import styles from "./FireSection.module.css";
import NewSectionEyebrow from "./NewSectionEyebrow";
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
    { label: "Fire Rating", value: "[Fire Rating  e.g. as per certificate]" },
    { label: "Certification Number", value: "[Certification Number]" },
    { label: "Testing Laboratory", value: "[Testing Laboratory]" },
    { label: "Certificate PDF", value: "[Certificate PDF  upload slot]" },
    { label: "Door Thickness", value: "[Door Thickness]" },
    { label: "Frame Specification", value: "[Frame Specification]" },
  ];

  return (
    <section className={styles.sectionContainer} id="fire-rated-doors">
      {/* Light Background Image with Overlay */}

      <div className={styles.contentWrapper}>
        <div className={styles.gridContainer}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.leftColTop}>
              <NewSectionEyebrow label="10 FIRE-RATED WOODEN DOORS" />

              <h2
                ref={headerRef}
                className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
              >
                {renderStrandplyText("Safety should never ", 0, false)}
                {renderStrandplyText("compromise design.", 17, true)}
              </h2>

              <p className={styles.sectionSubtitle}>
                Fire protection, engineered in wood. Micasa manufactures wooden fire-rated
                doors with IS 3614 certification  combining tested fire performance with
                the warmth of real timber, professional installation and full project documentation.
              </p>

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
              <Button href="/contact" variant="primary" size="md">
                Request Technical Data
              </Button>
              <Button href="/contact" variant="secondary" size="md">
                Talk to a Specialist
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            <div className={styles.detailsPanel}>
              <p className={styles.panelEyebrow}>Certification Details  Editable Slots</p>

              <dl className={styles.detailsList}>
                {FIRE_PLACEHOLDERS.map((f, idx) => (
                  <div key={idx} className={styles.detailRow}>
                    <dt className={styles.detailLabel}>{f.label}</dt>
                    <dd className={styles.detailValue}>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <p className={styles.panelDisclaimer}>
                No ratings or certificate numbers are published until verified company documentation is uploaded here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
