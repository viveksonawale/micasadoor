import React from "react";
import styles from "./SectionEyebrow.module.css";

interface SectionEyebrowProps {
  label: string;
}

export default function SectionEyebrow({ label }: SectionEyebrowProps) {
  // Check if the label starts with a number followed by a space
  const match = label.match(/^(\d+)\s+(.*)$/);

  if (match) {
    const num = match[1];
    const text = match[2];
    return (
      <div className={styles.eyebrowContainer}>
        <div className={styles.eyebrowNumber}>{num}</div>
        <span className={styles.eyebrowText}>{text}</span>
      </div>
    );
  }

  return (
    <div className={styles.eyebrowContainer}>
      <span className={styles.eyebrowText}>{label}</span>
    </div>
  );
}
