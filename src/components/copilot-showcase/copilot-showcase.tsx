'use client'

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Shield, Volume2 } from "lucide-react";

const capabilities = [
  {
    icon: <Brain className="w-4 h-4 text-sky-400" />,
    title: "POH-Grounded Answers",
    description: "Every response references your aircraft's Pilot Operating Handbook.",
  },
  {
    icon: <Shield className="w-4 h-4 text-success" />,
    title: "Safety-First Reasoning",
    description: "Trained to think like a cautious flight instructor, not a chatbot.",
  },
  {
    icon: <Volume2 className="w-4 h-4 text-sky-400" />,
    title: "Spoken Responses",
    description: "AI answers are read back through your headset in your choice of premium voice.",
  },
];

export function CopilotShowcase() {
  return (
    <SectionWrapper className="py-16 md:py-24">
      <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
        <p className="text-xs text-sky-500 uppercase tracking-[0.25em] font-medium mb-4">
          Powered by Gemini 2.5 Flash
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Meet your Pilot AI.
        </h2>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <div className="w-full min-h-[400px] md:min-h-[600px] relative">
          {/* Background card — rounded with glass border, but NO overflow-hidden */}
          <div className="absolute inset-0 bg-navy-900/80 border border-glass-border rounded-[24px]" />
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="#007AFF"
          />

          <div className="relative flex flex-col md:flex-row h-full min-h-[400px] md:min-h-[600px]">
            {/* Left content */}
            <div className="flex-1 p-6 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
              <Badge
                icon={<Sparkles className="w-3 h-3 text-sky-400" />}
                className="mb-6 w-fit"
              >
                AI-Powered
              </Badge>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-[1.15] mb-4">
                Your smartest
                <br />
                crew member.
              </h3>

              <p className="text-text-secondary max-w-md leading-relaxed mb-8">
                Ask about weather, NOTAMs, weight limits, or emergency procedures.
                Powered by Gemini 2.5 Flash with your aircraft&apos;s POH as context.
              </p>

              {/* Capability cards */}
              <div className="space-y-3">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-start gap-3 glass rounded-xl px-4 py-3 max-w-sm"
                  >
                    <div className="mt-0.5 shrink-0">{cap.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {cap.title}
                      </p>
                      <p className="text-xs text-text-tertiary mt-0.5">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — 3D Spline scene, overflow visible so robot arms extend freely */}
            <div className="flex-1 relative min-h-[240px] max-h-[300px] md:max-h-none md:min-h-0 overflow-hidden md:overflow-visible">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
