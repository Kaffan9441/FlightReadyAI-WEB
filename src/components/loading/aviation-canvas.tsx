"use client";

import { useRef, useEffect } from "react";

interface AviationCanvasProps {
  isVisible: boolean;
}

export function AviationCanvas({ isVisible }: AviationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<{ x: number; y: number; size: number; alpha: number; speed: number }[]>([]);

  useEffect(() => {
    const stars: typeof starsRef.current = [];
    const count = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.5 + Math.random() * 1.5,
        alpha: 0.1 + Math.random() * 0.3,
        speed: 0.3 + Math.random() * 0.7,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, w, h);
      time += 0.01;

      // Stars
      for (const star of starsRef.current) {
        const twinkle = Math.sin(time * star.speed * 2 + star.x * 10) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, star.alpha + twinkle)})`;
        ctx.fill();
      }

      // Compass circles
      const cx = w / 2;
      const cy = h / 2;
      const r1 = Math.min(w, h) * 0.2;
      const r2 = Math.min(w, h) * 0.3;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.05);

      ctx.beginPath();
      ctx.arc(0, 0, r1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 122, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 122, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Tick marks on outer circle
      for (let i = 0; i < 36; i++) {
        const angle = (i * Math.PI * 2) / 36;
        const innerR = i % 9 === 0 ? r2 - 12 : r2 - 6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
        ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
        ctx.strokeStyle = `rgba(0, 122, 255, ${i % 9 === 0 ? 0.08 : 0.04})`;
        ctx.lineWidth = i % 9 === 0 ? 1.5 : 0.5;
        ctx.stroke();
      }

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  );
}
