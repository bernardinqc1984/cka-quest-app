"use client";

import { K8sBg } from "@/components/K8sBg";
import { ProtectedLayout, useAppState } from "@/components/AppShell";
import { Quiz } from "@/components/Quiz";

export default function QuizPage({ params }: { params: { domainId: string } }) {
  return (
    <>
      <K8sBg />
      <ProtectedLayout>
        <QuizClient domainId={params.domainId} />
      </ProtectedLayout>
    </>
  );
}

function QuizClient({ domainId }: { domainId: string }) {
  const { lang, user, setProgress } = useAppState();
  if (!user) return null;
  return (
    <Quiz
      lang={lang}
      domainId={domainId}
      username={user.username}
      xp={user.xp}
      streak={user.streak}
      answered={user.answered}
      onProgress={setProgress}
    />
  );
}

