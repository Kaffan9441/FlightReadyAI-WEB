"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
