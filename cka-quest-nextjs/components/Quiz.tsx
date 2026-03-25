"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DOMAINS } from "@/lib/questions";
import { LANGS, LangKey } from "@/lib/i18n";
import { Fireworks } from "@/components/Fireworks";
import { saveProgress } from "@/lib/api-client";

type Answered = Record<string, { correct: boolean; at: number; xp: number }>;

export function Quiz({
  lang,
  domainId,
  username,
  xp,
  streak,
  answered,
  onProgress,
}: {
  lang: LangKey;
  domainId: string;
  username: string;
  xp: number;
  streak: number;
  answered: Answered;
  onProgress: (next: { xp: number; streak: number; answered: Answered }) => void;
}) {
  const tr = LANGS[lang];
  const domain = useMemo(() => DOMAINS.find((d) => d.id === domainId) || null, [domainId]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFx, setShowFx] = useState(false);
  const [delta, setDelta] = useState<number | null>(null);

  useEffect(() => {
    setIdx(0);
    setSelected(null);
  }, [domainId]);

  if (!domain) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <div style={{ fontWeight: 900 }}>Unknown domain</div>
        <Link href="/dashboard" style={{ marginTop: 12, display: "inline-block" }}>
          {tr.back}
        </Link>
      </div>
    );
  }

  const q = domain.questions[idx];
  const key = `${domain.id}:${idx}`;
  const already = answered?.[key];

  const handlePick = async (choice: number) => {
    if (selected !== null) return;
    setSelected(choice);

    const correct = choice === q.answer;
    const base = q.xp;
    const gain = correct ? base + Math.min(10, streak * 2) : 0;
    const nextXP = xp + gain;
    const nextStreak = correct ? streak + 1 : 0;
    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const nextAnswered: Answered = {
      ...(answered || {}),
      [key]: { correct, at: now, xp: correct ? gain : 0 },
    };

    if (correct) {
      setDelta(gain);
      setShowFx(true);
      window.setTimeout(() => setShowFx(false), 2600);
      window.setTimeout(() => setDelta(null), 1500);
    } else {
      setDelta(0);
      window.setTimeout(() => setDelta(null), 900);
    }

    onProgress({ xp: nextXP, streak: nextStreak, answered: nextAnswered });
    await saveProgress(nextXP, nextStreak, nextAnswered);
  };

  const next = () => {
    setSelected(null);
    setIdx((i) => Math.min(domain.questions.length - 1, i + 1));
  };

  const done = idx >= domain.questions.length - 1 && selected !== null;

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "18px 16px 60px", position: "relative", zIndex: 1 }}>
      <Fireworks active={showFx} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <Link
          href="/dashboard"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(148,163,184,0.18)",
            background: "rgba(15,23,42,0.55)",
          }}
        >
          ← {tr.back}
        </Link>
        <div style={{ opacity: 0.9, color: "rgba(165,180,252,0.95)", fontWeight: 900 }}>
          {domain.icon} {domain.name} · Q {idx + 1}/{domain.questions.length}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: 16,
          boxShadow: "0 22px 90px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: "#f9fafb",
              lineHeight: 1.35,
              textShadow: "0 1px 0 rgba(0,0,0,0.35)",
            }}
          >
            {q.q}
          </div>
          {delta !== null ? (
            <div style={{ fontWeight: 900, color: delta > 0 ? "rgba(167,243,208,0.98)" : "rgba(248,113,113,0.95)" }}>
              {delta > 0 ? `+${delta} XP` : ""}
            </div>
          ) : null}
        </div>

        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {q.options.map((opt, i) => {
            const isPick = selected === i;
            const isRight = selected !== null && i === q.answer;
            const isWrong = selected !== null && isPick && i !== q.answer;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handlePick(i)}
                disabled={selected !== null}
                style={{
                  textAlign: "left",
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(148,163,184,0.18)",
                  background: "rgba(2,6,23,0.35)",
                  color: "#e5e7eb",
                  cursor: selected !== null ? "default" : "pointer",
                  boxShadow: isRight ? "0 0 0 2px rgba(34,197,94,0.22) inset" : isWrong ? "0 0 0 2px rgba(248,113,113,0.20) inset" : "none",
                }}
              >
                <span style={{ fontWeight: 900, marginRight: 10, color: "rgba(165,180,252,0.95)" }}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null ? (
          <div style={{ marginTop: 14, padding: "12px 12px", borderRadius: 14, border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.55)" }}>
            {selected === q.answer ? (
              <div style={{ fontWeight: 900, color: "rgba(167,243,208,0.98)" }}>{tr.correct}</div>
            ) : (
              <div style={{ fontWeight: 900, color: "rgba(254,202,202,0.98)" }}>
                {tr.wrongPre} <span style={{ color: "#e5e7eb" }}>{q.options[q.answer]}</span>
              </div>
            )}
            <div style={{ marginTop: 8, color: "rgba(229,231,235,0.9)", lineHeight: 1.45 }}>{q.explanation}</div>
            {selected !== q.answer ? <div style={{ marginTop: 8, color: "rgba(165,180,252,0.95)" }}>{tr.encourage}</div> : null}
          </div>
        ) : null}

        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ opacity: 0.9, color: "rgba(148,163,184,0.92)" }}>
            {username} · XP {xp} · 🔥 {streak}
          </div>
          {selected !== null ? (
            done ? (
              <Link
                href="/dashboard"
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(99,102,241,0.35)",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(236,72,153,0.22))",
                  fontWeight: 900,
                }}
              >
                {tr.results}
              </Link>
            ) : (
              <button
                type="button"
                onClick={next}
                style={{
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(99,102,241,0.35)",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(236,72,153,0.22))",
                  color: "#fff",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                {tr.next}
              </button>
            )
          ) : null}
        </div>

        {already ? (
          <div style={{ marginTop: 10, opacity: 0.8, color: "rgba(148,163,184,0.92)" }}>
            (Already answered on this account)
          </div>
        ) : null}
      </div>
    </div>
  );
}

