"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Sparkles, Volume2 } from "lucide-react";

// Pre-computed bar configs for natural waveform variation
const WAVEFORM_BARS = Array.from({ length: 32 }, (_, i) => ({
  group: (i % 4) + 1,
  duration: 0.8 + ((i * 7) % 5) * 0.15,
}));

const TRANSCRIPT_WORDS = [
  "What",
  "are",
  "the",
  "crosswind",
  "limits",
  "for",
  "a",
  "172?",
];

const AI_RESPONSE = "The C172S maximum demonstrated crosswind component is 15 knots. However, student pilots should consider personal minimums of 8-10 knots until proficient.";

export function VoiceMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0); // 0=idle, 1=listening, 2=transcript, 3=AI responding, 4=TTS playing
  const [visibleWords, setVisibleWords] = useState(0);
  const [typedResponse, setTypedResponse] = useState("");

  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 4800),
      setTimeout(() => setPhase(4), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  // Transcript words appearing
  useEffect(() => {
    if (phase < 2) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < TRANSCRIPT_WORDS.length) {
        setVisibleWords(i + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  // AI response typing
  useEffect(() => {
    if (phase < 3) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < AI_RESPONSE.length) {
        setTypedResponse(AI_RESPONSE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 15);
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
            {/* TTS auto-play indicator */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#007AFF]/10 rounded-full px-3 py-1.5">
              <Volume2 className="w-3 h-3 text-[#007AFF]" />
              <span className="text-[12px] font-medium text-[#007AFF]">TTS Auto-Play On</span>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col px-6 py-4 gap-4 overflow-hidden">
            {/* Waveform + listening state */}
            {phase >= 1 && phase < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#007AFF]/15 border border-[#007AFF]/30 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <rect x="7" y="2" width="6" height="10" rx="3" fill="#007AFF"/>
                      <path d="M4 9a6 6 0 0012 0" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M10 17v2" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-[13px] font-medium text-[#007AFF]">Listening...</p>
                </div>
                {/* Waveform — 32 bars */}
                <div className="flex items-center gap-[3px] h-[48px]">
                  {WAVEFORM_BARS.map((bar, i) => (
                    <div
                      key={i}
                      className="w-[6px] rounded-[3px] bg-[#007AFF]"
                      style={{
                        height: phase >= 1 ? undefined : 8,
                        animation: phase >= 1 && phase < 3
                          ? `waveform-bar-${bar.group} ${bar.duration}s ease-in-out ${i * 0.04}s infinite`
                          : "none",
                        opacity: phase >= 1 ? undefined : 0.3,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* User voice message - appears as chat bubble after transcript */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: phase === 2 ? 3.0 : 0 }}
                className="flex justify-end"
              >
                <div
                  className="max-w-[85%] bg-[#007AFF] px-4 py-3"
                  style={{ borderRadius: "20px 20px 4px 20px" }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
                      <rect x="7" y="2" width="6" height="10" rx="3" fill="white"/>
                      <path d="M4 9a6 6 0 0012 0" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[10px] font-medium text-white/70">Voice Input</span>
                  </div>
                  <p className="text-[15px] text-white leading-relaxed">
                    {TRANSCRIPT_WORDS.slice(0, visibleWords).join(" ")}
                  </p>
                </div>
              </motion.div>
            )}

            {/* AI response with TTS indicator */}
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
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3 text-[#007AFF]" />
                    <span className="text-[11px] font-medium text-[#8899AA]">Pilot AI</span>
                  </div>
                  <div className="text-[14px] text-white leading-relaxed whitespace-pre-wrap">
                    {typedResponse}
                    {typedResponse.length < AI_RESPONSE.length && (
                      <span className="inline-block w-[2px] h-[14px] bg-[#007AFF] animate-pulse ml-0.5 align-middle" />
                    )}
                  </div>
                  {/* TTS playing indicator */}
                  {phase >= 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex items-center gap-2"
                    >
                      <div className="flex items-center gap-[4px] h-[16px]">
                        {[0.3, 0.6, 1, 0.7, 0.4].map((intensity, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-[#007AFF]"
                            style={{
                              height: 4 + intensity * 12,
                              animation: `tts-bar 0.8s ease-in-out ${i * 0.06}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#007AFF] font-medium">Speaking...</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Voice input bar */}
          <div className="px-4 py-3 border-t border-[#354555]">
            <div className="flex items-center gap-2 bg-[#1C2A3A] border border-[#354555] rounded-full px-4 py-2.5">
              <span className="text-[15px] text-[#8899AA] flex-1">
                {phase >= 1 && phase < 3 ? (
                  <span className="text-[#007AFF]">
                    {TRANSCRIPT_WORDS.slice(0, visibleWords).join(" ")}
                    <span className="inline-block w-[2px] h-[14px] bg-[#007AFF] animate-pulse ml-1 align-middle" />
                  </span>
                ) : "Tap mic or speak..."}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                phase >= 1 && phase < 3 ? "bg-[#FF453A]" : "bg-[#253545]"
              }`}>
                {phase >= 1 && phase < 3 ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                    <rect x="2" y="2" width="8" height="8" rx="1.5"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <rect x="7" y="2" width="6" height="10" rx="3" fill="#8899AA"/>
                    <path d="M4 9a6 6 0 0012 0" stroke="#8899AA" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 17v2" stroke="#8899AA" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes waveform-bar-1 {
              0%, 100% { height: 8px; opacity: 0.4; }
              50% { height: 42px; opacity: 1; }
            }
            @keyframes waveform-bar-2 {
              0%, 100% { height: 10px; opacity: 0.4; }
              50% { height: 30px; opacity: 0.9; }
            }
            @keyframes waveform-bar-3 {
              0%, 100% { height: 6px; opacity: 0.35; }
              50% { height: 48px; opacity: 1; }
            }
            @keyframes waveform-bar-4 {
              0%, 100% { height: 12px; opacity: 0.45; }
              50% { height: 36px; opacity: 0.95; }
            }
            @keyframes tts-bar {
              0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
              50% { transform: scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      </DeviceFrame>
    </div>
  );
}
