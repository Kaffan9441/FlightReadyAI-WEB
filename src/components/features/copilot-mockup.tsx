"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Sparkles, Send, Volume2 } from "lucide-react";

const AI_RESPONSE = `Based on current conditions at KSJC:

METAR KSJC 021856Z 32010KT 10SM FEW045 18/07 A3002

Summary: Clear skies with few clouds at 4,500ft. Winds from 320° at 10 knots. Visibility 10+ statute miles.

Recommendation: VFR conditions are favorable for your flight to KOAK. Watch for light crosswind on departure Runway 30L.`;

export function CopilotMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  useEffect(() => {
    if (phase !== 3) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < AI_RESPONSE.length) {
        setTypedText(AI_RESPONSE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div ref={ref}>
      <DeviceFrame variant="ipad">
        <div className="w-full h-full bg-[#0A1A2F] flex flex-col text-white overflow-hidden">
          {/* Header - matching CoPilotChatView */}
          <div className="px-6 pt-4 pb-3 border-b border-[#354555]">
            <p className="text-[10px] font-medium tracking-[1.5px] text-[#8899AA] uppercase">
              Pilot AI
            </p>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-[22px] font-semibold">Your Pilot AI</h2>
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-[#253545] flex items-center justify-center">
                  <Volume2 className="w-[15px] h-[15px] text-[#007AFF]" />
                </div>
                <div className="w-[36px] h-[36px] rounded-full bg-[#253545] flex items-center justify-center">
                  <Sparkles className="w-[15px] h-[15px] text-[#007AFF]" />
                </div>
              </div>
            </div>
            {/* Aircraft context picker */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#007AFF]/10 rounded-full px-3 py-1.5">
              <span className="text-[12px] font-medium text-[#007AFF]">C172S · N172SP</span>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 3l2 2 2-2" stroke="#007AFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Chat messages - matching real app bubble styles */}
          <div className="flex-1 overflow-hidden px-6 py-4 space-y-4">
            {/* User message - right aligned, sky blue, 20pt radius, asymmetric corners */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-end"
              >
                <div
                  className="max-w-[85%] bg-[#007AFF] px-4 py-3"
                  style={{ borderRadius: "20px 20px 4px 20px" }}
                >
                  <p className="text-[15px] text-white leading-relaxed">
                    What&apos;s the weather looking like for my flight from KSJC to KOAK today?
                  </p>
                </div>
              </motion.div>
            )}

            {/* Typing indicator */}
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div
                  className="bg-[#253545] px-4 py-3"
                  style={{ borderRadius: "20px 20px 20px 4px" }}
                >
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#8899AA]"
                        animate={{ y: [-2, 2, -2] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI response - left aligned, secondary card fill, asymmetric corners */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div
                  className="max-w-[85%] bg-[#253545] px-4 py-3"
                  style={{ borderRadius: "20px 20px 20px 4px" }}
                >
                  {/* AI label */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3 text-[#007AFF]" />
                    <span className="text-[11px] font-medium text-[#8899AA]">
                      Pilot AI
                    </span>
                  </div>
                  {/* Response text */}
                  <div className="text-[14px] text-white leading-relaxed whitespace-pre-wrap">
                    {typedText}
                    {typedText.length < AI_RESPONSE.length && (
                      <span className="inline-block w-[2px] h-[14px] bg-[#007AFF] animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                  {/* TTS button like real app */}
                  {typedText.length >= AI_RESPONSE.length && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#8899AA]" />
                      <span className="text-[11px] text-[#8899AA]">Listen</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar - matching real app */}
          <div className="px-4 py-3 border-t border-[#354555]">
            <div className="flex items-center gap-2 bg-[#1C2A3A] border border-[#354555] rounded-full px-4 py-2.5">
              <span className="text-[15px] text-[#8899AA] flex-1">
                Ask anything...
              </span>
              <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </DeviceFrame>
    </div>
  );
}
