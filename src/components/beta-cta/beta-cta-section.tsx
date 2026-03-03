"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { EmailForm } from "@/components/ui/email-form";
import { Sparkles } from "lucide-react";

export function BetaCTASection() {
  return (
    <section id="beta" className="relative">
      {/* Background glow — static, no animation overhead */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full bg-sky-500/[0.05]"
          style={{ filter: "blur(80px)" }}
        />
      </div>

      <SectionWrapper className="relative z-10 text-center">
        <motion.p
          variants={fadeInUp}
          className="text-xs text-sky-500 uppercase tracking-[0.25em] font-medium mb-4"
        >
          Ready for Takeoff?
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
        >
          Join the beta.
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg text-text-secondary max-w-[500px] mx-auto mb-8 leading-relaxed"
        >
          FlightReadyAI is currently in beta for iOS. Get early access and help
          shape the future of preflight.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex justify-center mb-6">
          <EmailForm />
        </motion.div>

        {/* Trust signals */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-4 text-xs text-text-tertiary"
        >
          <div className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="currentColor"
            >
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            Available on iPad & iPhone
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Free during beta
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
