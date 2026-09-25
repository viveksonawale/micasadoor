"use client";

import React from "react";
import styles from "./ApplicationsSection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const APPS = [
  { name: "Residential", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", span: "span5" },
  { name: "Hotels", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop", span: "span3" },
  { name: "Hospitals", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", span: "span4" },
  { name: "Commercial", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop", span: "span4" },
  { name: "Institutional", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", span: "span3" },
  { name: "Developments", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop", span: "span5" },
  { name: "Luxury Villas", img: "https://images.unsplash.com/photo-1613490908592-fd114ddacbe1?q=80&w=800&auto=format&fit=crop", span: "span7" },
  { name: "Office Spaces", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", span: "span5" },
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

export default function ApplicationsSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const headerRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
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
    <section className={styles.sectionContainer} id="applications">
      {/* ── Centered Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="05 APPLICATIONS" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Specified across every", 0, false)}
          {renderStrandplyText("kind of building.", 22, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          From luxury villas to commercial developments, our doors are built to perform in any environment.
        </p>
      </div>

      <div className={styles.bentoGrid}>
        {APPS.map((a, i) => (
          <a href="#contact" key={a.name} className={`${styles.appCard} ${styles[a.span]}`}>
            <img src={a.img} alt={`Doors for ${a.name}`} className={styles.cardImage} />
            <div className={styles.cardOverlay} />

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{a.name}</h3>
            </div>

            {/* <span className={styles.cardIndex}>
              {String(i + 1).padStart(2, "0")}
            </span> */}
          </a>
        ))}
      </div>
    </section>
  );
}
