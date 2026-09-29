"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./StatsSection.module.css";

interface FormattedResult {
  value: string;
  unit?: string;
}

interface AnimatedNumberProps {
  end: number;
  suffix?: string;
  duration?: number;
  formatter?: (val: number) => FormattedResult;
}

function AnimatedNumber({ end, suffix = "", duration = 2200, formatter }: AnimatedNumberProps) {
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

  let numberPart = "";
  let unitPart = "";

  if (formatter) {
    const res = formatter(count);
    numberPart = res.value;
    unitPart = res.unit || "";
  } else {
    numberPart = count.toLocaleString("en-IN");
  }

  return (
    <h2 ref={ref} className={styles.title}>
      <span className={styles.numberPart}>{numberPart}</span>
      {unitPart ? (
        <span className={styles.unitPart}>{unitPart}</span>
      ) : suffix ? (
        <span className={styles.suffixPart}>{suffix}</span>
      ) : null}
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
            Unmatched Laminated Door Production Capacity.
          </p>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <AnimatedNumber 
            end={1000} 
            duration={2200} 
            formatter={(val) => {
              if (val >= 1000) return { value: "1", unit: "Million+" };
              if (val === 0) return { value: "0", unit: "" };
              return { value: `${val}`, unit: "K+" };
            }}
          />
          <div className={styles.subtitle}>
            <div className={styles.dot}></div>
            <span>Doors Delivered</span>
          </div>
          <p className={styles.description}>
            Delivered and installed door till date.
          </p>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <AnimatedNumber end={400000} suffix="+" duration={2200} />
          <div className={styles.subtitle}>
            <div className={styles.dot}></div>
            <span>Sq. Ft. (4 Lakh)</span>
          </div>
          <p className={styles.description}>
            Total Land Parcel for top Notch Production.
          </p>
        </div>
      </div>
    </section>
  );
}
