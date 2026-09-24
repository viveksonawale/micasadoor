"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionEyebrow from "../components/SectionEyebrow";
import CallToActionSection from "../components/CallToActionSection";
import styles from "./page.module.css";

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

export default function AboutPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('micasa-preloader-shown')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsReady(true);
    }

    const handlePreloaderDone = () => setIsReady(true);
    window.addEventListener('preloaderDone', handlePreloaderDone);
    
    return () => {
      window.removeEventListener('preloaderDone', handlePreloaderDone);
    };
  }, []);

  const heroTitle = "About Micasa";

  return (
    <div className={`${styles.pageContainer} ${!isReady ? styles.heroWaiting : ""}`}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/hero-image/hero.avif" 
            alt="Micasa Doors About"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
          
          <div className={styles.heroContent}>
            <div className={styles.heroAccentLine} />
            <h1 className={styles.heroTitle} aria-label={heroTitle}>
              {renderStrandplyLine(heroTitle)}
            </h1>
            <p className={styles.heroSubtitle}>
              A premium architectural solutions company delivering meticulously crafted doors and frames across India through trusted manufacturing partnerships.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storyContainer}>
            
            {/* Left: Text Content */}
            <div className={styles.storyContent}>
              <SectionEyebrow label="OUR STORY" />
              <h2 className={styles.storyHeading}>
                BUILT FOR EXECUTION, NOT JUST SUPPLY
              </h2>
              
              <div className={styles.storyTextWrapper}>
                <p className={styles.storyText}>
                  Micasa was founded with a clear purpose: to bring structured, professionally managed building solutions to a market that often lacks coordination and accountability. 
                </p>
                <p className={styles.storyText}>
                  We operate through trusted manufacturing partners — enabling flexible production, scalable supply, and consistent quality. Whether you prefer contemporary designs or timeless classics, our doors are crafted to elevate your spaces while delivering dependable performance.
                </p>
                <p className={styles.storyText}>
                  Our leadership brings hands-on experience across vendor management and execution — ensuring reliability from specification to final installation.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className={styles.storyImageWrapper}>
              <Image 
                src="/about/craftsmen.jpg" 
                alt="Craftsmen working on Micasa Doors" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.storyImage}
              />
            </div>

          </div>
        </section>

        {/* Leadership Section */}
        <section className={styles.leadershipSection}>
          <div className={styles.leadershipContainer}>
            <div className={styles.leadershipHeader}>
              <SectionEyebrow label="LEADERSHIP" />
              <h2 className={styles.leadershipHeading}>
                Founded by Industry Professionals
              </h2>
              <p className={styles.leadershipSubheading}>
                Micasa is led by professionals with deep expertise in building products, vendor management, and project execution.
              </p>
            </div>

            <div className={styles.foundersGrid}>
              
              <div className={styles.founderCard}>
                <div className={styles.founderInitials}>
                  DB
                </div>
                <h3 className={styles.founderName}>Divyang Bhanushali</h3>
                <span className={styles.founderRole}>Founder</span>
              </div>

              <div className={styles.founderCard}>
                <div className={styles.founderInitials}>
                  RD
                </div>
                <h3 className={styles.founderName}>Rahul Dey</h3>
                <span className={styles.founderRole}>Founder</span>
              </div>

            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />

      </main>

      <Footer />
    </div>
  );
}