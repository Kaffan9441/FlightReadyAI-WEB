"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Badge({ children, icon, className }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-text-secondary",
        className
      )}
    >
      {icon}
      {children}
    </div>
  );
}
