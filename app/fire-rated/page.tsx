"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewSectionEyebrow from "../components/NewSectionEyebrow";
import ContactFormSection from "../components/ContactFormSection";
import styles from "./page.module.css";
import { Flame, ShieldCheck } from "lucide-react";

const CONSTRUCTION = [
  { t: "Fire-Rated Door Construction", d: "Engineered fire-rated door construction built around a tested core system  detailed build-up shared with the technical datasheet." },
  { t: "Fire-Rated Frame Options", d: "Matching fire-rated frame specifications to complete the certified opening." },
  { t: "Intumescent Seal Compatibility", d: "Prepared for intumescent seals that expand under heat to seal the gap between door and frame." },
  { t: "Fire-Rated Hardware Compatibility", d: "Doors prepared for fire-rated hinges, locks and closers as per the certification scope." },
  { t: "Professional Installation", d: "Fire doors only perform when fitted correctly  our teams install to the certified detail." },
  { t: "Project Documentation", d: "Certificates, datasheets and installation records for consultant and authority submissions." },
];

const FIRE_PLACEHOLDERS = [
  { label: "Fire Rating", value: "[Fire Rating  e.g. as per certificate]" },
  { label: "Certification Number", value: "[Certification Number]" },
  { label: "Testing Laboratory", value: "[Testing Laboratory]" },
  { label: "Certificate PDF", value: "[Certificate PDF  upload slot]" },
  { label: "Door Thickness", value: "[Door Thickness]" },
  { label: "Frame Specification", value: "[Frame Specification]" },
];

export default function FireRatedPage() {
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    // Ensuring the component hydrates properly
    setIsReady(true);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/hero-image/hero.avif"
            alt="Fire Rated Wooden Doors"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Fire protection. Engineered in wood.</h1>
            <p className={styles.heroSubtitle}>
              IS 3614 certified wooden fire doors  where tested fire performance meets the warmth and finish of real timber.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          <div className={styles.container}>

            <div className={styles.twoColumnGrid}>

              {/* Left Column: System Features */}
              <div className={styles.leftCol}>
                <NewSectionEyebrow label="01 SYSTEM" />
                <h2 className={styles.sectionHeading}>
                  A complete certified opening  not just a door leaf.
                </h2>

                <div className={styles.featuresGrid}>
                  {CONSTRUCTION.map((c) => (
                    <div key={c.t} className={styles.featureCard}>
                      <div className={styles.featureHeader}>
                        <ShieldCheck size={20} className={styles.shieldIcon} />
                        <h3 className={styles.featureTitle}>{c.t}</h3>
                      </div>
                      <p className={styles.featureDesc}>{c.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Details & CTA */}
              <div className={styles.rightCol}>
                <div className={styles.detailsPanel}>
                  <p className={styles.panelEyebrow}>Certification Details  Editable Slots</p>

                  <dl className={styles.detailsList}>
                    {FIRE_PLACEHOLDERS.map((f) => (
                      <div key={f.label} className={styles.detailRow}>
                        <dt className={styles.detailLabel}>{f.label}</dt>
                        <dd className={styles.detailValue}>{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className={styles.panelDisclaimer}>
                    No ratings or certificate numbers are published until verified company documentation is uploaded here.
                  </p>
                </div>

                <div className={styles.actionButtons}>
                  <Button href="/contact?product=Fire%20Rated%20Doors" variant="primary" className={styles.fireButton}>
                    Request Fire Door Technical Data
                  </Button>
                  <Button href="/contact?product=Fire%20Rated%20Doors" variant="secondary" className={styles.fireButton}>
                    Talk to Our Fire Door Specialist
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <ContactFormSection />
      </main>

      <Footer />
    </div>
  );
}
