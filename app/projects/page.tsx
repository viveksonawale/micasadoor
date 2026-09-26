"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import projectsStyles from "../components/ProjectsSection.module.css";
import { PROJECTS } from "@/lib/projectsData";
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

export default function ProjectsPage() {
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
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            alt="Micasa Doors Projects"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContainer}>
            <h1
              ref={heroRef}
              className={`${styles.pageTitle}`}
            >
              Our Projects
            </h1>
            <p className={styles.pageSubtitle}>
              Explore our portfolio of completed and ongoing projects across residential, commercial, and hospitality sectors.
            </p>
          </div>
          <div className={styles.heroBottomBar} />
        </section>

        {/* All Projects Grid */}
        <section className={styles.projectsSection}>
          <div className={projectsStyles.gridContainer}>
            {PROJECTS.map((project) => (
              <div key={project.id} className={projectsStyles.projectCard}>
                <div className={projectsStyles.imageWrapper}>
                  <div className={projectsStyles.locationTag}>{project.location}</div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={projectsStyles.projectImage}
                  />
                </div>
                <div className={projectsStyles.cardContent}>
                  <h3 className={projectsStyles.projectTitle}>{project.title}</h3>
                  <div className={projectsStyles.projectMetaList}>
                    <div className={projectsStyles.metaRow}>
                      <span className={projectsStyles.metaLabel}>Developer</span>
                      <span className={projectsStyles.metaValue}>{project.developer}</span>
                    </div>
                    <div className={projectsStyles.metaRow}>
                      <span className={projectsStyles.metaLabel}>Application</span>
                      <span className={projectsStyles.metaValue}>{project.application}</span>
                    </div>
                    <div className={projectsStyles.metaRow}>
                      <span className={projectsStyles.metaLabel}>Status</span>
                      <span className={projectsStyles.metaValue} style={{
                        color: project.status === 'Completed' ? 'var(--color-success, #3F6B3F)' : 'var(--color-primary-base, #e14401)'
                      }}>
                        {project.status}
                      </span>
                    </div>
                    <div className={projectsStyles.metaRow}>
                      <span className={projectsStyles.metaLabel}>Quantity</span>
                      <span className={projectsStyles.metaValue}>{project.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ContactFormSection/>
      </main>

      <Footer />
    </div>
  );
}
