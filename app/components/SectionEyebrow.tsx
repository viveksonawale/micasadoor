import React from "react";
import styles from "./SectionEyebrow.module.css";

interface SectionEyebrowProps {
  label: string;
}

export default function SectionEyebrow({ label }: SectionEyebrowProps) {
  return (
    <div className={styles.eyebrowContainer}>
      <span className={styles.eyebrowText}>{label}</span>
    </div>
  );
}
