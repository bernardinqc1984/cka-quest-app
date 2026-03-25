"use client";

import { useMemo } from "react";

export function K8sBg() {
  const floats = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 8 + i * 11 + (i % 2) * 3,
        top: 5 + (i * 12) % 75,
        dur: 16 + (i * 1.3) % 9,
        sym: i % 2 ? "☸" : "⎈",
      })),
    []
  );
  const nodes = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: 12 + i * 18,
        top: 24 + (i % 3) * 20,
        delay: i * 1.1,
      })),
    []
  );
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 9} x2="100" y2={i * 9} stroke="rgba(148,163,184,0.35)" strokeWidth="0.25" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} y1="0" x1={i * 9} y2="100" x2={i * 9} stroke="rgba(148,163,184,0.35)" strokeWidth="0.25" />
        ))}
      </svg>
      {floats.map((f) => (
        <span
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.left}%`,
            top: `${f.top}%`,
            opacity: 0.16,
            fontSize: 42,
            filter: "blur(0.2px)",
            animation: `ckaFloat ${f.dur}s ease-in-out infinite`,
          }}
        >
          {f.sym}
        </span>
      ))}
      {nodes.map((n) => (
        <span
          key={n.id}
          style={{
            position: "absolute",
            left: `${n.left}%`,
            top: `${n.top}%`,
            width: 10,
            height: 10,
            borderRadius: 999,
            background: "rgba(96,165,250,0.45)",
            boxShadow: "0 0 0 6px rgba(96,165,250,0.08)",
            animation: `ckaPulse 2.4s ease-in-out ${n.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes ckaFloat { 
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ckaPulse {
          0% { transform: scale(0.92); opacity: 0.45; }
          50% { transform: scale(1.06); opacity: 0.75; }
          100% { transform: scale(0.92); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

