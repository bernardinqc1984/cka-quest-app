"use client";

import { useEffect, useMemo, useState } from "react";
import { LANGS } from "@/lib/i18n";
import { useLang } from "@/components/LangProvider";
import { apiLogout, getProgress, resetProgress } from "@/lib/api-client";
import { levelForXP } from "@/lib/levels";
import { TopBar } from "@/components/TopBar";

export type UserState = {
  username: string;
  xp: number;
  streak: number;
  answered: Record<string, { correct: boolean; at: number; xp: number }>;
};

export function useAppState() {
  const { lang, setLang } = useLang();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<UserState | null>(null);

  const refresh = async () => {
    const data = await getProgress();
    if (data && data.username) {
      setUser({
        username: data.username,
        xp: data.xp || 0,
        streak: data.streak || 0,
        answered: data.answered || {},
      });
    } else {
      setUser(null);
    }
    setLoaded(true);
  };

  useEffect(() => {
    const t = window.setTimeout(() => {
      void refresh();
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  const level = useMemo(() => levelForXP(user?.xp || 0), [user?.xp]);

  const onLogout = async () => {
    await apiLogout();
    setUser(null);
    window.location.href = "/";
  };

  const onReset = async () => {
    await resetProgress();
    await refresh();
  };

  const setProgress = (next: { xp: number; streak: number; answered: UserState["answered"] }) => {
    if (!user) return;
    setUser({ ...user, ...next });
  };

  return { lang, setLang, loaded, user, level, onLogout, onReset, setProgress, refresh };
}

export function Shell({
  children,
  titleRight,
}: {
  children: React.ReactNode;
  titleRight?: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh" }}>
      {titleRight}
      {children}
    </div>
  );
}

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, loaded, user, level, onLogout, onReset } = useAppState();
  const tr = LANGS[lang];

  if (!loaded) {
    return <div style={{ padding: 24, opacity: 0.85 }}>Loading…</div>;
  }
  if (!user) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, position: "relative", zIndex: 1 }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{tr.errCred}</div>
          <div style={{ marginTop: 10, opacity: 0.9 }}>Please login again.</div>
          <a
            href="/auth"
            style={{
              display: "inline-block",
              marginTop: 12,
              padding: "10px 12px",
              borderRadius: 14,
              border: "1px solid rgba(99,102,241,0.35)",
              background: "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(236,72,153,0.22))",
              fontWeight: 900,
            }}
          >
            {tr.login}
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBar
        lang={lang}
        setLang={setLang}
        username={user.username}
        levelName={`${level.icon} ${level.name}`}
        xp={user.xp}
        streak={user.streak}
        onLogout={onLogout}
      />
      <div style={{ position: "fixed", right: 16, bottom: 16, zIndex: 20 }}>
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            border: "1px solid rgba(148,163,184,0.18)",
            background: "rgba(15,23,42,0.55)",
            color: "rgba(229,231,235,0.95)",
            cursor: "pointer",
          }}
        >
          {tr.reset}
        </button>
      </div>
      {children}
    </>
  );
}

// PublicLayout removed (Next App Router server components can't pass function children into client components).

