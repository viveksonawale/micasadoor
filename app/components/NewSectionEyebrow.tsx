import React from "react";
import styles from "./NewSectionEyebrow.module.css";

interface NewSectionEyebrowProps {
  label: string;
  icon?: React.ReactNode;
  badge?: string;
}

export default function NewSectionEyebrow({ label, icon, badge }: NewSectionEyebrowProps) {
  // Extract number if the label follows the pattern "01 NAME"
  const match = label.match(/^(\d+)\s+(.*)$/);

  if (icon) {
    return (
      <div className={styles.eyebrowContainer}>
        <span className={styles.eyebrowText}>
          {icon} / <span>{label}</span>
        </span>
      </div>
    );
  }

  if (badge) {
    return (
      <div className={styles.eyebrowContainer}>
        <span className={styles.eyebrowText}>
          {badge} / <span>{label}</span>
        </span>
      </div>
    );
  }

  if (match) {
    const num = match[1];
    const text = match[2];
    return (
      <div className={styles.eyebrowContainer}>
        <span className={styles.eyebrowText}>
          {num} / <span>{text}</span>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.eyebrowContainer}>
      <span className={styles.eyebrowText}>
        <span>{label}</span>
      </span>
    </div>
  );
}
