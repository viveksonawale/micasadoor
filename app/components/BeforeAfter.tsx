"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./BeforeAfter.module.css";

interface BeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export default function BeforeAfter({ beforeImg, afterImg }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number | string>("100%");

  useEffect(() => {
    // Keep track of container width to accurately size the inner image
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const move = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, p)));
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
    >
      {/* After Image (Background) */}
      <img
        src={afterImg}
        alt="After installation"
        className={styles.afterImage}
        draggable={false}
      />

      {/* Before Image (Clipped overlay) */}
      <div
        className={styles.beforeContainer}
        style={{ width: `${pos}%` }}
      >
        <img
          src={beforeImg}
          alt="Before installation"
          className={styles.beforeImage}
          style={{ width: containerWidth }}
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div className={styles.handleWrapper} style={{ left: `${pos}%` }}>
        <div className={styles.handleLine} />
        <div className={styles.handleButton}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 17l-5-5 5-5M13 17l5-5-5-5" />
          </svg>
        </div>
      </div>

      {/* Badges */}
      <span className={styles.badgeLeft}>BEFORE</span>
      <span className={styles.badgeRight}>AFTER</span>
    </div>
  );
}
