"use client";

import React, { useState } from "react";
import styles from "./CustomDoorsSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import Button from "./Button";

const woodOptions = ["Teak", "Red Meranti", "Steamed Beech", "Pine"];
const finishOptions = [
  "PU Finish", "Laminated Finish", "Veneer Finish", "Polish",
  "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish",
  "Varnish", "RAL Finish"
];
const frameOptions = [
  "SYP", "Red Meranti", "Teak Wood", "Steam Beech",
  "Engineered Laminated Frame", "Post Forming Frame",
  "Profile Warping Frame", "Veneer Finish Frame"
];
const styleOptions = ["Plain", "Grooved", "Fluted", "Designer", "Custom"];

export default function CustomDoorsSection() {
  const [selectedWood, setSelectedWood] = useState("Teak");
  const [selectedFinish, setSelectedFinish] = useState("Natural Finish");
  const [selectedFrame, setSelectedFrame] = useState("Teak Wood");
  const [selectedStyle, setSelectedStyle] = useState("Designer");

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="Interactive Studio" />
        <h2 className={styles.sectionTitle}>Design your door.</h2>
        <p className={styles.sectionSubtitle}>
          Select a wood, finish, frame and style — then send the configuration straight to our team for pricing.
        </p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Left Column - Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img 
              src="/hero-image/hero.avif" 
              alt="Custom Door Configuration" 
              className={styles.doorImage} 
            />
          </div>
        </div>

        {/* Right Column - Configurator */}
        <div className={styles.configColumn}>
          <div className={styles.configSteps}>
            
            {/* Step 1 */}
            <div className={styles.step}>
              <div className={styles.stepHeader}>01 - SELECT WOOD</div>
              <div className={styles.optionsGrid}>
                {woodOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelectedWood(opt)}
                    className={`${styles.optionBtn} ${selectedWood === opt ? styles.active : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.step}>
              <div className={styles.stepHeader}>02 - SELECT FINISH</div>
              <div className={styles.optionsGrid}>
                {finishOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelectedFinish(opt)}
                    className={`${styles.optionBtn} ${selectedFinish === opt ? styles.active : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.step}>
              <div className={styles.stepHeader}>03 - SELECT FRAME</div>
              <div className={styles.optionsGrid}>
                {frameOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelectedFrame(opt)}
                    className={`${styles.optionBtn} ${selectedFrame === opt ? styles.active : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className={styles.step}>
              <div className={styles.stepHeader}>04 - SELECT DOOR STYLE</div>
              <div className={styles.optionsGrid}>
                {styleOptions.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => setSelectedStyle(opt)}
                    className={`${styles.optionBtn} ${selectedStyle === opt ? styles.active : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className={styles.descriptionBox}>
            <div className={styles.descriptionLine}></div>
            <p className={styles.descriptionText}>
              You have selected {selectedWood} with a {selectedFinish}, paired with a {selectedFrame} and a {selectedStyle} style.
            </p>
          </div>

          <Button variant="primary" size="md" className={styles.ctaBtn}>
            REQUEST THIS CONFIGURATION
          </Button>
        </div>
      </div>
    </section>
  );
}
