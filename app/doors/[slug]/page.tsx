"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactFormSection from "../../components/ContactFormSection";
import { DOORS } from "../../../lib/doorsData";
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

export default function DoorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = React.use(params);
  const door = DOORS.find((d) => d.slug === resolvedParams.slug);

  if (!door) {
    notFound();
  }

  // Get 3 other doors for the "More in this range" section
  const otherDoors = DOORS.filter((d) => d.slug !== resolvedParams.slug).slice(0, 3);

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src={door.image}
            alt={door.name}
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <AnimatedHeading title={door.name} />
            <p className={styles.heroSubtitle}>{door.tagline}</p>
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
                    src={door.image}
                    alt={`${door.name} Detail`}
                    fill
                    className={styles.mainImage}
                  />
                </div>
                <p className={styles.description}>{door.description}</p>
              </div>

              {/* Right Column */}
              <div className={styles.specsColumn}>
                <div className={styles.specRow}>
                  <span className={styles.specLabel}>Wood Type</span>
                  <span className={styles.specValue}>{door.wood}</span>
                </div>
                {door.appearance && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Appearance</span>
                    <span className={styles.specValue}>{door.appearance}</span>
                  </div>
                )}
                {door.applications && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Recommended Applications</span>
                    <span className={styles.specValue}>{door.applications.join(" - ")}</span>
                  </div>
                )}
                {door.finishes && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Available Finishes</span>
                    <span className={styles.specValue}>{door.finishes.join(" - ")}</span>
                  </div>
                )}
                {door.customisation && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Customisation</span>
                    <span className={styles.specValue}>{door.customisation}</span>
                  </div>
                )}
                {door.frames && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Recommended Frames</span>
                    <span className={styles.specValue}>{door.frames.join(" - ")}</span>
                  </div>
                )}
                {door.suitability && (
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Project Suitability</span>
                    <span className={styles.specValue}>{door.suitability}</span>
                  </div>
                )}

                <div className={styles.ctaWrapper}>
                  <Link href="/contact" className={styles.ctaButton}>
                    REQUEST A QUOTE — {door.name.toUpperCase()}
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
              {otherDoors.map((d) => (
                <Link href={`/doors/${d.slug}`} key={d.slug} className={styles.moreCard}>
                  <div className={styles.moreImageContainer}>
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      className={styles.moreImage}
                    />
                  </div>
                  <div className={styles.moreCardContent}>
                    <h3 className={styles.moreTitle}>{d.name}</h3>
                    <p className={styles.moreTagline}>{d.tagline}</p>
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
