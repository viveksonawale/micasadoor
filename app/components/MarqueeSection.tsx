"use client";

import React from "react";
import Marquee from "./Marquee";
import styles from "./MarqueeSection.module.css";

const MARQUEE_ITEMS = [
  "ENGINEERED WOOD DOORS",
  "ACOUSTIC CORE DAMPING",
  "FIRE-RATED ARCHITECTURAL ASSEMBLIES",
  "PRECISION HARDWOOD JOINERY",
  "BESPOKE TEXTURED VENEERS",
  "12,000+ DOORS / MONTH CAPACITY",
  "SOLID TIMBER FRAMES",
  "100% KILN-DRIED HARDWOOD",
  "SUSTAINABLE FOREST HARVESTING",
  "CUSTOM RESIDENTIAL & COMMERCIAL",
  "HIGH-STRENGTH LAMINATED CORES",
  "END-TO-END FACTORY ASSURANCE",
];

export default function MarqueeSection() {
  return (
    <section className={styles.sectionContainer} aria-label="Brand Feature Marquee">
      <Marquee
        variant="light"
        speed={58}
        items={MARQUEE_ITEMS}
      />
    </section>
  );
}
