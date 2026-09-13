"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import styles from "./Navbar.module.css";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Doors", href: "#doors" },
  { name: "Frames", href: "#frames" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const headerClass = `${styles.header} ${isScrolled ? styles.headerScrolled : styles.headerTop}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          {/* Brand Logo */}
          <Link
            href="/"
            className={styles.brand}
            onClick={() => setActiveLink("Home")}
          >
            <Image
              src="/micasa-logo-text.svg"
              alt="MICASA Logo"
              width={140}
              height={40}
              className={`${styles.brandLogo} ${isScrolled ? styles.brandLogoScrolled : styles.brandLogoTop}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              
              let linkClass = styles.navLink;
              if (isScrolled) {
                linkClass += ` ${isActive ? styles.navLinkScrolledActive : styles.navLinkScrolled}`;
              } else {
                linkClass += ` ${isActive ? styles.navLinkTopActive : styles.navLinkTop}`;
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={linkClass}
                >
                  {link.name}
                  <span
                    className={`${styles.navLinkUnderline} ${isActive ? styles.navLinkUnderlineActive : ''}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <Button
              href="#contact"
              variant="primary"
              size="sm"
              className={!isScrolled ? styles.ctaButtonTop : ''}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={`${styles.mobileToggle} ${isScrolled ? styles.mobileToggleScrolled : styles.mobileToggleTop}`}
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
      </header>

      {/* Mobile Drawer */}
      <div
        className={`${styles.drawerBackdrop} ${mobileMenuOpen ? styles.drawerBackdropOpen : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`${styles.drawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}>
        <div>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerBrand}>
              <div className={styles.drawerLogoIcon}>M</div>
              <span className={styles.drawerBrandName}>MICASA</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={styles.drawerClose}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className={styles.drawerNav}>
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.drawerFooter}>
          <Button
            href="#contact"
            variant="primary"
            className={styles.drawerFooterBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Catalog
          </Button>
          <div className={styles.drawerFooterText}>
            Engineered Architectural Woodwork
          </div>
        </div>
      </div>
    </>
  );
}
