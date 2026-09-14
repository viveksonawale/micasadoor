import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeSection from "./components/MarqueeSection";
import ProjectsSection from "./components/ProjectsSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <Hero />
        <MarqueeSection />

        {/* Projects / Catalog Section */}
        <ProjectsSection />
      </main>
    </div>
  );
}
