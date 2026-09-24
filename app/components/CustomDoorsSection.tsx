"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./CustomDoorsSection.module.css";
import SectionEyebrow from "./SectionEyebrow";
import Button from "./Button";

// ─── Compatibility Data ──────────────────────────────────────────────────────

const frameData: Record<string, { label: string; finishes: string[] }> = {
  syp: {
    label: "SYP",
    finishes: ["PU Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "red-meranti": {
    label: "Red Meranti",
    finishes: ["PU Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "teak-wood": {
    label: "Teak Wood",
    finishes: ["PU Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "steam-beech": {
    label: "Steam Beech",
    finishes: ["PU Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "eng-lvl": {
    label: "Engineered Laminated — LVL",
    finishes: ["PU Finish", "Laminated Finish", "Veneer Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "eng-mr": {
    label: "Engineered Laminated — MR",
    finishes: ["PU Finish", "Laminated Finish", "Veneer Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "post-forming": {
    label: "Post Forming — LVL",
    finishes: ["PU Finish", "Laminated Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "profile-warping": {
    label: "Profile Warping — LVL",
    finishes: ["PU Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish", "RAL Finish"],
  },
  "veneer-frame": {
    label: "Veneer Finish Frame",
    finishes: ["PU Finish", "Veneer Finish", "Polish", "Waterbase PU", "Melamine", "Solvent PU", "Natural Finish", "Varnish"],
  },
};

const doorTypes = [
  "Fire Retardant",
  "Engineered Laminated",
  "Veneer Finish",
  "PU Finish",
  "Flush",
  "Moulded",
];

// ─── Strandply Helper ────────────────────────────────────────────────────────

const renderStrandplyText = (
  lineText: string,
  startIndex: number = 0,
  isHighlight: boolean = false
) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span
        key={wordIndex}
        className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}
      >
        {chars.map((char, charIndex) => {
          const i = wordStartIndex + charIndex;
          return (
            <span
              key={charIndex}
              aria-hidden="true"
              className={styles.strandplyChar}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char}
            </span>
          );
        })}
      </span>
    );
  });
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function CustomDoorsSection() {
  const [selectedFrame, setSelectedFrame] = useState("teak-wood");
  const [selectedFinish, setSelectedFinish] = useState("PU Finish");
  const [selectedDoor, setSelectedDoor] = useState("Flush");
  const [isVisible, setIsVisible] = useState(false);

  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    const currentRef = headerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // When frame changes, reset finish if incompatible
  const handleSelectFrame = (key: string) => {
    setSelectedFrame(key);
    const available = frameData[key]?.finishes ?? [];
    if (!available.includes(selectedFinish)) {
      setSelectedFinish(available[0] ?? "");
    }
  };

  const availableFinishes = frameData[selectedFrame]?.finishes ?? [];

  return (
    <section className={styles.sectionContainer} id="custom-doors">
      {/* ── Header ── */}
      <div className={styles.headerWrapper}>
        <SectionEyebrow label="04 CONFIGURE YOUR DOOR" />
        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
        >
          {renderStrandplyText("Design your", 0, false)}
          {renderStrandplyText("door.", 11, true)}
        </h2>
        <p className={styles.sectionSubtitle}>
          Three steps. Pick your frame, finish, and door type — then request a quote.
        </p>
      </div>

      {/* ── Configurator — two column ── */}
      <div className={styles.configuratorWrapper}>

        {/* LEFT — Door Showcase */}
        <div className={styles.showcaseCol}>
          <div className={styles.showcaseInner}>
            <Image
              src="/hero-image/hero.avif"
              alt="Custom door preview"
              fill
              style={{ objectFit: "cover" }}
              className={styles.showcaseImage}
            />
            {/* Selection overlay badge */}
            <div className={styles.showcaseBadge}>
              <span className={styles.badgeLabel}>Your selection</span>
              <span className={styles.badgeValue}>{selectedDoor} · {frameData[selectedFrame]?.label}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Vertical Steps */}
        <div className={styles.stepsCol}>

          {/* Step 1 — Frame */}
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>01</span>
              Select Frame
            </div>
            <div className={styles.frameGrid}>
              {Object.entries(frameData).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => handleSelectFrame(key)}
                  className={`${styles.frameChip} ${selectedFrame === key ? styles.active : ""}`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.stepDivider} aria-hidden />

          {/* Step 2 — Finish */}
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>02</span>
              Select Finish
              <span className={styles.stepNote}>{availableFinishes.length} available</span>
            </div>
            <div className={styles.finishGrid}>
              {availableFinishes.map((finish) => (
                <button
                  key={finish}
                  onClick={() => setSelectedFinish(finish)}
                  className={`${styles.finishChip} ${selectedFinish === finish ? styles.active : ""}`}
                >
                  {finish}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.stepDivider} aria-hidden />

          {/* Step 3 — Door */}
          <div className={styles.stepBlock}>
            <div className={styles.stepLabel}>
              <span className={styles.stepNum}>03</span>
              Select Door Type
            </div>
            <div className={styles.doorGrid}>
              {doorTypes.map((door) => (
                <button
                  key={door}
                  onClick={() => setSelectedDoor(door)}
                  className={`${styles.doorChip} ${selectedDoor === door ? styles.active : ""}`}
                >
                  {door}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.stepDivider} aria-hidden />

          {/* ── Summary + CTA ── */}
          <div className={styles.summaryBlock}>
            <div className={styles.summaryConfig}>
              <span className={styles.summaryItem}>
                <span className={styles.summaryKey}>Frame</span>
                <span className={styles.summaryVal}>{frameData[selectedFrame]?.label}</span>
              </span>
              <span className={styles.summarySep} aria-hidden>·</span>
              <span className={styles.summaryItem}>
                <span className={styles.summaryKey}>Finish</span>
                <span className={styles.summaryVal}>{selectedFinish}</span>
              </span>
              <span className={styles.summarySep} aria-hidden>·</span>
              <span className={styles.summaryItem}>
                <span className={styles.summaryKey}>Door</span>
                <span className={styles.summaryVal}>{selectedDoor}</span>
              </span>
            </div>
            <Button variant="primary" size="md" className={styles.ctaBtn}>
              Request This Configuration
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
