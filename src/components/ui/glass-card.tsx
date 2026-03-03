"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-[24px] p-8",
        hover &&
          "transition-all duration-300 hover:border-glass-highlight hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(0,122,255,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
