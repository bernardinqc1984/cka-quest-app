"use client";

import Link from "next/link";
import { DOMAINS } from "@/lib/questions";
import { LANGS, LangKey } from "@/lib/i18n";

export function Dashboard({
  lang,
  answered,
}: {
  lang: LangKey;
  answered: Record<string, { correct: boolean; at: number; xp: number }>;
}) {
  const tr = LANGS[lang];

  const domainProgress = DOMAINS.map((d) => {
    const total = d.questions.length;
    const done = d.questions.reduce((acc, _q, idx) => (answered?.[`${d.id}:${idx}`] ? acc + 1 : acc), 0);
    const ok = d.questions.reduce((acc, _q, idx) => (answered?.[`${d.id}:${idx}`]?.correct ? acc + 1 : acc), 0);
    return { domain: d, total, done, ok, pct: total ? Math.round((done / total) * 100) : 0 };
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 16px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 26, fontWeight: 900 }}>{tr.welcome}</div>
        <div style={{ color: "rgba(148,163,184,0.92)" }}>{tr.domains}: {DOMAINS.length} · {tr.questions}: {Object.keys(answered || {}).length}</div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {domainProgress.map((p) => (
          <Link
            key={p.domain.id}
            href={`/quiz/${p.domain.id}`}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: 14,
              boxShadow: "0 18px 80px rgba(0,0,0,0.25)",
              display: "block",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 20 }}>{p.domain.icon}</div>
              <div style={{ fontWeight: 900 }}>{p.domain.name}</div>
              <div style={{ flex: 1 }} />
              <div style={{ color: "rgba(165,180,252,0.95)", fontWeight: 800 }}>{p.pct}%</div>
            </div>
            <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(148,163,184,0.14)", overflow: "hidden" }}>
              <div style={{ width: `${p.pct}%`, height: "100%", background: p.domain.color, opacity: 0.9 }} />
            </div>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", color: "rgba(148,163,184,0.92)" }}>
              <span>{p.done}/{p.total} {tr.done}</span>
              <span>{p.ok} {tr.goodAns}</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 980px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

