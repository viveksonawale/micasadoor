import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeSection from "./components/MarqueeSection";
import StatsSection from "./components/StatsSection";
import ProjectsSection from "./components/ProjectsSection";
import ProductRangeSection from "./components/ProductRangeSection";
import HowWeWorkSection from "./components/HowWeWorkSection";
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
        <StatsSection />

        {/* Projects / Catalog Section */}
        <ProjectsSection />
        
        {/* Product Range Section */}
        <ProductRangeSection />

        {/* How We Work Section */}
        <HowWeWorkSection />
      </main>
    </div>
  );
}
