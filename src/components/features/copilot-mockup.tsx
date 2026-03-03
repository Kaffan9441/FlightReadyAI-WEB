"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DeviceFrame } from "@/components/ui/device-frame";
import { Sparkles, Mic, Volume2 } from "lucide-react";

const USER_Q = "What are the crosswind limits for a 172?";
const AI_ANSWER =
  "The C172S maximum demonstrated crosswind component is 15 knots. Student pilots should consider personal minimums of 8–10 knots until proficient.";

export function CopilotMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [showResponse, setShowResponse] = useState(false);
  const [showSpeaking, setShowSpeaking] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setShowResponse(true), 600);
    const t2 = setTimeout(() => setShowSpeaking(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isInView]);

  return (
    <div ref={ref}>
      <DeviceFrame variant="ipad">
        <div className="w-full h-full bg-[#0A1A2F] flex flex-col text-white overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-4 pb-3 border-b border-[#354555]">
            <p className="text-[10px] font-medium tracking-[1.5px] text-[#8899AA] uppercase">
              Pilot AI
            </p>
            <div className="flex items-center justify-between mt-1">
              <h2 className="text-[22px] font-semibold">Your Pilot AI</h2>
              <div className="flex items-center gap-2">
                <div className="w-[36px] h-[36px] rounded-full bg-[#253545] flex items-center justify-center">
                  <Volume2 className="w-[15px] h-[15px] text-[#007AFF]" />
                </div>
                <div className="w-[36px] h-[36px] rounded-full bg-[#253545] flex items-center justify-center">
                  <Sparkles className="w-[15px] h-[15px] text-[#007AFF]" />
                </div>
              </div>
            </div>
            {/* TTS badge — matches real app */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#007AFF]/10 rounded-full px-3 py-1.5">
              <Volume2 className="w-3 h-3 text-[#007AFF]" />
              <span className="text-[12px] font-medium text-[#007AFF]">
                TTS Auto-Play On
              </span>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-hidden px-5 py-4 space-y-4">
            {/* User message — appears immediately */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-end gap-1"
            >
              <div className="flex items-center gap-1.5">
                <Mic className="w-3 h-3 text-[#8899AA]" />
                <span className="text-[11px] text-[#8899AA]">Voice Input</span>
              </div>
              <div
                className="max-w-[85%] bg-[#007AFF] px-4 py-3"
                style={{ borderRadius: "20px 20px 4px 20px" }}
              >
                <p className="text-[15px] text-white leading-relaxed">{USER_Q}</p>
              </div>
            </motion.div>

            {/* AI response — appears shortly after */}
            {showResponse && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div
                  className="max-w-[85%] bg-[#1C2A3A] border border-[#354555] px-4 py-3"
                  style={{ borderRadius: "20px 20px 20px 4px" }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3 h-3 text-[#007AFF]" />
                    <span className="text-[11px] font-medium text-[#8899AA]">
                      Pilot AI
                    </span>
                  </div>
                  <p className="text-[14px] text-white leading-relaxed">
                    {AI_ANSWER}
                  </p>
                  {showSpeaking && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-[3px] h-[16px]">
                        {[0.5, 0.9, 1, 0.7, 0.85, 0.6].map((h, i) => (
                          <div
                            key={i}
                            className="w-[3px] rounded-full bg-[#007AFF]"
                            style={{
                              height: 4 + h * 10,
                              animation: `copilot-bar 1.4s ease-in-out ${i * 0.1}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#007AFF]">
                        Speaking...
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Input bar — voice-first */}
          <div className="px-4 py-3 border-t border-[#354555]">
            <div className="flex items-center gap-2 bg-[#1C2A3A] border border-[#354555] rounded-full px-4 py-2.5">
              <span className="text-[15px] text-[#8899AA] flex-1">
                Tap mic or speak...
              </span>
              <div className="w-8 h-8 rounded-full bg-[#253545] flex items-center justify-center">
                <Mic className="w-4 h-4 text-[#007AFF]" />
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes copilot-bar {
              0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
              50% { transform: scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      </DeviceFrame>
    </div>
  );
}
