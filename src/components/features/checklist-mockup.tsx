"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CHECKLIST_ITEMS } from "@/lib/constants";
import { DeviceFrame } from "@/components/ui/device-frame";

export function ChecklistMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCheckedCount((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref}>
      <DeviceFrame variant="ipad">
        <div className="w-full h-full bg-[#0A1A2F] flex flex-col text-white overflow-hidden">
          {/* Header bar - matches real app */}
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#007AFF">
                <path d="M10 3L5 8l5 5" stroke="#007AFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[14px] font-semibold text-[#007AFF]">Hangar</span>
            </div>
            <div className="text-center">
              <p className="text-[17px] font-semibold">C172S Preflight</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-semibold text-[#007AFF]">
                {checkedCount}/{CHECKLIST_ITEMS.length}
              </span>
            </div>
          </div>

          {/* Progress bar - 4pt height like real app */}
          <div className="h-1 bg-[#253545] mx-6 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#007AFF] rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Quick action buttons row */}
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
            {/* Section badge - capsule pill like real app */}
            <div className="flex items-center gap-1.5 bg-[#253545] border border-[#354555] rounded-full px-3 py-1.5">
              <span className="text-[10px] font-medium uppercase tracking-[2px] text-[#8899AA]">
                Exterior
              </span>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 3l2 2 2-2" stroke="#8899AA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Checklist items - list view matching real app */}
          <div className="flex-1 overflow-hidden px-4 space-y-[10px]">
            {CHECKLIST_ITEMS.slice(0, 6).map((item, i) => {
              const isPassed = i < checkedCount;
              const isActive = i === checkedCount;

              return (
                <motion.div
                  key={i}
                  className={`flex items-center gap-3 bg-[#1C2A3A] border rounded-xl px-[14px] py-[12px] transition-all duration-300 ${
                    isPassed
                      ? "border-[#30D158]/30"
                      : isActive
                        ? "border-[#007AFF]/30 bg-[#007AFF]/5"
                        : "border-[#354555]"
                  }`}
                  animate={isPassed && i === checkedCount - 1 ? { scale: [1, 1.01, 1] } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {/* Item number */}
                  <span className="text-[14px] font-semibold text-[#8899AA] w-6 text-right shrink-0">
                    {i + 1}
                  </span>

                  {/* Challenge/Response text */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[14px] font-semibold leading-tight ${
                      isPassed ? "text-[#8899AA]" : "text-white"
                    }`}>
                      {item.challenge}
                    </p>
                    <p className={`text-[13px] font-bold mt-0.5 ${
                      isPassed ? "text-[#8899AA]" : "text-[#007AFF]"
                    }`}>
                      {item.response}
                    </p>
                  </div>

                  {/* Completion indicator */}
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      isPassed ? "bg-[#30D158]" : "bg-[#354555]/40"
                    }`}
                    animate={isPassed && i === checkedCount - 1 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.25 }}
                  >
                    {isPassed && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3.5 3.5L13 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Voice indicator - 7 bars matching LiveAudioBarsView */}
          <div className="px-6 py-3 border-t border-[#354555]">
            <div className="flex items-center justify-center gap-3 bg-[#1C2A3A]/80 backdrop-blur-xl border border-[#354555] rounded-full px-4 py-2.5">
              <div className="flex items-center gap-[8px] h-[40px]">
                {[0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6].map((intensity, i) => (
                  <div
                    key={i}
                    className="w-[6px] rounded-[3px] bg-[#007AFF]"
                    style={{
                      height: 8 + intensity * 32,
                      animation: `live-bar 1.2s ease-in-out ${i * 0.08}s infinite`,
                      animationPlayState: isInView ? "running" : "paused",
                    }}
                  />
                ))}
              </div>
              <span className="text-[13px] text-[#8899AA]">
                Voice active
              </span>
            </div>
          </div>

          <style jsx>{`
            @keyframes live-bar {
              0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
              50% { transform: scaleY(1); opacity: 1; }
            }
          `}</style>
        </div>
      </DeviceFrame>
    </div>
  );
}
