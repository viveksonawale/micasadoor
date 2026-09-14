"use client";

import React from "react";
import Image from "next/image";
import styles from "./Marquee.module.css";

export interface MarqueeProps {
  variant?: "orange" | "dark" | "light";
  speed?: number; // duration in seconds
  reverse?: boolean;
  items?: string[];
  className?: string;
}

const DEFAULT_ITEMS = [
  "ENGINEERED WOOD DOORS",
  "ACOUSTIC CORE DAMPING",
  "FIRE-RATED ASSEMBLIES",
  "PRECISION HARDWOOD JOINERY",
  "BESPOKE ARCHITECTURAL VENEERS",
  "SOLID TIMBER FRAMES",
  "SUSTAINABLE FORESTRY",
  "CUSTOM RESIDENTIAL & COMMERCIAL",
];

export default function Marquee({
  variant = "orange",
  speed = 32,
  reverse = false,
  items = DEFAULT_ITEMS,
  className = "",
}: MarqueeProps) {
  // Render duplicate arrays to ensure gapless seamless loop on ultrawide viewports
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`${styles.marqueeWrapper} ${styles[variant]} ${className}`}
      aria-label="Highlighted architectural features marquee"
    >
      <div
        className={`${styles.marqueeTrack} ${reverse ? styles.reverse : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {repeatedItems.map((text, idx) => (
          <div key={idx} className={styles.marqueeItem}>
            <span className={styles.itemText}>{text}</span>
            <span className={styles.logoContainer} aria-hidden="true">
              <Image
                src="/logo-1_1.svg"
                alt="MICASA M Logo"
                width={36}
                height={36}
                className={styles.micasaLogo}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
