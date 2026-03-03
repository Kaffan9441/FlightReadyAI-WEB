"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TubelightNav } from "@/components/ui/tubelight-navbar";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { LayoutGrid, Plane } from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Features",
    icon: LayoutGrid,
    onClick: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    name: "Aircraft",
    icon: Plane,
    onClick: () => document.getElementById("aircraft")?.scrollIntoView({ behavior: "smooth" }),
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBeta = () =>
    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "glass border-b border-white/[0.08]" : "bg-transparent"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-0 group shrink-0"
        >
          <span className="text-lg font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors">
            FlightReady
          </span>
          <span className="text-lg font-bold text-sky-500">AI</span>
        </button>

        {/* Tubelight nav pill — desktop */}
        <TubelightNav items={NAV_ITEMS} className="hidden md:flex" />

        {/* Join Beta CTA */}
        <RainbowButton onClick={scrollToBeta} className="text-sm px-5 py-2 h-auto">
          Join Beta
        </RainbowButton>
      </div>
    </motion.nav>
  );
}
