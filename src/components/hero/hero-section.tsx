"use client";

import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { EmailForm } from "@/components/ui/email-form";
import { CHECKLIST_ITEMS } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

// Pre-computed star positions using golden ratio distribution — zero JS overhead at runtime
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: ((i * 137.508) % 100).toFixed(1),
  y: ((i * 73.137 + 17) % 100).toFixed(1),
  r: i % 7 === 0 ? 1.5 : i % 3 === 0 ? 1 : 0.7,
  opacity: (0.15 + (i % 5) * 0.1).toFixed(2),
  delay: `${((i * 0.13) % 2.8).toFixed(2)}s`,
  dur: `${2.5 + (i % 3)}s`,
}));

function ChecklistScreen() {
  return (
    <div className="w-full h-full bg-[#0A1A2F] flex flex-col text-white overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[14px] font-semibold text-[#007AFF]">Hangar</span>
        </div>
        <p className="text-[17px] font-semibold">C172S Preflight</p>
        <span className="text-[17px] font-semibold text-[#007AFF]">
          3/{CHECKLIST_ITEMS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#253545] mx-6 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#007AFF] rounded-full"
          style={{ width: `${(3 / CHECKLIST_ITEMS.length) * 100}%` }}
        />
      </div>

      {/* Quick actions + section badge */}
      <div className="flex items-center gap-2 px-6 py-3">
        <div className="w-9 h-9 rounded-full bg-[#007AFF]/15 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#FFD60A]/15 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v5l3 3" stroke="#FFD60A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 bg-[#253545] border border-[#354555] rounded-full px-3 py-1.5">
          <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#8899AA]">Exterior</span>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M2 3l2 2 2-2" stroke="#8899AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Checklist items */}
      <div className="flex-1 overflow-hidden px-4 space-y-[10px]">
        {CHECKLIST_ITEMS.slice(0, 6).map((item, i) => {
          const isPassed = i < 3;
          const isActive = i === 3;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 bg-[#1C2A3A] border rounded-xl px-[14px] py-[12px] ${
                isPassed ? "border-[#30D158]/30" : isActive ? "border-[#007AFF]/30 bg-[#007AFF]/5" : "border-[#354555]"
              }`}
            >
              <span className="text-[14px] font-semibold text-[#8899AA] w-6 text-right shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-semibold leading-tight ${isPassed ? "text-[#8899AA]" : "text-white"}`}>
                  {item.challenge}
                </p>
                <p className={`text-[13px] font-bold mt-0.5 ${isPassed ? "text-[#8899AA]" : "text-[#007AFF]"}`}>
                  {item.response}
                </p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isPassed ? "bg-[#30D158]" : "bg-[#354555]/40"}`}>
                {isPassed && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice indicator */}
      <div className="px-6 py-3 border-t border-[#354555]">
        <div className="flex items-center justify-center gap-3 bg-[#1C2A3A]/80 backdrop-blur-xl border border-[#354555] rounded-full px-4 py-2.5">
          <div className="flex items-center gap-[8px] h-[40px]">
            {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6].map((intensity, i) => (
              <div
                key={i}
                className="w-[6px] rounded-[3px] bg-[#007AFF]"
                style={{
                  height: 8 + intensity * 32,
                  animation: `hero-live-bar 1.8s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
          <span className="text-[13px] text-[#8899AA]">Audio readback</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-live-bar {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function HeroSection() {
  return (
    <>
      {/* ── ABOVE-FOLD: Sparkles + Editorial headline ── */}
      <section className="relative min-h-[100svh] bg-black flex flex-col items-center justify-center overflow-hidden">
        {/* CSS starfield — zero JS, pure SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {STARS.map((s, i) => (
            <circle
              key={i}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="white"
              opacity={s.opacity}
            >
              <animate
                attributeName="opacity"
                values={`${s.opacity};${(parseFloat(s.opacity) * 0.2).toFixed(2)};${s.opacity}`}
                dur={s.dur}
                begin={s.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>

        {/* Radial blue glow from top — like Opal's atmospheric depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(0,122,255,0.10),transparent)] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] text-white/25 uppercase tracking-[0.3em] font-medium mb-12 [@media(max-height:600px)]:mb-4"
          >
            iOS · Early Access
          </motion.p>

          {/* Massive headline — Dropset scale */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-white leading-[0.88] tracking-[-0.03em]"
            style={{ fontSize: "clamp(44px, min(12vw, 16vh), 148px)" }}
          >
            Preflight.
            <br />
            Done right.
          </motion.h1>

          {/* Opal-style gradient line accent under headline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8 mb-8 [@media(max-height:600px)]:mt-3 [@media(max-height:600px)]:mb-3 w-full max-w-md h-px"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#007AFF]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#007AFF]/30 to-transparent blur-sm" />
          </motion.div>

          {/* Subline — short, confident */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/35 text-lg md:text-xl max-w-xs leading-relaxed mb-10 [@media(max-height:600px)]:mb-4 [@media(max-height:600px)]:text-base"
          >
            Your Pilot AI for smarter preflights.
            <br />
            Built for the cockpit.
          </motion.p>

          {/* Email form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <EmailForm />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ── BELOW-FOLD: iPad ContainerScroll ── */}
      <div className="relative bg-[#050D17]">
        {/* Transition gradient from black → navy */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm text-white/30 font-medium tracking-[0.15em] uppercase">
                See it in action
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Every item. Every time.
              </h2>
              <p className="text-white/40 max-w-sm text-base leading-relaxed">
                Challenge-and-response format so nothing slips through during walkround.
              </p>
            </div>
          }
        >
          <ChecklistScreen />
        </ContainerScroll>
      </div>
    </>
  );
}
