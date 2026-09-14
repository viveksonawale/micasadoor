"use client";

import React from "react";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const phoneNumber = "918898903436";
  const message = encodeURIComponent(
    "Hi MICASA Doors, I would like to inquire about your precision engineered doors and frames."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappWrapper}
      aria-label="Chat with MICASA on WhatsApp (+91 88989 03436)"
    >
      {/* Dual Radar Wave Rings */}
      <span className={`${styles.radarRing} ${styles.radarRing1}`} aria-hidden="true" />
      <span className={`${styles.radarRing} ${styles.radarRing2}`} aria-hidden="true" />

      {/* Floating Tooltip */}
      <div className={styles.tooltip} aria-hidden="true">
        <span className={styles.tooltipDot} />
        Chat on WhatsApp
      </div>

      {/* Central WhatsApp Button */}
      <div className={styles.whatsappButton}>
        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 32 32"
          className={styles.whatsappIcon}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.766.793 5.348 2.164 7.532L2.08 30.12a.75.75 0 0 0 .917.917l6.588-2.084A13.926 13.926 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.836-1.597.75.75 0 0 0-.585-.084l-4.992 1.579 1.579-4.992a.75.75 0 0 0-.084-.585A11.44 11.44 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.545-8.497c-.36-.18-2.128-1.05-2.458-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.895-1.787-1.07-.954-1.792-2.134-2-2.494-.21-.36-.022-.554.158-.733.162-.162.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.293-.701-.59-.606-.81-.617l-.69-.013c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.155 5.44.86.37 1.532.592 2.056.758.864.275 1.65.236 2.272.143.693-.104 2.128-.87 2.428-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
        </svg>
      </div>
    </a>
  );
}
