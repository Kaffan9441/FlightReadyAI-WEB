"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CinematicLoader } from "@/components/loading/cinematic-loader";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/hero/hero-section";

// Lazy-load all below-fold sections — keeps initial bundle small
const NarrativeSection = dynamic(
  () => import("@/components/narrative/narrative-section").then((m) => ({ default: m.NarrativeSection })),
  { ssr: false }
);
const FeaturesSection = dynamic(
  () => import("@/components/features/features-section").then((m) => ({ default: m.FeaturesSection })),
  { ssr: false }
);
const CopilotShowcase = dynamic(
  () => import("@/components/copilot-showcase/copilot-showcase").then((m) => ({ default: m.CopilotShowcase })),
  { ssr: false }
);
const FeaturesGrid = dynamic(
  () => import("@/components/features/features-grid").then((m) => ({ default: m.FeaturesGrid })),
  { ssr: false }
);
const GlobeSection = dynamic(
  () => import("@/components/globe/globe-section").then((m) => ({ default: m.GlobeSection })),
  { ssr: false }
);
const StatsSection = dynamic(
  () => import("@/components/social-proof/stats-section").then((m) => ({ default: m.StatsSection })),
  { ssr: false }
);
const BetaCTASection = dynamic(
  () => import("@/components/beta-cta/beta-cta-section").then((m) => ({ default: m.BetaCTASection })),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/layout/footer").then((m) => ({ default: m.Footer })),
  { ssr: false }
);

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <CinematicLoader onComplete={() => setLoadingComplete(true)} />

      <div
        className={`transition-opacity duration-700 ${
          loadingComplete ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <NarrativeSection />
          <FeaturesSection />
          <CopilotShowcase />
          <FeaturesGrid />
          <GlobeSection />
          <StatsSection />
          <BetaCTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
