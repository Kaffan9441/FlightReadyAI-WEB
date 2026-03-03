"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RainbowButton } from "@/components/ui/rainbow-button";

interface EmailFormProps {
  className?: string;
}

export function EmailForm({ className }: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-[14px] glass px-6 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">You&apos;re in!</p>
              <p className="text-xs text-text-secondary">We&apos;ll be in touch at {email}</p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-12 px-5 rounded-[14px] glass bg-glass-white text-text-primary placeholder:text-text-tertiary border border-glass-border focus:border-sky-500 focus:outline-none focus:shadow-[0_0_20px_rgba(0,122,255,0.15)] transition-all text-base appearance-none"
            />
            <RainbowButton
              type="submit"
              disabled={status === "loading"}
              className="h-12 px-6 text-sm font-semibold whitespace-nowrap disabled:opacity-70"
            >
              {status === "loading" ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Get Early Access"
              )}
            </RainbowButton>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "idle" && (
        <p className="text-xs text-text-tertiary mt-3 text-center sm:text-left">
          Free beta · No credit card · Available on iPad & iPhone
        </p>
      )}
      {status === "error" && (
        <p className="text-xs text-alert mt-3 text-center sm:text-left">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
