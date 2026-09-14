"use client";

import React from "react";
import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import styles from "./ProjectsSection.module.css";

const PROJECTS = [
  {
    id: 1,
    title: "Monte South",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "Byculla" },
      { label: "DOOR TYPE", value: "Teak Wood Doors" },
      { label: "FRAME TYPE", value: "Solid Teak Frame" },
      { label: "QUANTITY", value: "2500+" },
    ],
  },
  {
    id: 2,
    title: "Monte South",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "DOOR TYPE", value: "Veneer Finish Door" },
      { label: "FRAME TYPE", value: "Veneer Finish Frame" },
      { label: "QUANTITY", value: "2500+" },
      { label: "PROJECT STATUS", value: "Completed" },
    ],
  },
  {
    id: 3,
    title: "[Project Name]",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    details: [
      { label: "LOCATION", value: "[City]" },
      { label: "DOOR TYPE", value: "Fire-Rated Wooden Doors" },
      { label: "FRAME TYPE", value: "Fire-Rated Frame" },
      { label: "QUANTITY", value: "[Qty]" },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section className={styles.sectionContainer} id="projects">
      <div className={styles.contentWrapper}>
        <SectionEyebrow label="Our Work" />
        
        <h2 className={styles.sectionTitle}>
          Supplied. Installed. <span className={styles.highlight}>Delivered.</span>
        </h2>
        
        <p className={styles.sectionSubtitle}>
          A selection of project formats we serve. Cards shown are editable samples — real project references are shared during the quotation stage.
        </p>
      </div>

      <div className={styles.gridContainer}>
        {PROJECTS.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.imageWrapper}>
              <div className={styles.sampleBadge}>SAMPLE</div>
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
    </section>
  );
}
