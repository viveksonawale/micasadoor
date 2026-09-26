"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactFormSection from "../../components/ContactFormSection";
import { FRAMES } from "../../../lib/framesData";
import styles from "./page.module.css";

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

function AnimatedHeading({ title }: { title: string }) {
  const [inView, setInView] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = headingRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <h1
      ref={headingRef}
      className={`${styles.animatedHeading} ${inView ? styles.animate : ""}`}
      aria-label={title}
    >
      {renderStrandplyText(title, 0, false)}
    </h1>
  );
}

export default function FrameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const frame = FRAMES.find((f) => f.slug === resolvedParams.slug);

  if (!frame) {
    notFound();
  }

  // Get 3 other frames for the "Recommendations" section
  const otherFrames = FRAMES.filter((f) => f.slug !== resolvedParams.slug).slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src={frame.image}
            alt={frame.name}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <AnimatedHeading title={frame.name} />
            <p className={styles.heroSubtitle}>{frame.tagline}</p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Details Section */}
        <section className={styles.detailsSection}>
          <div className={styles.container}>
            <div className={styles.twoColumnLayout}>
              {/* Left Column */}
              <div className={styles.leftColumn}>
                <div className={styles.mainImageContainer}>
                  <Image
                    src={frame.image}
                    alt={`${frame.name} Detail`}
                    fill
                    className={styles.mainImage}
                  />
                </div>
                <p className={styles.description}>{frame.description}</p>
              </div>

              {/* Right Column */}
              <div className={styles.specsColumn}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Category</span>
                  <span className={styles.specValue}>{frame.kind}</span>
                </div>
                
                {frame.points && frame.points.length > 0 && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Key Features</span>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-neutral-900)' }}>
                      {frame.points.map((point, index) => (
                        <li key={index} className={styles.specValue} style={{ marginBottom: '8px' }}>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.ctaWrapper}>
                  <Link href="/contact" className={styles.ctaButton}>
                    REQUEST A QUOTE — {frame.name.toUpperCase()}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className={styles.moreSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Recommendations</h2>
            
            <div className={styles.moreGrid}>
              {otherFrames.map((f) => (
                <Link href={`/frames/${f.slug}`} key={f.slug} className={styles.moreCard}>
                  <div className={styles.moreImageContainer}>
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className={styles.moreImage}
                    />
                  </div>
                  <div className={styles.moreCardContent}>
                    <h3 className={styles.moreTitle}>{f.name}</h3>
                    <p className={styles.moreTagline}>{f.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactFormSection />

      </main>

      <Footer />
    </div>
  );
}
