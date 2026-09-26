import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionEyebrow from "../components/SectionEyebrow";
import CallToActionSection from "../components/CallToActionSection";
import { IMG } from "../../lib/doorsData";
import FramesShowcase from "./FramesShowcase";
import styles from "./page.module.css";

export const metadata = {
  title: "Wooden Door Frames | Micasa Doors Solutions",
  description: "Solid timber and engineered LVL frame systems — including BWP and Marine grade options for moisture-prone areas.",
};

export default function FramesPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src={IMG.blueprint}
            alt="Door Frames Blueprint"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>The frame decides how long the door lasts.</h1>
            <p className={styles.heroSubtitle}>
              Solid timber and engineered LVL frame systems — including BWP and Marine grade options for moisture-prone areas.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Frames Grid Section */}
        <section className={styles.doorsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <SectionEyebrow label="02 DOOR FRAMES" />
              <h2 className={styles.sectionHeading}>
                Engineered for Stability
              </h2>
            </div>

            <FramesShowcase />
          </div>
        </section>

        <CallToActionSection />
      </main>

      <Footer />
    </div>
  );
}
