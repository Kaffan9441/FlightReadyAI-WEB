"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

function AnimatedCounter({
  target,
  suffix,
  isInView,
}: {
  target: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 700;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, target]);

  const display =
    target >= 100
      ? count.toLocaleString()
      : target % 1 !== 0
        ? count.toFixed(1)
        : count.toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="py-16 md:py-24 relative z-0">
      {/* Subtle gradient band */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-900/30 to-transparent" />

      <div className="relative max-w-[900px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center md:border-r md:last:border-r-0 border-glass-border"
            >
              <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-sky-500 bg-clip-text text-transparent">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </p>
              <p className="text-sm text-text-secondary mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
