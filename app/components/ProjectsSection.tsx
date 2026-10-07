"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";
import NewSectionEyebrow from "./NewSectionEyebrow";
import styles from "./ProjectsSection.module.css";
import { PROJECTS } from "@/lib/projectsData";

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

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

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

  const part1 = "Supplied. Installed.";
  const part2 = "Delivered.";
  const part1CharCount = part1.replace(/\s/g, "").length;

  return (
    <section className={styles.sectionContainer} id="projects">
      <div className={styles.contentWrapper}>
        <NewSectionEyebrow label="01 OUR WORK" />
        
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
      </div>

      {/* Projects Grid */}
      <div className={styles.gridContainer}>
        {PROJECTS.slice(0, 6).map((project) => (
          <div 
            key={project.id} 
            className={styles.projectCard}
            onClick={() => setActiveProject(project)}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.locationTag}>{project.location}</div>
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.projectImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <div className={styles.projectMetaList}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Developer</span>
                  <span className={styles.metaValue}>{project.developer}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Application</span>
                  <span className={styles.metaValue}>{project.application}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Status</span>
                  <span className={styles.metaValue} style={{
                    color: project.status === 'Completed' ? 'var(--color-success, #3F6B3F)' : 'var(--color-primary-base, #e14401)'
                  }}>
                    {project.status}
                  </span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Quantity</span>
                  <span className={styles.metaValue}>{project.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <Button href="/projects" variant="primary" size="lg" className={styles.showMoreButton}>
          SHOW MORE PROJECTS
        </Button>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.modalCloseButton} 
                onClick={() => setActiveProject(null)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              
              <div className={styles.modalImageWrapper}>
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <div className={styles.modalBody}>
                <h3 className={styles.modalTitle}>{activeProject.title}</h3>
                <div className={styles.modalLocationTag}>{activeProject.location}</div>
                
                <div className={styles.projectMetaList} style={{ marginTop: '24px' }}>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Developer</span>
                    <span className={styles.metaValue}>{activeProject.developer}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Application</span>
                    <span className={styles.metaValue}>{activeProject.application}</span>
                  </div>
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Status</span>
                    <span className={styles.metaValue} style={{
                      color: activeProject.status === 'Completed' ? 'var(--color-success, #3F6B3F)' : 'var(--color-primary-base, #e14401)'
                    }}>
                      {activeProject.status}
                    </span>
                  </div>
                  {activeProject.quantity && (
                    <div className={styles.metaRow}>
                      <span className={styles.metaLabel}>Quantity</span>
                      <span className={styles.metaValue}>{activeProject.quantity}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

