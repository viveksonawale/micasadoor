import React from "react";
import styles from "./SectionEyebrow.module.css";

interface SectionEyebrowProps {
  label: string;
}

export default function SectionEyebrow({ label }: SectionEyebrowProps) {
  return (
    <div className={styles.eyebrowContainer}>
      <div className={styles.iconCircle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrowIcon}
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
      <span className={styles.eyebrowText}>{label}</span>
    </div>
  );
}
