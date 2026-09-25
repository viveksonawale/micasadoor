"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import SectionEyebrow from "./SectionEyebrow";
import styles from "./ProductRangeSection.module.css";

const renderStrandplyText = (lineText: string, startIndex: number = 0, isHighlight: boolean = false) => {
  let currentIndex = startIndex;
  const words = lineText.trim().split(/\s+/);

  return words.map((word, wordIndex) => {
    const chars = word.split("");
    const wordStartIndex = currentIndex;
    currentIndex += chars.length;

    return (
      <span key={wordIndex} className={`${styles.wordWrapper} ${isHighlight ? styles.highlight : ""}`}>
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

const PRODUCTS = [
  {
    id: 1,
    title: "Wooden Doors",
    subtitle: "LAMINATED FIRE & NON-FIRE DOORS",
    image: "https://images.unsplash.com/photo-1543884846-95fb4b94cbf1?q=80&w=800&auto=format&fit=crop",
    link: "#wooden-doors",
  },
  {
    id: 2,
    title: "Door Frames",
    subtitle: "TEAK · MERANTI · MAHOGANY · OAK · LVL",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    link: "#door-frames",
  },
  {
    id: 3,
    title: "Fire-Rated Doors",
    subtitle: "IS 3614 CERTIFIED",
    image: "https://images.unsplash.com/photo-1626379965008-8e6d30fb3950?q=80&w=800&auto=format&fit=crop",
    link: "#fire-rated-doors",
  },
  {
    id: 4,
    title: "MDO Panels",
    subtitle: "ARCHITECTURAL GRADE PANELS",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    link: "#mdo",
  }
];

const CATEGORIES = [
  { title: "Wooden Doors", link: "/wooden-doors", img: "https://images.unsplash.com/photo-1543884846-95fb4b94cbf1?q=80&w=800&auto=format&fit=crop", note: "Laminated Fire & Non-Fire Doors" },
  { title: "Door Frames", link: "/door-frames", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", note: "Teak · Meranti · Mahogany · Oak · LVL" },
  { title: "Fire-Rated Doors", link: "/fire-rated-doors", img: "https://images.unsplash.com/photo-1626379965008-8e6d30fb3950?q=80&w=800&auto=format&fit=crop", note: "IS 3614 Certified" },
  { title: "Non-Fire Doors", link: "/laminated-non-fire-doors", img: "https://images.unsplash.com/photo-1534142499694-877f88417537?q=80&w=800&auto=format&fit=crop", note: "100% A-Grade Pine Core" },
  { title: "Wet-Area Doors", link: "/laminated-toilet-doors", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", note: "Bathroom & Utility" },
  { title: "Custom Doors", link: "/custom-wooden-doors", img: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop", note: "Built to Drawing" },
];

export default function ProductRangeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = headerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === PRODUCTS.length - 1 ? 0 : current + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? PRODUCTS.length - 1 : current - 1));
  }, []);

  // Automatic swipe on continuous interval (3.5s)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeIndex, nextSlide]);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3500);
  }, [nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        nextSlide();
        resetAutoplay();
      } else if (diff < -50) {
        prevSlide();
        resetAutoplay();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getSlideClass = (index: number) => {
    if (index === activeIndex) return styles.slideActive;

    const prevIndex = activeIndex === 0 ? PRODUCTS.length - 1 : activeIndex - 1;
    const nextIndex = activeIndex === PRODUCTS.length - 1 ? 0 : activeIndex + 1;

    if (index === prevIndex) return styles.slidePrev;
    if (index === nextIndex) return styles.slideNext;

    return styles.slideHidden;
  };

  return (
    <section className={styles.sectionContainer} id="doors">
      <div className={styles.contentWrapper}>
        <SectionEyebrow label="02 OUR COLLECTION" />

        <h2
          ref={headerRef}
          className={`${styles.sectionTitle} ${isVisible ? styles.animate : ""}`}
          aria-label="Product Range"
        >
          {renderStrandplyText("Product", 0, false)}
          {renderStrandplyText("Range", 7, true)}
        </h2>

        <p className={styles.sectionSubtitle}>
          Explore a collection where each panel isn&apos;t just a product — it&apos;s a promise of strength, style, and sustainability. From solid wood to fire-rated doors, find the perfect partner for every project.
        </p>
      </div>

      {/* OLD Carousel Container (Commented out) */}
      {/* 
      <div 
        className={styles.carouselContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {PRODUCTS.map((product, index) => (
          <div 
            key={product.id} 
            className={`${styles.carouselSlide} ${getSlideClass(index)}`}
            onClick={() => {
              setActiveIndex(index);
              resetAutoplay();
            }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                className={styles.productImage}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.textContent}>
                <h3 className={styles.productTitle}>
                  {product.title}
                  <span className={styles.externalIcon}>↗</span>
                </h3>
              </div>
              <span className={styles.productSubtitle}>{product.subtitle}</span>
            </div>
          </div>
        ))}

        <div className={styles.showcaseNavOverlay}>
          <button 
            className={`${styles.navButton} ${styles.navPrev}`} 
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              resetAutoplay();
            }}
            aria-label="Previous slide"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button 
            className={`${styles.navButton} ${styles.navNext}`} 
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              resetAutoplay();
            }}
            aria-label="Next slide"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.dotsContainer}>
        {PRODUCTS.map((product, index) => (
          <button
            key={product.id}
            className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
            onClick={() => {
              setActiveIndex(index);
              resetAutoplay();
            }}
            aria-label={`Go to slide ${index + 1}: ${product.title}`}
          />
        ))}
      </div>
      */}

      {/* NEW Smooth Natural Category Grid */}
      <div className={styles.bentoGridWrapper}>
        <div className={styles.bentoGrid}>
          {CATEGORIES.map((c) => (
            <a href={c.link} key={c.title} className={styles.gridCard}>
              <div className={styles.cardImageWrapper}>
                <img src={c.img} alt={c.title} className={styles.cardImage} />
                <div className={styles.cardOverlay} />
              </div>

              <div className={styles.cardArrow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>

              <div className={styles.cardContentBox}>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardNote}>{c.note}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

