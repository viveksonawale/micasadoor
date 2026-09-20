"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import projectsStyles from "../components/ProjectsSection.module.css";
import { PROJECTS } from "@/lib/projectsData";

export default function ProjectsPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src="/hero-image/hero-bg.jpg" 
            alt="Micasa Doors Projects"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
          
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Our Projects</h1>
          </div>
          <div className={styles.heroAccentLine} />
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
      </main>

      <Footer />
    </div>
  );
}
