"use client";

import { Suspense } from "react";
import { K8sBg } from "@/components/K8sBg";
import { AuthForm } from "@/components/AuthForm";
import { useAppState } from "@/components/AppShell";
import Link from "next/link";
import { LANGS } from "@/lib/i18n";

function AuthContent() {
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
      <AuthForm lang={lang} />
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
