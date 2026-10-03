"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import { ALL_PRODUCTS } from "@/app/data/products";
import ContactFormSection from "../components/ContactFormSection";

export default function ProductsPage() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsHeroVisible(true); },
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
            style={{ objectFit: "cover" }}
            priority
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContainer}>
            <h1 ref={heroRef} className={styles.pageTitle}>
              Wooden doors, built to specification.
            </h1>
            <p className={styles.pageSubtitle}>
              Door programmes and frame systems across multiple timber species  manufactured in Gandhidham, Gujarat.
            </p>
          </div>
          <div className={styles.heroBottomBar} />
        </section>

        {/* Products Grid */}
        <section className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {ALL_PRODUCTS.map((product) => {
              const category = product.isDoor
                ? `Wooden Door  ${product.wood}`
                : `Door Frame  ${product.kind}`;

              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className={styles.productCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={styles.cardImage}
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardCategory}>{category}</span>
                      <ArrowUpRight size={20} className={styles.cardIcon} />
                    </div>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardDesc}>{product.tagline}</p>
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


