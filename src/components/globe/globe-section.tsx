"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { InteractiveGlobe } from "@/components/ui/interactive-globe";
import { GLOBE_AIRPORTS, GLOBE_ROUTES } from "@/lib/constants";
import { Plane, Users, CheckSquare } from "lucide-react";

const stats = [
  { icon: <Plane className="w-4 h-4" />, value: "6", label: "Aircraft" },
  { icon: <Users className="w-4 h-4" />, value: "150+", label: "Beta Pilots" },
  {
    icon: <CheckSquare className="w-4 h-4" />,
    value: "2,400+",
    label: "Checklists",
  },
];

export function GlobeSection() {
  return (
    <SectionWrapper>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text */}
        <motion.div variants={slideInLeft} className="w-full lg:w-1/2 space-y-6">
          <p className="text-xs text-sky-500 uppercase tracking-[0.25em] font-medium">
            Global Reach
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for pilots everywhere.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-[440px]">
            FlightReadyAI works with 6 aircraft types flown at flight schools
            worldwide. Wherever you train, we&apos;ve got you covered.
          </p>

          {/* Mini stats */}
          <div className="flex items-center gap-6 pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-sky-500">{stat.icon}</div>
                <div>
                  <p className="text-lg font-bold text-text-primary">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-text-tertiary">{stat.label}</p>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-glass-border ml-3" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Globe */}
        <motion.div
          variants={slideInRight}
          className="w-full lg:w-1/2 flex items-center justify-center"
        >
          <InteractiveGlobe
            size={420}
            markers={GLOBE_AIRPORTS}
            connections={GLOBE_ROUTES}
            dotColor="rgba(0, 122, 255, ALPHA)"
            arcColor="rgba(56, 191, 255, 0.5)"
            markerColor="rgba(48, 209, 88, 1)"
            autoRotateSpeed={0.003}
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
