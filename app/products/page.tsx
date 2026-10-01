"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import { PROJECTS } from "@/lib/projectsData";

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

export default function ProductsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsHeroVisible(true);
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Page Hero */}
        <section className={styles.heroSection}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            fill
            className={styles.heroImage}
            alt="Products Hero"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContainer}>
            <h1
              ref={heroRef}
              className={`${styles.pageTitle}`}
            >
              Wooden doors, built to specification.
            </h1>
            <p className={styles.pageSubtitle}>
              Six door programmes across four timbers — from premium solid teak entrances to high-volume internal pine doors.
            </p>
          </div>
          <div className={styles.heroBottomBar} />
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {PROJECTS.map((project, idx) => {
              const imgUrl = project.image || 'https://images.unsplash.com/photo-1517581177682-a085bc7fcb10?q=80&w=800&auto=format&fit=crop';

              return (
                <div key={idx} className={styles.productCard}>
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={imgUrl}
                      alt={project.title}
                      fill
                      className={styles.cardImage}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardCategory}>{project.developer}</span>
                      <ArrowUpRight size={20} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.application}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
        {/* <ContactFormSection /> */}
      <Footer />
    </div>
  );
}
