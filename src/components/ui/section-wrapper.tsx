"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer } from "@/lib/animations";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn("py-24 md:py-40 px-6 max-w-[1200px] mx-auto", className)}
    >
      {children}
    </motion.section>
  );
}
