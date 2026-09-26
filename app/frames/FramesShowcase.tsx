"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FRAMES } from "../../lib/framesData";
import styles from "./page.module.css";

export default function FramesShowcase() {
  return (
    <div className={styles.showcaseGrid}>
      {FRAMES.map((frame) => (
        <Link
          key={frame.slug}
          href={`/frames/${frame.slug}`}
          className={styles.creativeCard}
        >
          <div className={styles.cardImageWrapper}>
            <Image
              src={frame.image}
              alt={frame.name}
              fill
              className={styles.cardImage}
            />
            <div className={styles.cardOverlay} />
          </div>
          
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>{frame.name}</h3>
            <p className={styles.cardTagline}>{frame.tagline}</p>
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
