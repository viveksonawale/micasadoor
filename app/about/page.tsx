"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallToActionSection from "../components/CallToActionSection";
import SectionEyebrow from "../components/SectionEyebrow";
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

const PILLARS = [
  { t: "Manufacturing Capability", d: "A dedicated production facility in Gandhidham, Gujarat with a capacity of 12,000+ doors built for project-scale supply." },
  { t: "Wood Expertise", d: "Teak, Red Meranti, Steamed Beech, Pine and engineered timber specified honestly for each application." },
  { t: "Engineering", d: "LVL, BWP and Marine grade frame systems designed for dimensional stability and consistency." },
  { t: "Quality Control", d: "Stage-gated inspection from raw material to final pre-dispatch checks." },
  { t: "Project Execution", d: "Sampling, approvals, phased production and site coordination for large developments." },
  { t: "Installation & Support", d: "Professional installation teams and responsive technical support after handover." },
];

export default function AboutPage() {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    // Component is always ready since preloader is removed
  }, []);

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
            <h1 className={styles.heroTitle}>About Micasa</h1>
            <p className={styles.heroSubtitle}>
              Micasa Doors Solutions Pvt Ltd manufactures wooden doors, engineered door frames and fire-rated wooden doors for India&apos;s most demanding projects.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Who We Are Section */}
        <section className={styles.whoWeAreSection}>
          <div className={styles.container}>
            <div className={styles.whoWeAreGrid}>

              {/* Left: Text Content */}
              <div className={styles.textContent}>
                <SectionEyebrow label="01 WHO WE ARE" />

                <h2 className={styles.sectionHeading}>
                  Engineered for performance.<br />Crafted in wood.
                </h2>

                <div className={styles.textWrapper}>
                  <p className={styles.bodyText}>
                    We are a professional manufacturer not a trader, not a carpenter. From solid timber to engineered frames, everything we supply is produced under our own roof, checked by our own teams and installed by people we train.
                  </p>
                  <p className={styles.bodyText}>
                    Our manufacturing unit operates in Gandhidham, Gujarat, while our corporate and sales office in Sakinaka, Mumbai keeps us close to the developers, architects and contractors we serve.
                  </p>
                </div>

                <div className={styles.statsBlock}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>FOUNDED</span>
                    <span className={styles.statValue}>[Year To Be Added]</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>TEAM</span>
                    <span className={styles.statValue}>[Team Size To Be Added]</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>CERTIFICATIONS</span>
                    <span className={styles.statValue}>IS 3614 Fire-Rated Wooden Doors</span>
                  </div>
                </div>
              </div>

              {/* Right: Pillars Grid */}
              <div className={styles.pillarsGrid}>
                {PILLARS.map((p, i) => (
                  <div key={p.t} className={styles.pillarCard}>
                    <div className={styles.pillarNumber}>{String(i + 1).padStart(2, "0")}</div>
                    <h3 className={styles.pillarTitle}>{p.t}</h3>
                    <p className={styles.pillarDesc}>{p.d}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

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

        {/* Leadership Section */}
        <section className={styles.leadershipSection}>
          <div className={styles.container}>
            <div className={styles.headerWrapper}>
              <SectionEyebrow label="02 LEADERSHIP" />
              <h2 className={`${styles.sectionHeading} ${styles.textCenter}`}>
                Founded by Industry <span className={styles.highlightOrange}>Professionals</span>
              </h2>
              <p className={styles.leadershipSubheading}>
                Metanoia Global is led by <span className={styles.highlightOrange}>professionals</span> with deep expertise in building products, vendor management, and project execution.
              </p>
            </div>
            <div className={styles.leadersGrid}>
              <div className={styles.leaderCard}>
                <div className={styles.leaderImagePlaceholder}></div>
                <h3 className={styles.leaderName}>Rahul Dey</h3>
                <p className={styles.leaderRole}>Founder</p>
              </div>
              <div className={styles.leaderCard}>
                <div className={styles.leaderImagePlaceholder}></div>
                <h3 className={styles.leaderName}>Divyang Bhanushali</h3>
                <p className={styles.leaderRole}>Co-Founder</p>
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