"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { GlassCard } from "@/components/ui/glass-card";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import {
  Plane,
  AlertTriangle,
  BookOpen,
  AudioLines,
} from "lucide-react";
import { AIRCRAFT } from "@/lib/constants";

export function BentoGrid() {
  return (
    <SectionWrapper id="aircraft">
      <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
        <p className="text-xs text-sky-500 uppercase tracking-[0.25em] font-medium mb-4">
          Capabilities
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Everything you need, nothing you don&apos;t.
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Card 1 — Hangar (2 cols) */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <GlassCard hover className="h-full">
            <div className="flex items-start gap-3 mb-4">
              <Plane className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold">Your Hangar</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Manage your entire fleet in one place.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {["N172SP · Cessna 172S", "N150AB · Cessna 150"].map((plane, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between glass rounded-xl px-3 py-2"
                >
                  <span className="text-xs text-text-primary">{plane}</span>
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 2 — Emergency (2 cols) */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <GlassCard hover className="h-full group">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-alert shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold">
                  Emergency Procedures
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  Instant access when it matters most.
                </p>
              </div>
            </div>
            <div className="glass rounded-xl p-3 border-alert/10 group-hover:border-alert/20 transition-colors">
              <p className="text-xs font-bold text-alert mb-2 uppercase tracking-wider">
                Engine Failure After Takeoff
              </p>
              <ol className="space-y-1.5 text-[11px] text-text-secondary">
                <li className="flex gap-2">
                  <span className="text-alert font-bold">1.</span>
                  Airspeed: 65 KIAS best glide
                </li>
                <li className="flex gap-2">
                  <span className="text-alert font-bold">2.</span>
                  Mixture: Idle cutoff
                </li>
                <li className="flex gap-2">
                  <span className="text-alert font-bold">3.</span>
                  Fuel selector: OFF
                </li>
              </ol>
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 3 — Logbook (1 col) */}
        <motion.div variants={fadeInUp}>
          <GlassCard hover className="h-full">
            <BookOpen className="w-5 h-5 text-sky-500 mb-3" />
            <h3 className="text-base font-semibold">Logbook</h3>
            <div className="mt-3 space-y-1.5">
              {["KSJC → KOAK  1.2h", "KPAO → KRHV  0.8h", "KSQL → KMOD  1.5h"].map(
                (entry, i) => (
                  <div
                    key={i}
                    className="text-[11px] text-text-tertiary py-1 border-b border-white/[0.04] last:border-0"
                  >
                    {entry}
                  </div>
                )
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 4 — Voice (2 cols) */}
        <motion.div variants={fadeInUp} className="lg:col-span-2">
          <GlassCard hover className="h-full">
            <div className="flex items-start gap-3 mb-4">
              <AudioLines className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold">Voice-First Design</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Built for the cockpit, not the couch.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Voice Input", desc: "Ask Co-Pilot anything hands-free" },
                { label: "TTS Readback", desc: "Hear AI responses through your headset" },
                { label: "6 Voice Profiles", desc: "Choose from OpenAI premium voices" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between glass rounded-xl px-3 py-2"
                >
                  <span className="text-xs text-sky-400 font-medium">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-text-tertiary">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 5 — Evervault (1 col) */}
        <motion.div variants={fadeInUp}>
          <div className="border border-white/[0.08] flex flex-col items-start p-4 relative h-full rounded-2xl bg-[#0A1421] overflow-hidden">
            <Icon className="absolute h-5 w-5 -top-2.5 -left-2.5 text-white/20" />
            <Icon className="absolute h-5 w-5 -bottom-2.5 -left-2.5 text-white/20" />
            <Icon className="absolute h-5 w-5 -top-2.5 -right-2.5 text-white/20" />
            <Icon className="absolute h-5 w-5 -bottom-2.5 -right-2.5 text-white/20" />
            <EvervaultCard text="ASRS" className="flex-1 min-h-[140px]" />
            <p className="text-[11px] text-white/30 mt-2">
              Safety reporting, encrypted
            </p>
          </div>
        </motion.div>

        {/* Card 6 — Aircraft (full width) */}
        <motion.div variants={fadeInUp} className="lg:col-span-4 md:col-span-2">
          <GlassCard hover>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold">Supported Fleet</h3>
              <span className="text-[10px] text-text-tertiary glass rounded-full px-2 py-1">
                More coming soon
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
              {AIRCRAFT.map((aircraft, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[140px] glass rounded-xl p-4 text-center snap-start hover:-translate-y-1 transition-transform"
                >
                  <Plane className="w-8 h-8 text-sky-500/60 mx-auto mb-2 -rotate-45" />
                  <p className="text-xs font-medium text-text-primary">
                    {aircraft.name}
                  </p>
                  <p className="text-[10px] text-text-tertiary">
                    {aircraft.variant}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
