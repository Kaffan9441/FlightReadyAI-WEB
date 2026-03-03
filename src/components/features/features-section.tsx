"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Sparkles, Volume2, Scale } from "lucide-react";
import { ChecklistMockup } from "./checklist-mockup";
import { CopilotMockup } from "./copilot-mockup";
import { VoiceMockup } from "./voice-mockup";
import { WeightBalanceMockup } from "./weight-balance-mockup";

const features = [
  {
    badge: { icon: <CheckSquare className="w-3 h-3" />, label: "Pre-flight Checklist" },
    headline: "Every item. Every time.",
    description:
      "Walk around your aircraft with a structured checklist that covers every item. Challenge-and-response format ensures nothing gets missed. Track completion per flight.",
    bullets: [
      "Challenge-response format for every item",
      "6 aircraft types, every item covered",
      "Completion tracking per flight",
    ],
    mockup: <ChecklistMockup />,
  },
  {
    badge: { icon: <Sparkles className="w-3 h-3" />, label: "Pilot AI" },
    headline: "Briefings that actually brief.",
    description:
      "Ask any question about weather, NOTAMs, airspace, or regulations. Powered by Gemini 2.5 Flash, trained to think like a flight instructor.",
    bullets: [
      "Real-time METAR/TAF interpretation",
      "Airspace and TFR awareness",
      "Plain-language risk assessment",
    ],
    mockup: <CopilotMockup />,
  },
  {
    badge: { icon: <Volume2 className="w-3 h-3" />, label: "Audio Readback" },
    headline: "Hear every challenge. Loud and clear.",
    description:
      "Pilot AI reads checklist challenges and briefings aloud through your headset. Choose from 6 premium OpenAI TTS voices. Keep your eyes on the aircraft — not the screen.",
    bullets: [
      "TTS readback for every checklist challenge",
      "6 premium OpenAI voice profiles",
      "Compatible with aviation headsets",
    ],
    mockup: <VoiceMockup />,
  },
  {
    badge: { icon: <Scale className="w-3 h-3" />, label: "Weight & Balance" },
    headline: "Calculate in seconds, not minutes.",
    description:
      "Automatic weight and balance calculations with live envelope visualization. Enter your loads, see your CG position instantly. Supports all 6 fleet aircraft.",
    bullets: [
      "Visual CG envelope graph",
      "Moment arm calculations built-in",
      "Warns before you're out of limits",
    ],
    mockup: <WeightBalanceMockup />,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[#050D17]">
      {/* Section header — Dropset-style: left-aligned, large, no frills */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-[#007AFF] uppercase tracking-[0.2em] font-medium mb-5">
            Features
          </p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-[0.9] text-white">
            Built for
            <br />
            the cockpit.
          </h2>
        </motion.div>
      </div>

      {/* Feature rows — wider gutters, starker layout */}
      {features.map((feature, i) => {
        const isReversed = i % 2 !== 0;

        return (
          <div
            key={i}
            className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-28 border-t border-white/[0.05]"
          >
            <div
              className={`flex flex-col ${
                isReversed ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8 md:gap-24`}
            >
              {/* Mockup */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 flex justify-center"
              >
                <div className="w-full max-w-[480px]">{feature.mockup}</div>
              </motion.div>

              {/* Text — bigger, sparser */}
              <motion.div
                initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 space-y-8"
              >
                {/* Category label — no badge pill, just text */}
                <p className="text-xs text-[#8899AA] uppercase tracking-[0.18em] font-medium">
                  {feature.badge.label}
                </p>

                {/* Headline — Dropset-sized */}
                <h3 className="text-2xl md:text-5xl font-bold tracking-tight leading-[1.1] text-white">
                  {feature.headline}
                </h3>

                <p className="text-[#8899AA] leading-relaxed text-base max-w-[380px]">
                  {feature.description}
                </p>

                {/* Bullets — minimal dots, no glass */}
                <ul className="space-y-4 pt-2">
                  {feature.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-4 text-sm text-white/60"
                    >
                      <div className="w-px h-4 bg-[#007AFF]/50 shrink-0 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
