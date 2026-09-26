import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactFormSection from "../components/ContactFormSection";
import SectionEyebrow from "../components/SectionEyebrow";
import styles from "./page.module.css";

const RESOURCES = [
  {
    title: "Product Catalogue",
    description: "Explore our complete range of wooden doors, frames, and hardware with detailed specifications.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Technical Specifications",
    description: "Detailed CAD drawings, dimensional data, and material specifications for architects and engineers.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Installation Guides",
    description: "Step-by-step instructions and best practices for the proper installation of our door systems.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Fire-Rating Certifications",
    description: "Official IS 3614 and other compliance certificates for our specialized fire-rated wooden doors.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: "Warranty Information",
    description: "Comprehensive details on our product warranties, coverage terms, and maintenance requirements.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Material Samples",
    description: "Request physical samples of our timber, veneers, and finishes for your project moodboards.",
    icon: (
      <svg className={styles.cardIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  }
];

export default function ResourcesPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/hero-image/hero.avif"
            alt="Micasa Doors Resources"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Resources & Downloads</h1>
            <p className={styles.heroSubtitle}>
              Access our comprehensive library of product catalogues, technical specifications, and installation guides designed for architects and builders.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Resources Collection */}
        <section className={styles.resourcesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <SectionEyebrow label="01 DOWNLOADS" />
              <h2 className={styles.sectionHeading}>
                Project Materials
              </h2>
              <p className={styles.sectionDesc}>
                Everything you need to specify, detail, and install Micasa door systems. For custom requirements or specialized certifications, please contact our technical team.
              </p>
            </div>

            <div className={styles.resourceGrid}>
              {RESOURCES.map((resource, index) => (
                <Link key={index} href="/contact" className={styles.resourceCardLink}>
                  <div className={styles.resourceCard}>
                    <div className={styles.cardIconWrapper}>
                      {resource.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{resource.title}</h3>
                    <p className={styles.cardDesc}>{resource.description}</p>
                    <div className={styles.cardAction}>
                      Request Access
                      <svg className={styles.cardActionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
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
