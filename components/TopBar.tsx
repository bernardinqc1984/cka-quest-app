"use client";

import { LANGS, LangKey } from "@/lib/i18n";

type Props = {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  username: string;
  levelName: string;
  xp: number;
  streak: number;
  onLogout: () => void;
};

export function TopBar({ lang, setLang, username, levelName, xp, streak, onLogout }: Props) {
  const tr = LANGS[lang];
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backdropFilter: "blur(10px)",
        background: "rgba(6,10,20,0.6)",
        borderBottom: "1px solid rgba(148,163,184,0.14)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 800, letterSpacing: 0.6 }}>CKA QUEST</div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            padding: "6px 10px",
            background: "rgba(15,23,42,0.55)",
            border: "1px solid rgba(148,163,184,0.16)",
            borderRadius: 999,
          }}
        >
          <span style={{ color: "rgba(165,180,252,0.95)", fontWeight: 700 }}>{levelName}</span>
          <span style={{ opacity: 0.85 }}>⚡ {xp} XP</span>
          <span style={{ opacity: 0.85 }}>🔥 {streak}</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ opacity: 0.9 }}>{username}</span>
          <button
            type="button"
            onClick={onLogout}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(248,113,113,0.4)",
              background: "rgba(248,113,113,0.08)",
              color: "#fee2e2",
              cursor: "pointer",
            }}
          >
            {tr.logout}
          </button>
          <select
            aria-label="Language"
            value={lang}
            onChange={(e) => setLang(e.target.value as LangKey)}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid rgba(148,163,184,0.18)",
              background: "rgba(15,23,42,0.55)",
              color: "#e5e7eb",
              cursor: "pointer",
            }}
          >
            {(Object.keys(LANGS) as LangKey[]).map((k) => (
              <option key={k} value={k}>
                {LANGS[k].flag} {LANGS[k].name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

