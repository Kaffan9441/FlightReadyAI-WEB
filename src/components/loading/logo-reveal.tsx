"use client";

import { motion } from "framer-motion";

interface LogoRevealProps {
  isVisible: boolean;
}

export function LogoReveal({ isVisible }: LogoRevealProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4"
    >
      {/* Logo wordmark */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        <span className="text-white">FlightReady</span>
        <span className="text-sky-500">AI</span>
      </h1>

      {/* Divider line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-xs tracking-[0.25em] uppercase text-text-secondary font-medium"
      >
        Preflight Intelligence
      </motion.p>
    </motion.div>
  );
}
