"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import styles from "./Hero.module.css";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Parallax scroll handler for desktop only (> 768px)
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background Image Container with Parallax */}
      <div
        className={styles.bgContainer}
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
        }}
      >
        <Image
          src="/hero-image/hero-factory.avif"
          alt="MICASA Precision Engineered Wood Door Manufacturing Facility"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />

        {/* Full-width dark scrim overlay for perfect text visibility */}
        <div className={styles.scrimOverlay} />
        
        {/* Soft bottom vignette to ground the transition to the next section */}
        <div className={styles.bottomVignette} />
      </div>

      {/* Content Container (Center aligned) */}
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          
          {/* Eyebrow / Overline */}
          <div className={`${styles.eyebrow} ${styles.animateEyebrow}`}>
            <span className={styles.eyebrowDot} />
            Precision Engineered Doors & Frames
          </div>

          {/* Headline */}
          <h1 className={`${styles.headline} ${styles.animateHeadline}`}>
            Architectural timber, <br className={styles.desktopBreak} />
            <span className={styles.headlineItalic}>engineered</span> for generations.
          </h1>

          {/* Subtext */}
          <p className={`${styles.subtext} ${styles.animateSubtext}`}>
            Custom engineered internal doors, fire-rated acoustic assemblies, and precision-milled frames designed for architects, luxury builders, and commercial spaces.
          </p>

          {/* CTAs */}
          <div className={`${styles.ctas} ${styles.animateCtas}`}>
            <Button href="#doors" variant="primary" size="lg">
              Explore Door Collection
            </Button>
            <Button
              href="#frames"
              variant="secondary"
              size="lg"
              className={styles.secondaryBtn}
            >
              Browse Frame Finishes
            </Button>
          </div>

          {/* Key Engineering Trust Stats */}
          <div className={`${styles.statsGroup} ${styles.animateStats}`}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                6<span className={styles.statPlus}>+</span>
              </div>
              <div className={styles.statLabel}>
                Door Profiles & Cores
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                8×<span className={styles.statPlus}>Finishes</span>
              </div>
              <div className={styles.statLabel}>
                Solid Frame Materials
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                100<span className={styles.statPlus}>%</span>
              </div>
              <div className={styles.statLabel}>
                Kiln-Dried Precision
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
