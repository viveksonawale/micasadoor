"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Droplets } from "lucide-react";
import styles from "./WetAreaSection.module.css";
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

export default function WetAreaSection() {
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

  const tags = [
    "Bedroom Doors",
    "Internal Doors",
    "Utility Areas",
    "Bathroom Doors",
    "Wet-Area Applications"
  ];

  return (
    <section className={styles.sectionContainer} id="wet-area-doors">
      <div className={styles.contentWrapper}>
        <div className={styles.gridContainer}>
          {/* Left Column: Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image 
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" 
                alt="Water-resistant wooden bathroom door"
                fill
                className={styles.image}
              />
              <div className={styles.imageBadge}>
                <Droplets size={16} className={styles.dropletIcon} />
                <span className={styles.imageBadgeText}>Designed for Wet Areas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tags and Button */}
          <div className={styles.contentCol}>
            <SectionEyebrow label="11 NON-FIRE RATED / PINE DOORS" />
            
            <h2 
              ref={headerRef} 
              className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
            >
              {renderStrandplyText("100% A-grade pine —", 0, false)}
              {renderStrandplyText("including the bathroom.", 19, true)}
            </h2>
            
            <p className={styles.sectionSubtitle}>
              Every non-fire-rated Micasa door is built on a 100% A-grade pine core. Bedrooms, internal doors, utility areas and wet spaces — our laminated toilet door build-up is a water-resistant solution engineered for humid Indian conditions, with final performance depending on the selected laminate and site ventilation.
            </p>

            <div className={styles.tagsContainer}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            
            <div className={styles.actionGroup}>
              <Button  href="/laminated-toilet-doors"  variant="primary" size="lg">
                Explore Laminated Toilet Doors
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
