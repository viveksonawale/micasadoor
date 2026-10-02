"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHandleClick, playDoorCreak } from "../../lib/doorSound";

const IMG_GRAIN = "https://images.unsplash.com/photo-1644931551533-02906718127f?q=80&w=1600&auto=format&fit=crop";
const WALL_BG = "#F9F8F6";

export default function IntroGate() {
  const [phase, setPhase] = useState("closed"); // closed → handle → opening → blur → fade → done

  useEffect(() => {
    const hasEntered = sessionStorage.getItem("micasa-entered");
    if (hasEntered) {
      setPhase("done");
      setTimeout(() => window.dispatchEvent(new Event("micasa-gate-done")), 50);
    }
  }, []);

  useEffect(() => {
    if (phase !== "done") {
      (window as any).__gateOpen = true;
      if ((window as any).__lenis) (window as any).__lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      (window as any).__gateOpen = false;
      if ((window as any).__lenis) (window as any).__lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      (window as any).__gateOpen = false;
      if ((window as any).__lenis) (window as any).__lenis.start();
      document.body.style.overflow = "";
    };
  }, [phase]);

  const open = useCallback(() => {
    setPhase((p) => {
      if (p !== "closed") return p;
      playHandleClick();
      setTimeout(() => playDoorCreak(), 750);
      setTimeout(() => setPhase("opening"), 800);
      setTimeout(() => setPhase("blur"), 2400);
      setTimeout(() => setPhase("fade"), 2700);
      setTimeout(() => {
        sessionStorage.setItem("micasa-entered", "true");
        setPhase("done");
        window.dispatchEvent(new Event("micasa-gate-done"));
      }, 3050);
      return "handle";
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (phase === "done") return null;

  const opening = phase === "opening" || phase === "blur" || phase === "fade";

  const doorAnim =
    phase === "closed" ? { rotateY: 0 }
      : phase === "handle" ? { rotateY: 1.5 }
        : { rotateY: [1.5, -116, -106] };

  const doorTransition =
    opening
      ? { duration: 1.6, times: [0, 0.72, 1], ease: ["easeIn", [0.22, 1, 0.36, 1]] }
      : { duration: 0.4, ease: "easeOut" };

  const wallFade = {
    animate: { opacity: opening ? 0 : 1 },
    transition: { duration: 0.9, delay: opening ? 0.45 : 0, ease: "easeOut" },
  };

  const handleSkip = () => {
    sessionStorage.setItem("micasa-entered", "true");
    setPhase("done");
    window.dispatchEvent(new Event("micasa-gate-done"));
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          id="intro-gate-container"
          data-testid="intro-gate"
          className="fixed inset-0 z-[100] overflow-hidden noise-overlay"
          style={{ position: "fixed" }}
          initial={{ opacity: 1 }}
          animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* heavy blur overlay  exact match from original */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-50"
            style={{ backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", background: "rgba(244,238,227,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "blur" || phase === "fade" ? 1 : 0 }}
            transition={{ duration: 0.12 }}
          />

          {/* factory reveal */}
          <motion.div
            data-testid="intro-factory-reveal"
            className="absolute inset-0"
            initial={{ opacity: 0, filter: "blur(18px)" }}
            animate={
              phase === "closed"
                ? { opacity: 0, filter: "blur(18px)" }
                : phase === "handle"
                  ? { opacity: 1, filter: "blur(14px)" }
                  : { opacity: 1, filter: "blur(0px)" }
            }
            transition={{
              opacity: { duration: 0.6, ease: "easeOut" },
              filter: { duration: opening ? 1.6 : 0.4, ease: "easeOut" },
            }}
          >
            <img src="/factory/hero-factory.jpg" alt="Micasa Doors factory floor" className="h-full w-full object-cover" />
          </motion.div>

          {/* scene  walls surround the doorway */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1600 }}>
            <div className="relative" style={{ transform: "translateY(-3vh)" }}>
              {/* left wall */}
              <motion.div className="pointer-events-none absolute" style={{ top: "-70vh", bottom: "-70vh", right: "100%", width: "100vw", background: WALL_BG }}
                initial={{ opacity: 1 }} animate={wallFade.animate} transition={wallFade.transition as any}>
              </motion.div>
              {/* right wall */}
              <motion.div className="pointer-events-none absolute" style={{ top: "-70vh", bottom: "-70vh", left: "100%", width: "100vw", background: WALL_BG }}
                initial={{ opacity: 1 }} animate={wallFade.animate} transition={wallFade.transition as any}>
              </motion.div>
              {/* top wall */}
              <motion.div className="pointer-events-none absolute" style={{ bottom: "100%", left: "-100vw", width: "300vw", height: "70vh", background: WALL_BG }}
                initial={{ opacity: 1 }} animate={wallFade.animate} transition={wallFade.transition as any}>
                <div className="absolute inset-x-0 top-0 h-[38vh]"
                  style={{ background: "radial-gradient(ellipse 30% 90% at 50% 0%, rgba(255,248,232,0.55), transparent 70%)" }} />
              </motion.div>
              {/* floor */}
              <motion.div className="pointer-events-none absolute" style={{ top: "100%", left: "-100vw", width: "300vw", height: "28vh" }}
                initial={{ opacity: 1 }} animate={wallFade.animate} transition={wallFade.transition as any}>

                {/* Wood plank floor with perspective */}
                <div className="absolute inset-0" style={{ background: "#C8B89A", overflow: "hidden" }}>
                  {/* Base wood gradient */}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #BCA88A 0%, #C8B89A 40%, #D4C4A8 100%)" }} />

                  {/* Perspective plank lines  horizontal */}
                  {[8, 20, 35, 54, 75].map((pct, i) => (
                    <div key={i} className="absolute inset-x-0" style={{
                      top: `${pct}%`,
                      height: i < 2 ? "1px" : i < 4 ? "1.5px" : "2px",
                      background: "rgba(90, 65, 40, 0.18)",
                    }} />
                  ))}

                  {/* Vertical plank dividers with perspective convergence */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lines converging to vanishing point at top-center */}
                    {[-45, -30, -15, 0, 15, 30, 45].map((offset, i) => (
                      <line key={i}
                        x1={`${50 + offset * 0.3}%`} y1="0%"
                        x2={`${50 + offset * 3.5}%`} y2="100%"
                        stroke="rgba(80,55,30,0.12)" strokeWidth="1"
                      />
                    ))}
                  </svg>

                  {/* Subtle wood grain overlay */}
                  <div className="absolute inset-0" style={{
                    background: "repeating-linear-gradient(88deg, transparent 0px, transparent 38px, rgba(100,70,40,0.04) 38px, rgba(100,70,40,0.04) 40px)",
                  }} />

                  {/* Top shadow where wall meets floor */}
                  <div className="absolute top-0 inset-x-0 h-6" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, transparent 100%)" }} />
                </div>

                {/* Contact shadow under the door */}
                <div className="absolute left-1/2 top-[-6px] h-[14px] w-[min(60vw,280px)] -translate-x-1/2 rounded-[100%] bg-black/[0.18] blur-[8px]" />
                <div className="absolute left-1/2 top-0 h-[3px] w-[min(55vw,250px)] -translate-x-1/2 rounded-full bg-black/[0.25] blur-[2px]" />

                {/* Wood reflection under door */}
                <motion.div
                  className="absolute left-1/2 top-0 h-[28vh] w-[min(65vw,320px)] -translate-x-1/2"
                  initial={{ opacity: 0.12, scaleX: 1 }}
                  animate={{ opacity: opening ? 0.35 : 0.12, scaleX: opening ? 1.6 : 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(180deg, rgba(120,80,40,0.4) 0%, transparent 100%)",
                    transformOrigin: "top center",
                    filter: "blur(20px)",
                  }} />
              </motion.div>

              {/* door frame */}
              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute"
                  style={{ top: "-12px", left: "-12px", right: "-12px", bottom: 0, borderWidth: "12px 12px 0 12px", borderStyle: "solid", borderColor: "transparent", borderImage: "linear-gradient(160deg,#4a3524,#2c1e12 60%,#3a2818) 1", boxShadow: "0 50px 120px rgba(90,70,45,0.45)" }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: opening ? 0 : 1 }}
                  transition={{ duration: 0.7, delay: opening ? 0.25 : 0, ease: "easeOut" }}
                />
                <div className="relative overflow-hidden" style={{ height: "min(82vh, 640px)", aspectRatio: "3 / 6.4" }}>
                  {/* THE DOOR */}
                  <motion.div
                    data-testid="intro-door-panel"
                    onClick={open}
                    role="button"
                    aria-label="Open the door to enter the website"
                    className="absolute inset-0 cursor-pointer preserve-3d"
                    style={{ transformOrigin: "left center" }}
                    initial={{ rotateY: 0 }}
                    animate={doorAnim}
                    transition={doorTransition as any}
                  >
                    {/* front face */}
                    <div className="absolute inset-0 overflow-hidden bg-[#c9ad8d] backface-hidden">
                      <img src="/doors/door-face-warm.jpg" alt="Micasa fluted wooden door" className="absolute inset-0 h-full w-full object-cover" />
                      {/* shading */}
                      <motion.div className="absolute inset-0 bg-black"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: opening ? 0.22 : 0 }}
                        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }} />

                      <span
                        className="absolute rounded-sm"
                        style={{ right: "3%", top: "52.5%", width: "6.5%", height: "10.5%", background: "linear-gradient(180deg,#262626,#101010)", boxShadow: "0 2px 6px rgba(0,0,0,0.45)" }}
                      />
                      <motion.span
                        data-testid="intro-lever"
                        className="absolute rounded-full"
                        style={{
                          right: "6.25%", top: "57.5%", height: 6, width: "13%",
                          transformOrigin: "right center", translateY: "-50%",
                          background: "linear-gradient(180deg,#3a3a3a,#0d0d0d)",
                          boxShadow: "0 2px 5px rgba(0,0,0,0.5)",
                        }}
                        initial={{ rotate: 0 }}
                        animate={{ rotate: phase === "handle" ? [0, 26, 0] : 0 }}
                        transition={phase === "handle" ? { duration: 0.75, times: [0, 0.45, 1], ease: "easeInOut" } as any : { duration: 0.25 }}
                      />
                      {/* clickable hotspot */}
                      <motion.button
                        data-testid="intro-door-handle"
                        onClick={(e: any) => { e.stopPropagation(); open(); }}
                        aria-label="Door handle  click to open"
                        className="absolute z-10 flex h-24 w-24 items-center justify-center cursor-pointer"
                        style={{ right: "-2%", top: "47%" }}
                        whileTap={{ scale: 0.9 }}
                      />

                      {/* Instruction strip at the bottom of the door */}
                      <motion.div
                        className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-center"
                        style={{
                          padding: "10px 12px",
                          background: "rgba(240, 232, 220, 0.45)",
                          backdropFilter: "blur(6px)",
                          WebkitBackdropFilter: "blur(6px)",
                          borderTop: "1px solid rgba(200, 180, 150, 0.35)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "closed" ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: phase === "closed" ? 0.8 : 0 }}
                      >
                        <p
                          className="text-[10px] md:text-[11px] font-medium select-none uppercase tracking-normal"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            color: "rgba(50, 35, 20, 0.75)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          CLICK THE HANDLE TO ENTER
                        </p>
                      </motion.div>
                    </div>
                    {/* back face */}
                    <div className="absolute inset-0 backface-hidden"
                      style={{ transform: "rotateY(180deg)", background: "#b99c7c" }}>
                      <img src={IMG_GRAIN} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.85)" }} />
                    </div>
                    {/* hinge-side thickness edge */}
                    <div className="absolute inset-y-0" style={{ right: "-14px", width: "14px", transform: "rotateY(90deg)", transformOrigin: "left center", background: "linear-gradient(180deg,#8a6f52,#6b543a)" }} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* brand mark - Positioned on the left side, adjusted upwards slightly */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 md:top-[40%] md:-translate-y-1/2 md:left-[10%] lg:left-[15%] xl:left-[18%] md:translate-x-0 z-30 pointer-events-none flex flex-col items-center md:items-start"
            initial={{ opacity: 1 }}
            animate={wallFade.animate} transition={wallFade.transition as any}
          >
            <img src="/logo/logowithblacktext.svg" alt="Micasa Doors" className="h-16 md:h-28 lg:h-36 xl:h-44 w-auto object-contain drop-shadow-md" />
            <p
              className="select-none uppercase font-medium"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0",
                color: "rgba(40, 28, 18, 0.55)",
                fontSize: "clamp(12px, 1.4vw, 17px)",
                marginTop: "-1.8em",
              }}
            >
              DOORS SOLUTIONS PVT. LTD.
            </p>
          </motion.div>

          {/* skip */}
          <button
            data-testid="intro-skip-btn"
            onClick={handleSkip}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-12 font-mono2 text-[10px] tracking-normal uppercase text-charcoal/45 underline underline-offset-4 transition-colors duration-300 hover:text-wood z-50 font-bold"
            style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
          >
            Skip intro &gt;&gt;
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
