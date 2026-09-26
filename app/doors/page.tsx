import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionEyebrow from "../components/SectionEyebrow";
import CallToActionSection from "../components/CallToActionSection";
import { DOORS, IMG } from "../../lib/doorsData";
import DoorsShowcase from "./DoorsShowcase";
import styles from "./page.module.css";

export const metadata = {
  title: "Wooden Doors | Micasa Doors Solutions",
  description: "Six door programmes across four timbers — from premium solid teak entrances to high-volume internal pine doors.",
};

export default function DoorsPage() {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <Image
            src={IMG.doorDark}
            alt="Micasa Wooden Doors"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Wooden Doors</h1>
            <p className={styles.heroSubtitle}>
              Six door programmes across four timbers — from premium solid teak entrances to high-volume internal pine doors.
            </p>
          </div>
          <div className={styles.heroAccentLine} />
        </section>

        {/* Doors Grid Section */}
        <section className={styles.doorsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <SectionEyebrow label="01 DOOR TYPES" />
              <h2 className={styles.sectionHeading}>
                Built to Specification
              </h2>
            </div>

            <DoorsShowcase />
          </div>
        </section>

        {/* CTA Section - matching reference site preference from user comment */}
        <CallToActionSection />
      </main>

      <Footer />
    </div>
  );
}
