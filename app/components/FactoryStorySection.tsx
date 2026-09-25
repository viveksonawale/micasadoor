"use client";

import React from "react";
import styles from "./FactoryStorySection.module.css";
import SectionEyebrow from "./SectionEyebrow";

const STEPS = [
  { n: "01", t: "Raw Material", d: "Selected timber and engineered boards enter the Gandhidham unit." },
  { n: "02", t: "Seasoning / Preparation", d: "Material is conditioned and prepared for machining." },
  { n: "03", t: "Precision Manufacturing", d: "Machining, pressing and assembly to production drawings." },
  { n: "04", t: "Quality Inspection", d: "In-process checks on dimensions, bonding and build." },
  { n: "05", t: "Finishing", d: "Sanding, polishing and factory finish systems." },
  { n: "06", t: "Final Inspection", d: "Every door checked before dispatch clearance." },
  { n: "07", t: "Dispatch", d: "Packed, labelled and shipped to project sites." },
  { n: "08", t: "Professional Installation", d: "Fitted by trained teams with site coordination." },
];

export default function FactoryStorySection() {
  return (
    <section className={styles.sectionContainer}>

      {/* ── Centered Header ── */}
      {/* <div className={styles.headerWrapper}>
        <SectionEyebrow label="04 MADE IN GANDHIDHAM" />
        <h2 className={styles.sectionTitle}>
          From raw timber to installed door.
        </h2>
        <p className={styles.sectionSubtitle}>
          Our manufacturing unit in Gandhidham, Gujarat runs a controlled, stage-gated process — so the thousandth door matches the first.
        </p>
      </div> */}

      <div className={styles.timelineContainer}>
        {/* Connecting Line */}
        <div className={styles.timelineLine} />

        <div className={styles.timelineGrid}>
          {STEPS.map((step) => (
            <div key={step.n} className={styles.stepNode}>
              {/* Square Node */}
              <div className={styles.stepSquare}>
                {step.n}
              </div>

              {/* Text Content */}
              <h3 className={styles.stepTitle}>{step.t}</h3>
              <p className={styles.stepDescription}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
