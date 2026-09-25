import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import ProjectsSection from "./components/ProjectsSection";
import ProductRangeSection from "./components/ProductRangeSection";
import HowWeWorkSection from "./components/HowWeWorkSection";
import FactoryStorySection from "./components/FactoryStorySection";
import CustomDoorsSection from "./components/CustomDoorsSection";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";
import ApplicationsSection from "./components/ApplicationsSection";
import WhyUsSection from "./components/WhyUsSection";
import InstallSection from "./components/InstallSection";
import WoodCompareSection from "./components/WoodCompareSection";
import ResourcesSection from "./components/ResourcesSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <Hero />
        <StatsSection />

        {/* Projects / Catalog Section */}
        <ProjectsSection />

        {/* Product Range Section */}
        <ProductRangeSection />

        {/* How We Work Section */}
        <HowWeWorkSection />

        {/* Factory Story Section */}
        {/* <FactoryStorySection /> */}

        {/* Custom Doors Section */}
        <CustomDoorsSection />

        {/* Applications Section (05) */}
        <ApplicationsSection />

        {/* Why Us Section (06) */}
        <WhyUsSection />

        {/* Installation Section (07) */}
        <InstallSection />

        {/* Wood Compare Section (08) */}
        <WoodCompareSection />

        {/* Resources Section (09) */}
        <ResourcesSection />

        {/* Call To Action Section */}
        <CallToActionSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
