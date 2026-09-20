"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Orbitron } from "next/font/google";
import styles from "./Preloader.module.css";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700"] });

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const preloaderRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const progressObj = useRef({ value: 0 });

  const strokeWidth = 10;
  const radius = 130;
  const size = 300; // SVG canvas size
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // Check if preloader has already been shown this session
    if (sessionStorage.getItem('micasa-preloader-shown')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsComplete(true);
      window.dispatchEvent(new Event('preloaderDone'));
      return;
    }

    // Lock scroll
    document.body.style.overflow = "hidden";

    // Set initial stroke dash properties
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
        document.body.style.overflow = "";
        sessionStorage.setItem('micasa-preloader-shown', 'true');
        window.dispatchEvent(new Event('preloaderDone'));
      },
    });

    // Animate the counter and the SVG circle stroke
    tl.to(progressObj.current, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        const currentProgress = progressObj.current.value;
        setProgress(Math.round(currentProgress));
        
        if (circleRef.current) {
          const offset = circumference - (currentProgress / 100) * circumference;
          circleRef.current.style.strokeDashoffset = `${offset}`;
        }
      },
    });

    // Animate preloader out (fade out + slide up)
    tl.to(preloaderRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.3,
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [circumference]);

  if (isComplete) return null;

  return (
    <div className={`${styles.preloader} ${orbitron.className}`} ref={preloaderRef}>
      
      <div className={styles.circleContainer} style={{ width: size, height: size }}>
        <svg className={styles.progressRing} width={size} height={size}>
          <defs>
            {/* Liquid Glow Gradient */}
            <linearGradient id="liquidGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb347" />
              <stop offset="50%" stopColor="#ff7b00" />
              <stop offset="100%" stopColor="#e14401" />
            </linearGradient>
            
            {/* SVG Filter for intense glow */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            className={styles.progressRingTrack}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
          />
          
          {/* Animated Progress Circle */}
          <circle
            ref={circleRef}
            className={styles.progressRingCircle}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={center}
            cy={center}
            stroke="url(#liquidGlow)"
            filter="url(#glow)"
          />
        </svg>

        <div className={styles.logoCenter}>
          <Image 
            src="/logo/micasalogo.svg" 
            alt="Micasa Logo" 
            width={140} 
            height={140} 
            className={styles.logoImage}
            priority
          />
        </div>
      </div>

      <div className={styles.textContainer}>
        <div className={styles.loadingText}>Loading</div>
        <div className={styles.percentageText}>
          {progress.toString().padStart(3, "0")}%
        </div>
      </div>
      
    </div>
  );
}
