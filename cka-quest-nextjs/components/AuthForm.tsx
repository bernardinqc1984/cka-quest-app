"use client";

import { useMemo, useState } from "react";
import { LANGS, LangKey } from "@/lib/i18n";
import { apiLogin, apiRegister } from "@/lib/api-client";

export function AuthForm({ lang, mode }: { lang: LangKey; mode: "login" | "register" }) {
  const tr = LANGS[lang];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  const title = useMemo(() => (mode === "login" ? tr.loginTitle : tr.registerTitle), [mode, tr.loginTitle, tr.registerTitle]);
  const dbHelp = useMemo(() => {
    if (lang === "fr") return "Base de données non configurée (POSTGRES_URL). Lance `vercel env pull .env.local` dans le dossier `cka-quest/` puis redémarre `npm run dev`.";
    return "Database not configured (POSTGRES_URL). Run `vercel env pull .env.local` in `cka-quest/` then restart `npm run dev`.";
  }, [lang]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const fn = mode === "login" ? apiLogin : apiRegister;
      const r = await fn(username, password);
      if (r?.error === "fields_required") setErr(tr.errFields);
      else if (r?.error === "user_exists") setErr(tr.errUser);
      else if (r?.error === "invalid_credentials") setErr(tr.errCred);
      else if (r?.error === "db_not_configured") setErr(dbHelp);
      else if (r?.error === "bad_json_response") setErr(dbHelp);
      else if (r?.success) window.location.href = "/dashboard";
      else setErr("Error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", maxWidth: 460, margin: "0 auto" }}>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: 18,
          boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 850, marginBottom: 10 }}>{title}</div>
        {err ? (
          <div style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.35)", color: "#fee2e2" }}>
            {err}
          </div>
        ) : null}
        <label style={{ display: "block", fontWeight: 700, color: "rgba(165,180,252,0.95)", marginTop: 10 }}>
          {tr.user}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={{
              width: "100%",
              marginTop: 6,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.2)",
              background: "rgba(2,6,23,0.45)",
              color: "#e5e7eb",
            }}
          />
        </label>
        <label style={{ display: "block", fontWeight: 700, color: "rgba(165,180,252,0.95)", marginTop: 12 }}>
          {tr.pass}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            style={{
              width: "100%",
              marginTop: 6,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(148,163,184,0.2)",
              background: "rgba(2,6,23,0.45)",
              color: "#e5e7eb",
            }}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(99,102,241,0.35)",
            background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(236,72,153,0.22))",
            color: "#fff",
            fontWeight: 850,
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {mode === "login" ? tr.login : tr.register}
        </button>
      </div>
    </form>
  );
}

