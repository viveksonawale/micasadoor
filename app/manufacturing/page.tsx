"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatsSection from "../components/StatsSection";
import FactoryStorySection from "../components/FactoryStorySection";
import CallToActionSection from "../components/CallToActionSection";
import styles from "./page.module.css";
import ContactFormSection from "../components/ContactFormSection";

export default function ManufacturingPage() {
  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", alt: "Gandhidham manufacturing unit — full production floor" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", alt: "Micasa team stacking engineered boards for door production" },
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", alt: "Seasoned board inventory ready for precision manufacturing" },
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            alt="Manufacturing Facility"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContainer}>
            <h1 className={styles.pageTitle}>
              Made in Gandhidham.
            </h1>
            <p className={styles.pageSubtitle}>
              A 12,000+ door capacity production unit in Gujarat, running a controlled stage-gated process from raw timber to installed door.
            </p>
          </div>
          <div className={styles.heroBottomBar} />
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Factory Story Section */}
        <FactoryStorySection eyebrow="01 CRAFTED WITH PRECISION"/>

        {/* Gallery Section */}
        <section className={styles.gallerySection}>
          <div className={styles.galleryContainer}>
            <div className={styles.galleryGrid}>
              {galleryImages.map((img, i) => (
                <div key={i} className={styles.galleryImageWrapper}>
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill 
                    className={styles.galleryImage} 
                  />
                </div>
              ))}
            </div>
            <p className={styles.galleryLabel}>
              Micasa Doors manufacturing unit — Gandhidham, Gujarat
            </p>
          </div>
        </section>

        <ContactFormSection/>
      </main>

      <Footer />
    </div>
  );
}
