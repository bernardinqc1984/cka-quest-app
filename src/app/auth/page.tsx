"use client";

import { Suspense } from "react";
import { K8sBg } from "@/components/K8sBg";
import { AuthForm } from "@/components/AuthForm";
import { useAppState } from "@/components/AppShell";
import Link from "next/link";
import { LANGS } from "@/lib/i18n";
import { useSearchParams } from "next/navigation";

function AuthContent() {
  const sp = useSearchParams();
  const mode = sp.get("mode") === "register" ? "register" : "login";
  const { lang } = useAppState();
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "40px 16px 60px", position: "relative", zIndex: 1 }}>
      <div style={{ marginBottom: 14 }}>
        <Link
          href="/"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(148,163,184,0.18)",
            background: "rgba(15,23,42,0.55)",
            display: "inline-block",
          }}
        >
          ← {LANGS[lang].back}
        </Link>
      </div>
      <AuthForm lang={lang} mode={mode} />
      <div style={{ marginTop: 12, textAlign: "center", opacity: 0.9 }}>
        {mode === "login" ? (
          <Link href="/auth?mode=register" style={{ color: "rgba(165,180,252,0.95)", fontWeight: 800 }}>
            {LANGS[lang].noAccount}
          </Link>
        ) : (
          <Link href="/auth?mode=login" style={{ color: "rgba(165,180,252,0.95)", fontWeight: 800 }}>
            {LANGS[lang].hasAccount}
          </Link>
        )}
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <>
      <K8sBg />
      <Suspense>
        <AuthContent />
      </Suspense>
    </>
  );
}

