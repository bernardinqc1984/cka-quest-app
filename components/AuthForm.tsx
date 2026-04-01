"use client";

import { useState } from "react";
import { LANGS, LangKey } from "@/lib/i18n";
import { apiOAuthLogin } from "@/lib/api-client";
import { auth, googleProvider, githubProvider } from "@/lib/firebase-client";
import { signInWithPopup } from "firebase/auth";

export function AuthForm({ lang }: { lang: LangKey }) {
  const tr = LANGS[lang];
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");

  const onOAuth = async (provider: typeof googleProvider | typeof githubProvider) => {
    if (busy) return;
    setBusy(true);
    setErr("");
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const r = await apiOAuthLogin(idToken);
      if (r?.success) window.location.href = "/dashboard";
      else setErr(r?.detail || r?.error || "Error");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 460, margin: "0 auto" }}>
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: 28,
          boxShadow: "0 20px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 850, marginBottom: 20 }}>{tr.loginTitle}</div>
        {err ? (
          <div style={{ marginBottom: 14, padding: "10px 12px", borderRadius: 12, background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.35)", color: "#fee2e2" }}>
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={() => onOAuth(googleProvider)}
          style={{
            width: "100%",
            padding: "11px 12px",
            borderRadius: 14,
            border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "#e5e7eb",
            fontWeight: 700,
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.8 34.6 27 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.4 35.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.6 5.6C37.3 39.8 44 34.7 44 24c0-1.2-.1-2.4-.4-3.5z"/>
          </svg>
          {tr.signInGoogle}
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => onOAuth(githubProvider)}
          style={{
            width: "100%",
            marginTop: 10,
            padding: "11px 12px",
            borderRadius: 14,
            border: "1px solid rgba(148,163,184,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "#e5e7eb",
            fontWeight: 700,
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.02c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.32-1.74-1.32-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          {tr.signInGithub}
        </button>
      </div>
    </div>
  );
}
