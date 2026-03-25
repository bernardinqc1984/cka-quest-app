"use client";

import { K8sBg } from "@/components/K8sBg";
import { ProtectedLayout, useAppState } from "@/components/AppShell";
import { Dashboard } from "@/components/Dashboard";

export default function DashboardPage() {
  return (
    <>
      <K8sBg />
      <ProtectedLayout>
        <DashboardClient />
      </ProtectedLayout>
    </>
  );
}

function DashboardClient() {
  const { lang, user } = useAppState();
  if (!user) return null;
  return <Dashboard lang={lang} answered={user.answered} />;
}

