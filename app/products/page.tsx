"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import { ALL_PRODUCTS } from "../data/products";
import ContactFormSection from "../components/ContactFormSection";

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
              Our Products
            </h1>
            <p className={styles.pageSubtitle}>
              Explore our comprehensive range of high-performance doors for every application.
            </p>
          </div>
          <div className={styles.heroBottomBar} />
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {ALL_PRODUCTS.map((prod, idx) => {
              // Array of distinct door images for the catalog
              const placeholderImages = [
                'https://images.unsplash.com/photo-1517581177682-a085bc7fcb10?q=80&w=800&auto=format&fit=crop', // Teak
                'https://images.unsplash.com/photo-1506161803730-61ba4f40f2b3?q=80&w=800&auto=format&fit=crop', // Red Meranti
                'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop', // Steamed Beech
                'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Pine
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop', // Designer
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop', // Custom
                'https://images.unsplash.com/photo-1600566752229-250de48545e4?q=80&w=800&auto=format&fit=crop', // Lam Non-fire
                'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=800&auto=format&fit=crop', // Lam Fire
                'https://images.unsplash.com/photo-1600566753086-00f18efc2294?q=80&w=800&auto=format&fit=crop', // Hotel
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop', // Toilet
              ];
              const imgUrl = placeholderImages[idx % placeholderImages.length];

              return (
                <Link href={`/products/${prod.slug}`} key={idx} className={styles.productCard}>
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={imgUrl}
                      alt={prod.name}
                      fill
                      className={styles.cardImage}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardCategory}>{prod.wood}</span>
                      <ArrowUpRight size={20} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{prod.name}</h3>
                    <p className={styles.cardDesc}>{prod.tagline}</p>
                  </div>
                </Link>
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
