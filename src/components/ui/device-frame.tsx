"use client";

import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  children: React.ReactNode;
  variant?: "ipad" | "iphone";
  className?: string;
}

export function DeviceFrame({
  children,
  variant = "ipad",
  className,
}: DeviceFrameProps) {
  if (variant === "iphone") {
    return (
      <div
        className={cn(
          "relative w-[280px] h-[570px] rounded-[44px] border-[3px] border-white/12 bg-navy-900 p-[3px]",
          className
        )}
      >
        {/* Notch */}
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-navy-900 rounded-b-[13px] z-10" />
        {/* Top highlight */}
        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {/* Screen */}
        <div className="w-full h-full rounded-[41px] overflow-hidden bg-navy-950">
          {children}
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
      </div>
    );
  }

  // iPad frame
  return (
    <div
      className={cn(
        "relative w-full max-w-[480px] aspect-[3/4] rounded-[18px] border-[3px] border-white/12 bg-navy-900 p-[3px]",
        className
      )}
    >
      {/* Camera dot */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-navy-800 rounded-full border border-white/10 z-10" />
      {/* Top highlight */}
      <div className="absolute top-0 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      {/* Screen */}
      <div className="w-full h-full rounded-[15px] overflow-hidden bg-navy-950">
        {children}
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/15 rounded-full" />
    </div>
  );
}
