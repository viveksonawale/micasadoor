"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import Button from "./Button";
import styles from "./Navbar.module.css";

const doorTypes = [
  { name: "Fire Retardant Doors", image: "/hero-image/hero.avif" },
  { name: "Engineered Laminated Doors", image: "/doors/medium_wood_door.jpg" },
  { name: "Veneer Finish Doors", image: "/doors/light_oak_door.jpg" },
  { name: "PU Finish Doors", image: "/doors/dark_wood_door.jpg" },
  { name: "Flush Doors", image: "/hero-image/hero.avif" },
  { name: "Moulded Doors", image: "/doors/medium_wood_door.jpg" }
];

const frameTypes = [
  { name: "SYP — Southern Yellow Pine", image: "/doors/dark_wood_door.jpg" },
  { name: "Red Meranti — A Grade", image: "/hero-image/hero.avif" },
  { name: "Teak Wood — A Grade", image: "/doors/light_oak_door.jpg" },
  { name: "Steam Beech — A Grade", image: "/doors/medium_wood_door.jpg" },
  { name: "Engineered Laminated Frame — LVL Grade", image: "/hero-image/hero.avif" },
  { name: "Engineered Laminated Frame — MR Grade", image: "/doors/dark_wood_door.jpg" },
  { name: "Post Forming Frame — LVL Grade", image: "/doors/light_oak_door.jpg" },
  { name: "Profile Warping Frame — LVL Grade", image: "/doors/medium_wood_door.jpg" },
  { name: "Veneer Finish Frame", image: "/hero-image/hero.avif" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<"doors" | "frames" | null>(null);
  
  const [hoveredDoorIdx, setHoveredDoorIdx] = useState<number>(0);
  const [hoveredFrameIdx, setHoveredFrameIdx] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setHoveredMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileMenuOpen]);

  // Navbar is solid white if scrolled OR if a mega menu is open
  const isSolid = isScrolled || hoveredMenu !== null;
  const headerClass = `${styles.header} ${isSolid ? styles.headerScrolled : styles.headerTop}`;

  return (
    <>
      <header className={headerClass} onMouseLeave={() => setHoveredMenu(null)}>
        <div className={styles.container}>
          {/* Brand Logo - Crossfade between white and black text versions */}
          <Link 
            href="/" 
            className={`${styles.brand} ${isSolid ? styles.isSolid : ""}`} 
            onClick={() => setHoveredMenu(null)}
          >
            <div className={styles.logoContainer}>
              <Image
                src="/logo/micasawithtext.svg"
                alt="MICASA Logo"
                width={240}
                height={68}
                className={`${styles.brandLogo} ${styles.logoWhite}`}
                priority
              />
              <Image
                src="/logo/logowithblacktext.svg"
                alt="MICASA Logo (Solid)"
                width={240}
                height={68}
                className={`${styles.brandLogo} ${styles.logoBlack}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            
            {/* DOORS ITEM */}
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={() => setHoveredMenu("doors")}
            >
              <button className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}>
                DOORS
                <ChevronDown className={`${styles.chevron} ${hoveredMenu === "doors" ? styles.chevronUp : ""}`} size={16} />
              </button>
            </div>

            {/* FRAMES ITEM */}
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={() => setHoveredMenu("frames")}
            >
              <button className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}>
                FRAMES
                <ChevronDown className={`${styles.chevron} ${hoveredMenu === "frames" ? styles.chevronUp : ""}`} size={16} />
              </button>
            </div>

            <Link href="/projects" className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}>
              PROJECTS
            </Link>
            
            <Link href="/about" className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}>
              ABOUT
            </Link>

          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              href="/contact"
              variant="primary"
              size="md"
            >
              CONTACT US
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${styles.mobileToggle} ${isSolid ? styles.mobileToggleScrolled : styles.mobileToggleTop}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MEGA MENU PANELS - Only rendered after navbar hydrates */}
        {isMounted && (
          <div className={`${styles.megaMenuWrapper} ${hoveredMenu ? styles.megaMenuOpen : ""}`}>
            <div className={styles.megaMenuInner}>
              
              {/* DOORS MEGA MENU */}
              {hoveredMenu === "doors" && (
                <div className={styles.megaMenuGrid}>
                  {/* Column 1: Info */}
                  <div className={styles.megaColLeft}>
                    <h3 className={styles.megaTitle}>FIND THE PERFECT WOOD FOR YOUR NEEDS</h3>
                    <p className={styles.megaDesc}>
                      Explore our extensive inventory of high performance wood products including hard-to-find sizes and custom finishes.
                    </p>
                    <Button href="/#doors" variant="secondary" size="md" className={styles.megaBtn}>
                      EXPLORE DOORS <ArrowRight size={16} />
                    </Button>
                  </div>
                  {/* Column 2: List */}
                  <div className={styles.megaColMiddle}>
                    <ul className={styles.megaList}>
                      {doorTypes.map((door, idx) => (
                        <li key={idx} onMouseEnter={() => setHoveredDoorIdx(idx)}>
                          <Link href="/#doors" onClick={() => setHoveredMenu(null)} className={`${styles.megaListItem} ${hoveredDoorIdx === idx ? styles.activeListText : ''}`}>
                            <span className={styles.megaListNum}>{String(idx + 1).padStart(2, '0')}</span>
                            <span className={styles.megaListText}>{door.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 3: Dynamic Image */}
                  <div className={styles.megaColRight}>
                    <div className={styles.megaImageCard}>
                      <Image 
                        key={doorTypes[hoveredDoorIdx].image} 
                        src={doorTypes[hoveredDoorIdx].image} 
                        alt={doorTypes[hoveredDoorIdx].name} 
                        fill 
                        style={{objectFit: 'cover'}} 
                        className={styles.dynamicImage}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* FRAMES MEGA MENU */}
              {hoveredMenu === "frames" && (
                <div className={styles.megaMenuGrid}>
                  {/* Column 1: Info */}
                  <div className={styles.megaColLeft}>
                    <h3 className={styles.megaTitle}>ARCHITECTURAL DOOR FRAMES</h3>
                    <p className={styles.megaDesc}>
                      Precision engineered door frames built for longevity, acoustic superiority, and stunning visual appeal.
                    </p>
                    <Button href="/#frames" variant="secondary" size="md" className={styles.megaBtn}>
                      EXPLORE FRAMES <ArrowRight size={16} />
                    </Button>
                  </div>
                  {/* Column 2: Frame List */}
                  <div className={styles.megaColMiddle}>
                    <ul className={styles.megaList}>
                      {frameTypes.map((frame, idx) => (
                        <li key={idx} onMouseEnter={() => setHoveredFrameIdx(idx)}>
                          <Link href="/#frames" onClick={() => setHoveredMenu(null)} className={`${styles.megaListItem} ${hoveredFrameIdx === idx ? styles.activeListText : ''}`}>
                            <span className={styles.megaListNum}>{String(idx + 1).padStart(2, '0')}</span>
                            <span className={styles.megaListText}>{frame.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Column 3: Dynamic Image */}
                  <div className={styles.megaColRight}>
                    <div className={styles.megaImageCard}>
                      <Image 
                        key={frameTypes[hoveredFrameIdx].image} 
                        src={frameTypes[hoveredFrameIdx].image} 
                        alt={frameTypes[hoveredFrameIdx].name} 
                        fill 
                        style={{objectFit: 'cover'}} 
                        className={styles.dynamicImage}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.drawerBackdrop} ${mobileMenuOpen ? styles.drawerBackdropOpen : ''}`} onClick={() => setMobileMenuOpen(false)} />

      <div className={`${styles.drawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerBrand}>
              <div className={styles.drawerLogoIcon}>M</div>
              <span className={styles.drawerBrandName}>MICASA</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className={styles.drawerClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className={styles.drawerNav}>
            <Link href="/#doors" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>DOORS</Link>
            <Link href="/#frames" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>FRAMES</Link>
            <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>PROJECTS</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>ABOUT</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>CONTACT US</Link>
          </nav>
        </div>
      </div>
    </>
  );
}