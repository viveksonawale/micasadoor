"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import styles from "./ProjectsSection.module.css";

const renderStrandplyText = (lineText: string, startIndex: number = 0, isHighlight: boolean = false) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span key={wordIndex} className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}>
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

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "residential", label: "Luxury Residential" },
  { id: "commercial", label: "Commercial Towers" },
  { id: "firerated", label: "Fire-Rated & Acoustic" },
];

const PROJECTS = [
  {
    id: 1,
    category: "residential",
    tag: "LUXURY RESIDENTIAL",
    title: "Monte South",
    subtitle: "High-Rise Residential Towers",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Byculla, Mumbai" },
      { label: "DOOR TYPE", value: "Teak Wood Main Entrance" },
      { label: "FRAME TYPE", value: "Solid Teak Frame" },
      { label: "QUANTITY", value: "2,500+ Doors" },
    ],
  },
  {
    id: 2,
    category: "commercial",
    tag: "COMMERCIAL TOWER",
    title: "St. Regis Towers",
    subtitle: "Corporate Headquarters & Hotel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Lower Parel, Mumbai" },
      { label: "DOOR TYPE", value: "Veneer Finish Flush Doors" },
      { label: "FRAME TYPE", value: "Veneer Architectural Frame" },
      { label: "QUANTITY", value: "1,800+ Doors" },
    ],
  },
  {
    id: 3,
    category: "residential",
    tag: "LUXURY RESIDENTIAL",
    title: "The Imperial Heights",
    subtitle: "Premium Villa & Penthouse Complex",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Tardeo, Mumbai" },
      { label: "DOOR TYPE", value: "Engineered Wood Doors" },
      { label: "FRAME TYPE", value: "Hardwood Jamb & Architrave" },
      { label: "QUANTITY", value: "3,200+ Doors" },
    ],
  },
  {
    id: 4,
    category: "firerated",
    tag: "FIRE-RATED & ACOUSTIC",
    title: "Grand Hyatt Suites",
    subtitle: "Five-Star Luxury Hotel Development",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "BKC, Mumbai" },
      { label: "DOOR TYPE", value: "120-Min Fire-Rated Wooden" },
      { label: "FRAME TYPE", value: "Acoustic Metal Frame" },
      { label: "QUANTITY", value: "1,400+ Doors" },
    ],
  },
  {
    id: 5,
    category: "residential",
    tag: "LUXURY RESIDENTIAL",
    title: "One Avighna Park",
    subtitle: "Architectural Ultra-Luxury Condos",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Parel, Mumbai" },
      { label: "DOOR TYPE", value: "Custom Walnut Veneer" },
      { label: "FRAME TYPE", value: "Solid Hardwood Frame" },
      { label: "QUANTITY", value: "2,100+ Doors" },
    ],
  },
  {
    id: 6,
    category: "commercial",
    tag: "COMMERCIAL TOWER",
    title: "World Trade Center II",
    subtitle: "Grade-A Financial Workspace",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Cuffe Parade, Mumbai" },
      { label: "DOOR TYPE", value: "Sound-Insulated Office Doors" },
      { label: "FRAME TYPE", value: "Precision Steel Frame" },
      { label: "QUANTITY", value: "1,600+ Doors" },
    ],
  },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = headerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const filteredProjects = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const part1 = "Supplied. Installed.";
  const part2 = "Delivered.";
  const part1CharCount = part1.replace(/\s/g, "").length;

  return (
    <section className={styles.sectionContainer} id="projects">
      <div className={styles.contentWrapper}>
        <SectionEyebrow label="Our Work" />
        
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
          aria-label="Supplied. Installed. Delivered."
        >
          {renderStrandplyText(part1, 0, false)}
          {renderStrandplyText(part2, part1CharCount, true)}
        </h2>
        
        <p className={styles.sectionSubtitle}>
          A curated showcase of major commercial, luxury residential, and fire-rated door supply contracts delivered by MICASA across premium developments.
        </p>

        {/* Category Filter Tabs */}
        <div className={styles.filterContainer}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles.filterTab} ${activeCategory === cat.id ? styles.activeFilter : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.gridContainer}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageWrapper}>
              <div className={styles.categoryBadge}>{project.tag}</div>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.projectImage}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.projectSubtitle}>{project.subtitle}</span>
              </div>
              <div className={styles.detailsGrid}>
                {project.details.map((detail, index) => (
                  <div key={index} className={styles.detailItem}>
                    <span className={styles.detailLabel}>{detail.label}</span>
                    <span className={styles.detailValue}>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Developer & Architect Inquiry Banner */}
      <div className={styles.inquiryBanner}>
        <div className={styles.inquiryText}>
          <h4 className={styles.inquiryTitle}>Bespoke Door Schedules & Project Estimates</h4>
          <p className={styles.inquirySubtitle}>
            Partner with MICASA engineering team for custom architectural door schedules, CAD specs, and fire compliance documentation.
          </p>
        </div>
        <a href="#quote" className={styles.inquiryBtn}>
          REQUEST SPEC SHEET →
        </a>
      </div>
    </section>
  );
}
