"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AviationCanvas } from "./aviation-canvas";
import { LogoReveal } from "./logo-reveal";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [phase, setPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isShortened, setIsShortened] = useState(false);

  const completeLoader = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTimeout(completeLoader, 500);
      return;
    }

    // Check for repeat visit
    const hasVisited = sessionStorage.getItem("flightready-loaded");
    if (hasVisited) {
      setIsShortened(true);
      setPhase(3); // Skip to logo
      setTimeout(completeLoader, 1200);
      return;
    }

    sessionStorage.setItem("flightready-loaded", "true");

    // Full animation sequence
    const timers = [
      setTimeout(() => setPhase(1), 100),     // Horizon line
      setTimeout(() => setPhase(2), 400),      // Canvas (stars + compass)
      setTimeout(() => setPhase(3), 800),      // Logo
      setTimeout(() => setPhase(4), 2000),     // Progress arc
      setTimeout(completeLoader, 3400),        // Reveal
    ];

    return () => timers.forEach(clearTimeout);
  }, [completeLoader]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 bg-navy-950 flex items-center justify-center overflow-hidden"
        >
          {/* Aviation canvas background */}
          <AviationCanvas isVisible={phase >= 2} />

          {/* Horizon line */}
          {phase >= 1 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60%", opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] bg-[rgba(0,122,255,0.2)]"
            />
          )}

          {/* Logo reveal */}
          <div className="relative z-10">
            <LogoReveal isVisible={phase >= 3} />
          </div>

          {/* Progress arc */}
          {phase >= 4 && !isShortened && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#007AFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={100.53}
                  strokeDashoffset={100.53}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  transform="rotate(-90 20 20)"
                />
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
