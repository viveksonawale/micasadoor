"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, ArrowRight, Phone, MessageCircle, Mail } from "lucide-react";
import Button from "./Button";
import styles from "./Navbar.module.css";

const doorTypes = [
  { name: "Fire Retardant", desc: "Tested for safety and structural integrity.", image: "/hero-image/hero.avif" },
  { name: "Engineered Laminated", desc: "Durable and warp-resistant construction.", image: "/doors/medium_wood_door.jpg" },
  { name: "Veneer Finish", desc: "Premium natural wood aesthetics.", image: "/doors/light_oak_door.jpg" },
  { name: "PU Finish", desc: "Sleek, modern, and highly durable surface.", image: "/doors/dark_wood_door.jpg" },
  { name: "Flush Doors", desc: "Clean, minimalist, and versatile.", image: "/hero-image/hero.avif" },
  { name: "Moulded Doors", desc: "Classic architectural detailing.", image: "/doors/medium_wood_door.jpg" }
];

const frameTypes = [
  { name: "SYP", desc: "Southern Yellow Pine", image: "/doors/dark_wood_door.jpg" },
  { name: "Red Meranti", desc: "A Grade Quality", image: "/hero-image/hero.avif" },
  { name: "Teak Wood", desc: "A Grade Quality", image: "/doors/light_oak_door.jpg" },
  { name: "Steam Beech", desc: "A Grade Quality", image: "/doors/medium_wood_door.jpg" },
  { name: "Engineered Laminated", desc: "LVL Grade", image: "/hero-image/hero.avif" },
  { name: "Engineered Laminated", desc: "MR Grade", image: "/doors/dark_wood_door.jpg" },
  { name: "Post Forming", desc: "LVL Grade", image: "/doors/light_oak_door.jpg" },
  { name: "Profile Warping", desc: "LVL Grade", image: "/doors/medium_wood_door.jpg" },
  { name: "Veneer Finish", desc: "Premium Wood Grain", image: "/hero-image/hero.avif" }
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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("mobile-menu-open");
    }
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
              <Link 
                href="/doors"
                onClick={() => setHoveredMenu(null)}
                className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              >
                DOORS
                <ChevronDown className={`${styles.chevron} ${hoveredMenu === "doors" ? styles.chevronUp : ""}`} size={16} />
              </Link>
            </div>

            {/* FRAMES ITEM */}
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={() => setHoveredMenu("frames")}
            >
              <Link 
                href="/frames"
                onClick={() => setHoveredMenu(null)}
                className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              >
                FRAMES
                <ChevronDown className={`${styles.chevron} ${hoveredMenu === "frames" ? styles.chevronUp : ""}`} size={16} />
              </Link>
            </div>

            <Link 
              href="/products" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
              PRODUCTS
            </Link>

            <Link 
              href="/fire-rated" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
              FIRE RATED
            </Link>

            <Link 
              href="/manufacturing" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
              MANUFACTURING
            </Link>

            <Link 
              href="/projects" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
              PROJECTS
            </Link>

            <Link 
              href="/resources" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
              RESOURCES
            </Link>
            
            <Link 
              href="/about" 
              className={`${styles.navLink} ${isSolid ? styles.navLinkScrolled : styles.navLinkTop}`}
              onMouseEnter={() => setHoveredMenu(null)}
            >
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

        {/* MEGA MENU PANELS - Full width attached to header */}
        {isMounted && (
          <div className={`${styles.megaMenuWrapper} ${hoveredMenu ? styles.dropdownOpen : ""}`}>
            <div className={styles.megaMenuInner}>
              
              {/* DOORS MEGA MENU */}
              {hoveredMenu === "doors" && (
                  <div className={styles.dropdownGrid}>
                    <div className={styles.dropdownCol}>
                      <div className={styles.dropdownColHeader}>DOORS</div>
                      <ul className={styles.dropdownList}>
                        {doorTypes.map((door, idx) => (
                          <li key={idx} onMouseEnter={() => setHoveredDoorIdx(idx)}>
                            <Link href="/doors" onClick={() => setHoveredMenu(null)} className={styles.dropdownListItem}>
                              <div className={styles.dropdownItemContent}>
                                <span className={styles.dropdownItemTitle}>{door.name}</span>
                                <span className={styles.dropdownItemDesc}>{door.desc}</span>
                              </div>
                              <ChevronRight size={14} className={styles.dropdownItemIcon} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.dropdownCol}>
                      <div className={styles.dropdownColHeader}>SHOWCASE</div>
                      <div className={styles.dropdownImageCard}>
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
                    <div className={styles.dropdownColRight}>
                      <div className={styles.dropdownColHeader}>EXPLORE MORE</div>
                      <div className={styles.exploreBox}>
                        <h4 className={styles.exploreTitle}>Precision Woodcraft</h4>
                        <p className={styles.exploreDesc}>
                          Discover our full range of premium doors designed for architectural perfection and lasting durability.
                        </p>
                        <Link href="/doors" onClick={() => setHoveredMenu(null)} className={styles.exploreLink}>
                          Explore All Doors <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
              )}

              {/* FRAMES MEGA MENU */}
              {hoveredMenu === "frames" && (
                  <div className={styles.dropdownGrid}>
                    <div className={styles.dropdownCol}>
                      <div className={styles.dropdownColHeader}>FRAMES</div>
                      <ul className={styles.framesListGrid}>
                        {frameTypes.map((frame, idx) => (
                          <li key={idx} onMouseEnter={() => setHoveredFrameIdx(idx)}>
                            <Link href="/frames" onClick={() => setHoveredMenu(null)} className={`${styles.frameListItem} ${hoveredFrameIdx === idx ? styles.frameListItemActive : ""}`}>
                              <span className={styles.frameItemName}>{frame.name}</span>
                              <span className={styles.frameItemDesc}>{frame.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.dropdownCol}>
                      <div className={styles.dropdownColHeader}>SHOWCASE</div>
                      <div className={styles.dropdownImageCard}>
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
                    <div className={styles.dropdownColRight}>
                      <div className={styles.dropdownColHeader}>EXPLORE MORE</div>
                      <div className={styles.exploreBox}>
                        <h4 className={styles.exploreTitle}>Architectural Support</h4>
                        <p className={styles.exploreDesc}>
                          Precision engineered door frames built for longevity, acoustic superiority, and stunning visual appeal.
                        </p>
                        <Link href="/frames" onClick={() => setHoveredMenu(null)} className={styles.exploreLink}>
                          Explore All Frames <ArrowRight size={16} />
                        </Link>
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
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo/logowithblacktext.svg" alt="MICASA" width={200} height={80} />
              </Link>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className={styles.drawerClose}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className={styles.drawerNav}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>HOME</span> <ArrowRight size={16} />
            </Link>
            <Link href="/doors" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>DOORS</span> <ArrowRight size={16} />
            </Link>
            <Link href="/frames" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>FRAMES</span> <ArrowRight size={16} />
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>PRODUCTS</span> <ArrowRight size={16} />
            </Link>
            <Link href="/fire-rated" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>FIRE RATED</span> <ArrowRight size={16} />
            </Link>
            <Link href="/manufacturing" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>MANUFACTURING</span> <ArrowRight size={16} />
            </Link>
            <Link href="/projects" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>PROJECTS</span> <ArrowRight size={16} />
            </Link>
            <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>RESOURCES</span> <ArrowRight size={16} />
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>ABOUT</span> <ArrowRight size={16} />
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={styles.drawerLink}>
              <span>CONTACT</span> <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
        
        <div className={styles.drawerFooter}>
          <div className={styles.drawerActions}>
            <a href="tel:+918898903436" className={styles.drawerBtnCall} aria-label="Call us">
              <Phone size={20} />
              <span>Call</span>
            </a>
            <a href="https://wa.me/918898903436" className={styles.drawerBtnWhatsapp} aria-label="WhatsApp">
              <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.268 2 2 8.268 2 16c0 2.766.793 5.348 2.164 7.532L2.08 30.12a.75.75 0 0 0 .917.917l6.588-2.084A13.926 13.926 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.836-1.597.75.75 0 0 0-.585-.084l-4.992 1.579 1.579-4.992a.75.75 0 0 0-.084-.585A11.44 11.44 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.545-8.497c-.36-.18-2.128-1.05-2.458-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.895-1.787-1.07-.954-1.792-2.134-2-2.494-.21-.36-.022-.554.158-.733.162-.162.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.293-.701-.59-.606-.81-.617l-.69-.013c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.54 3.88 6.155 5.44.86.37 1.532.592 2.056.758.864.275 1.65.236 2.272.143.693-.104 2.128-.87 2.428-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
              </svg>
              <span>WhatsApp</span>
            </a>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={styles.drawerBtnPrimary}>Get Quote</Link>
          </div>
        </div>
      </div>
    </>
  );
}