import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <Hero />

        {/* Placeholder for upcoming sections */}
        <section id="doors" className={styles.catalogSection}>
          <div className={styles.catalogContainer}>
            <span className={styles.catalogEyebrow}>
              Engineered Catalog
            </span>
            <h2 className={styles.catalogTitle}>
              Door Collections & Architectural Frames
            </h2>
            <p className={styles.catalogDescription}>
              Designed with precision joinery and acoustic core damping. Full catalog showcase coming up next.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
