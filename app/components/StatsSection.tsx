"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./StatsSection.module.css";

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedNumber({ end, suffix = "", duration = 2200 }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Cubic ease-out curve for natural slowdown towards the target number
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasAnimated, end, duration]);

  return (
    <h2 ref={ref} className={styles.title}>
      {count.toLocaleString()}
      {suffix}
    </h2>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Card 1 */}
        <div className={styles.card}>
          <AnimatedNumber end={12000} suffix="+" duration={2200} />
          <div className={styles.subtitle}>
            <div className={styles.dot}></div>
            <span>Doors / Month</span>
          </div>
          <p className={styles.description}>
            Meeting your needs at unmatched scale and speed.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <AnimatedNumber end={98} suffix="%+" duration={2200} />
          <div className={styles.subtitle}>
            <div className={styles.dot}></div>
            <span>On-Time Delivery</span>
          </div>
          <p className={styles.description}>
            Built tougher for projects that demand more.
          </p>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <AnimatedNumber end={40} suffix="+" duration={2200} />
          <div className={styles.subtitle}>
            <div className={styles.dot}></div>
            <span>Global Supply</span>
          </div>
          <p className={styles.description}>
            Protecting the planet with every panel we produce.
          </p>
        </div>
      </div>
    </section>
  );
}
