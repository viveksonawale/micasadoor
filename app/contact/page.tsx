"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
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

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = headerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setFormSubmitted(true);
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/hero-image/hero-bg.jpg"
            alt="Micasa Doors Contact"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Contact Us</h1>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Split Section: Get In Touch & Form */}
        <section className={styles.splitSection}>
          <div className={styles.splitContainer}>
            <div className={styles.logoWatermark} />

            {/* Left: Info */}
            <div className={styles.infoColumn}>
              <h2
                ref={headerRef}
                className={`${styles.infoTitle} ${isVisible ? styles.animate : ""}`}
                aria-label="Get In Touch With Us"
              >
                {renderStrandplyText("Get In Touch With ", 0, false)}
                {renderStrandplyText("Us", 19, true)}
              </h2>

              <p className={styles.infoDescription}>
                It may take us at least 24 hours to reach you but be rest assured, we&apos;ll get in touch with you.
              </p>

              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Email ID</span>
                <a href="mailto:support@metanoiaglobal.com" className={styles.contactValue}>
                  support@metanoiaglobal.com
                </a>
              </div>

              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Contact Number</span>
                <a href="tel:+918898903436" className={styles.contactValue}>
                  +91 88989 03436
                </a>
              </div>

              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>Our Socials</span>
                <div className={styles.socialRow}>
                  <a href="#" className={styles.socialLink} aria-label="Facebook">
                    <svg viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                  </a>
                  <a href="#" className={styles.socialLink} aria-label="Instagram">
                    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href="#" className={styles.socialLink} aria-label="YouTube">
                    <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className={styles.formColumn}>
              {formSubmitted ? (
                <div className={styles.successMessage}>
                  <p>Thank you! Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              ) : (
                <form className={styles.formGrid} onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.formLabel}>First Name*</label>
                    <input type="text" id="firstName" name="firstName" required className={styles.formInput} placeholder="Jane" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.formLabel}>Last Name*</label>
                    <input type="text" id="lastName" name="lastName" required className={styles.formInput} placeholder="Smith" />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor="email" className={styles.formLabel}>Email*</label>
                    <input type="email" id="email" name="email" required className={styles.formInput} placeholder="abc@yourmail.com" />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor="phone" className={styles.formLabel}>Contact Number*</label>
                    <input type="tel" id="phone" name="phone" required className={styles.formInput} placeholder="1234567890" />
                  </div>

                  <div className={styles.formGroupFull}>
                    <label htmlFor="message" className={styles.formLabel}>Message*</label>
                    <textarea id="message" name="message" required className={styles.formTextarea} placeholder="Your Message"></textarea>
                  </div>

                  <div className={styles.formGroupFull}>
                    <div className={styles.submitButton}>
                      <Button variant="primary" size="md" type="submit" className={styles.submitBtn}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              )}
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

      </main>

      <Footer />
    </div>
  );
}
