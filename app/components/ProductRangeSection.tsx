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
        <SectionEyebrow label="Our Collection" />
        
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

      {/* Carousel Container with Touch Swipe */}
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

        {/* Navigation Arrows positioned on the showcase image */}
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

      {/* Pagination Dots */}
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
    </section>
  );
}

