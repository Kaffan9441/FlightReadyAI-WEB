"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = [
  "Every", "year,", "aviation", "incidents", "happen", "not", "because",
  "pilots", "are", "careless.", "Preflight", "gets", "rushed,", "distracted,",
  "or", "done", "from", "memory.", "FlightReadyAI", "changes", "that."
];

export function NarrativeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 bg-black overflow-hidden"
    >
      {/* Subtle background pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,122,255,0.04),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="flex flex-wrap gap-x-[0.35em] gap-y-[0.1em] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
          {WORDS.map((word, i) => {
            const start = i / WORDS.length;
            const end = (i + 1) / WORDS.length;

            return (
              <WordReveal
                key={i}
                word={word}
                progress={scrollYProgress}
                start={start * 0.35 + 0.05}
                end={end * 0.35 + 0.1}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}

function WordReveal({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: any;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const color = useTransform(
    progress,
    [start, end],
    ["rgba(255,255,255,0.12)", "rgba(255,255,255,1)"]
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {word}
    </motion.span>
  );
}
