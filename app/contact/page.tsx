"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallToActionSection from "../components/CallToActionSection";
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

function AnimatedOfficeHeading({ title }: { title: string }) {
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
    <h3
      ref={headingRef}
      className={`${styles.officeHeading} ${inView ? styles.animate : ""}`}
      aria-label={title}
    >
      {renderStrandplyText(title, 0, false)}
    </h3>
  );
}

export default function ContactPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/banner/contact-banner.webp"
            alt="Micasa Doors Contact"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Have a project in mind?</h1>
            <p className={styles.heroSubtitle}>
              Share your door requirement and our team will help you select the right door, frame and installation solution.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Homepage Contact CTA Section */}
        <CallToActionSection className={styles.contactCtaOverride} />

        {/* Office Locations */}
        <section className={styles.officesSection}>
          <div className={styles.officesContainer}>

            <div className={styles.officesGrid}>

              {/* Head Office */}
              <div className={styles.officeCard}>
                <div className={styles.officeInfo}>
                  <AnimatedOfficeHeading title="Head Office" />
                  <p className={styles.officeAddress}>
                    Ladiwala Compound, Durga Mandir Lane, Mumbai,<br />
                    Maharashtra - 400 072
                  </p>
                </div>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.5786438885663!2d72.8431057!3d18.950117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce19df6b7b25%3A0xb304ef2c39e083c2!2sLadiwala%20Compound!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                    className={styles.mapIframe}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Head Office Location"
                  ></iframe>
                </div>
              </div>

              {/* Factory Office */}
              <div className={styles.officeCard}>
                <div className={styles.officeInfo}>
                  <AnimatedOfficeHeading title="Factory Office" />
                  <p className={styles.officeAddress}>
                    Plot No. 6, Revenue Survey No. 404/2, Mithirohar, Gandhidham, Kachchh, Gujarat - 370201
                  </p>
                </div>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.786357497495!2d70.1555543!3d23.097014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3950b70014b2dcdb%3A0x6b4efbb17a1a6871!2sMithirohar%2C%20Gandhidham%2C%20Gujarat%20370201!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                    className={styles.mapIframe}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Factory Office Location"
                  ></iframe>
                </div>
              </div>

              {/* Branch Office */}
              <div className={styles.officeCard}>
                <div className={styles.officeInfo}>
                  <AnimatedOfficeHeading title="Branch Office" />
                  <p className={styles.officeAddress}>
                    Office No. 207, Nalanda Holdings CHS., Sector 19C, Vashi, Navi Mumbai - 400 703
                  </p>
                </div>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.835905183494!2d73.0031123!3d19.070965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c13aa75133d1%3A0x5a18a0edce6b9415!2sSector%2019C%2C%20Vashi%2C%20Navi%20Mumbai%2C%20Maharashtra%20400703!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                    className={styles.mapIframe}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Branch Office Location"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
