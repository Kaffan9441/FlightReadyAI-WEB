"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  onClick: () => void
  icon: LucideIcon
}

interface TubelightNavProps {
  items: NavItem[]
  className?: string
}

export function TubelightNav({ items, className }: TubelightNavProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg py-1 px-1 rounded-full",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.name

        return (
          <button
            key={item.name}
            onClick={() => {
              setActiveTab(item.name)
              item.onClick()
            }}
            className={cn(
              "relative cursor-pointer text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200",
              "text-white/50 hover:text-white",
              isActive && "text-white"
            )}
          >
            {/* Desktop: text */}
            <span className="hidden md:inline">{item.name}</span>
            {/* Mobile: icon */}
            <span className="md:hidden">
              <Icon size={18} strokeWidth={2} />
            </span>

            {isActive && (
              <motion.div
                layoutId="tubelight"
                className="absolute inset-0 w-full bg-sky-500/[0.08] rounded-full -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* The tubelight bar and glow */}
                <div className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-8 h-1 bg-sky-500 rounded-t-full">
                  <div className="absolute w-12 h-6 bg-sky-500/20 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-8 h-6 bg-sky-500/20 rounded-full blur-md -top-1" />
                  <div className="absolute w-4 h-4 bg-sky-500/20 rounded-full blur-sm top-0 left-2" />
                </div>
              </motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}
