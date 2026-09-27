"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHandleClick, playDoorCreak } from "../../lib/doorSound";

const WALL_BG = "#ffffff";
const IMG_GRAIN = "https://images.unsplash.com/photo-1644931551533-02906718127f?q=80&w=1600&auto=format&fit=crop";

export default function IntroGate() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("closed"); // closed → handle → opening → blur → fade → done

  useEffect(() => {
    // Check if we've already entered in this session
    const hasEntered = sessionStorage.getItem("micasa-entered");
    if (hasEntered) {
      setPhase("done");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (phase !== "done" && mounted) {
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
  }, [phase, mounted]);

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

  if (!mounted || phase === "done") return null;

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
  };

  return (
    <AnimatePresence>
      <motion.div
        data-testid="intro-gate"
        className="fixed inset-0 z-[100] overflow-hidden noise-overlay"
        style={{ position: "fixed" }}
        animate={phase === "fade" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {/* heavy blur overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-50"
          style={{ backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", background: "rgba(255,255,255,0.25)" }}
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

        {/* scene — walls */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: 1600 }}>
          <div className="relative" style={{ transform: "translateY(-3vh)" }}>
            {/* left wall */}
            <motion.div className="pointer-events-none absolute" style={{ top: "-70vh", bottom: "-70vh", right: "100%", width: "100vw", background: WALL_BG }}
              animate={wallFade.animate} transition={wallFade.transition as any}>
              <div className="absolute inset-y-0 hidden md:block w-px bg-black/[0.06]" style={{ right: "14vw" }} />
            </motion.div>
            {/* right wall */}
            <motion.div className="pointer-events-none absolute" style={{ top: "-70vh", bottom: "-70vh", left: "100%", width: "100vw", background: WALL_BG }}
              animate={wallFade.animate} transition={wallFade.transition as any}>
              <div className="absolute inset-y-0 hidden md:block w-px bg-black/[0.06]" style={{ left: "14vw" }} />
            </motion.div>
            {/* top wall */}
            <motion.div className="pointer-events-none absolute" style={{ bottom: "100%", left: "-100vw", width: "300vw", height: "70vh", background: WALL_BG }}
              animate={wallFade.animate} transition={wallFade.transition as any}>
              <div className="absolute inset-x-0 top-0 h-[38vh]"
                style={{ background: "radial-gradient(ellipse 30% 90% at 50% 0%, rgba(255,248,232,0.55), transparent 70%)" }} />
            </motion.div>
            {/* floor */}
            <motion.div className="pointer-events-none absolute" style={{ top: "100%", left: "-100vw", width: "300vw", height: "70vh" }}
              animate={wallFade.animate} transition={wallFade.transition as any}>
              <div className="absolute inset-0"
                style={{
                  background: "repeating-linear-gradient(90deg, rgba(90,70,45,0.10) 0 2px, transparent 2px 140px), linear-gradient(180deg, #d9cdb8, #b6a588 85%)",
                  transform: "perspective(500px) rotateX(58deg)",
                  transformOrigin: "top center",
                }} />
              <motion.div
                className="absolute left-1/2 top-0 h-[13vh] w-[300px] -translate-x-1/2"
                animate={{ opacity: opening ? 0.85 : 0.06, scaleX: opening ? 2.4 : 0.7 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  background: "linear-gradient(180deg, rgba(255,230,190,0.6), transparent 80%)",
                  clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
                  filter: "blur(6px)",
                  transform: "translateX(-50%) perspective(500px) rotateX(58deg)",
                  transformOrigin: "top center",
                }} />
              <div className="absolute left-1/2 top-0 h-8 w-[320px] -translate-x-1/2 rounded-[50%] bg-[#5a4632]/40 blur-lg" />
            </motion.div>

            {/* door frame */}
            <div className="relative">
              <motion.div
                className="pointer-events-none absolute"
                style={{ inset: "-12px", border: "12px solid transparent", borderImage: "linear-gradient(160deg,#4a3524,#2c1e12 60%,#3a2818) 1", boxShadow: "0 50px 120px rgba(90,70,45,0.45)" }}
                animate={{ opacity: opening ? 0 : 1 }}
                transition={{ duration: 0.7, delay: opening ? 0.25 : 0, ease: "easeOut" }}
              />
              <div className="relative overflow-hidden" style={{ width: "min(70vw, 300px)", aspectRatio: "3 / 6.4" }}>
                {/* THE DOOR */}
                <motion.div
                  data-testid="intro-door-panel"
                  onClick={open}
                  role="button"
                  aria-label="Open the door to enter the website"
                  className="absolute inset-0 cursor-pointer"
                  style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                  animate={doorAnim}
                  transition={doorTransition as any}
                >
                  {/* front face */}
                  <div className="absolute inset-0 overflow-hidden bg-[#c9ad8d]" style={{ backfaceVisibility: "hidden" }}>
                    <img src="/doors/door-face-warm.jpg" alt="Micasa fluted wooden door" className="absolute inset-0 h-full w-full object-cover" />
                    {/* shading */}
                    <motion.div className="absolute inset-0 bg-black"
                      animate={{ opacity: opening ? 0.22 : 0 }}
                      transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }} />
                    {/* animated black handle */}
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
                      animate={{ rotate: phase === "handle" ? [0, 26, 0] : 0 }}
                      transition={phase === "handle" ? { duration: 0.75, times: [0, 0.45, 1], ease: "easeInOut" } : { duration: 0.25 }}
                    />
                    {/* clickable hotspot */}
                    <motion.button
                      data-testid="intro-door-handle"
                      onClick={(e: any) => { e.stopPropagation(); open(); }}
                      aria-label="Door handle — click to open"
                      className="absolute z-10 flex h-24 w-24 items-center justify-center transition-all duration-300"
                      style={{ right: "-2%", top: "47%" }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {phase === "closed" && (
                        <motion.span
                          className="absolute h-12 w-12 rounded-full border-2 border-[var(--color-primary-base)]"
                          animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>
                  </div>
                  {/* back face */}
                  <div className="absolute inset-0"
                    style={{ transform: "rotateY(180deg)", background: "#b99c7c", backfaceVisibility: "hidden" }}>
                    <img src={IMG_GRAIN} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" style={{ filter: "brightness(0.85)" }} />
                  </div>
                  {/* hinge-side thickness edge */}
                  <div className="absolute inset-y-0" style={{ right: "-14px", width: "14px", transform: "rotateY(90deg)", transformOrigin: "left center", background: "linear-gradient(180deg,#8a6f52,#6b543a)" }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* brand mark */}
        <div className="absolute left-6 top-6 md:left-12 md:top-8 z-[60]">
          <img src="/logo/logowithblacktext.svg" alt="Micasa Doors" className="h-24 md:h-32 w-auto" />
        </div>



        {/* skip */}
        <button
          data-testid="intro-skip-btn"
          onClick={handleSkip}
          className="absolute bottom-6 right-6 md:bottom-8 md:right-12 text-[10px] uppercase text-[var(--color-text-muted)] underline underline-offset-4 transition-colors duration-300 hover:text-[var(--color-primary-base)] z-50" style={{ fontFamily: "var(--font-inter)" }}
        >
          Skip intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
