"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DOORS } from "../../lib/doorsData";
import styles from "./page.module.css";

export default function DoorsShowcase() {
  return (
    <div className={styles.showcaseGrid}>
      {DOORS.map((door) => (
        <Link
          key={door.slug}
          href={`/doors/${door.slug}`}
          className={styles.creativeCard}
        >
          <div className={styles.cardImageWrapper}>
            <Image
              src={door.image}
              alt={door.name}
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay} />
          </div>
          
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{door.name}</h3>
            <p className={styles.cardTagline}>{door.tagline}</p>
            <div className={styles.cardAction}>
              Explore
              <ArrowRight className={styles.cardIcon} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
