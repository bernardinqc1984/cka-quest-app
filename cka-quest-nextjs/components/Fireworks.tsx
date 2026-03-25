"use client";

import { useEffect, useRef } from "react";

export function Fireworks({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = ["#fbbf24", "#f87171", "#34d399", "#60a5fa", "#a78bfa", "#fb923c", "#f472b6", "#38bdf8", "#e879f9"];
    const particles: Array<{ x: number; y: number; vx: number; vy: number; g: number; life: number; decay: number; size: number; color: string }> = [];
    let raf = 0;
    let ended = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = (delay: number) => {
      window.setTimeout(() => {
        const cx = canvas.width * (0.15 + Math.random() * 0.7);
        const cy = canvas.height * (0.15 + Math.random() * 0.5);
        for (let i = 0; i < 60; i += 1) {
          const a = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
          const speed = 2 + Math.random() * 6;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            g: 0.045,
            life: 1,
            decay: 0.01 + Math.random() * 0.015,
            size: 2 + Math.random() * 3,
            color: colors[(Math.random() * colors.length) | 0],
          });
        }
      }, delay);
    };
    for (let i = 0; i < 6; i += 1) burst(i * 180);

    const start = Date.now();
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.g;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!ended && Date.now() - start < 2800) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      ended = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        opacity: active ? 1 : 0,
        transition: "opacity 220ms ease",
      }}
    />
  );
}

