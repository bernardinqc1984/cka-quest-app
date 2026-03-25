"use client";

import Link from "next/link";
import { LANGS, LangKey } from "@/lib/i18n";
import { LangPicker } from "@/components/LangPicker";
import type React from "react";

export function Landing({ lang, setLang }: { lang: LangKey; setLang: (l: LangKey) => void }) {
  const tr = LANGS[lang];
  return (
    <div className="main">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <LangPicker lang={lang} setLang={setLang} />
      </div>

      <div className="hero">
        <div className="wheel">☸</div>
        <h1>{tr.hero}</h1>
        <p className="sub">{tr.heroSub}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/auth?mode=register" className="cta" style={{ display: "inline-block" }}>
            {tr.start}
          </Link>
          <Link
            href="/auth?mode=login"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "13px 20px",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.18)",
              background: "rgba(15,23,42,0.55)",
              color: "rgba(229,231,235,0.95)",
              fontWeight: 800,
            }}
          >
            {tr.login}
          </Link>
        </div>
        <section className="warn">
          <h3>{tr.warnTitle}</h3>
          <p style={{ margin: 0, color: "var(--text2)", opacity: 0.92, lineHeight: 1.7 }}>{tr.warnText}</p>
          <span className="badge-exam">{tr.exam}</span>
        </section>

        <div className="features">
          {([
            { title: tr.f1, desc: tr.f1d },
            { title: tr.f2, desc: tr.f2d },
            { title: tr.f3, desc: tr.f3d },
            { title: tr.f4, desc: tr.f4d },
          ] as const).map((x, i) => (
            <article key={x.title} className="feature" style={{ animationDelay: `${0.6 + i * 0.12}s` } as React.CSSProperties}>
              <h4 style={{ margin: 0, fontWeight: 900, color: "rgba(229,231,235,0.95)" }}>{x.title}</h4>
              <p style={{ marginTop: 8 }}>{x.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

