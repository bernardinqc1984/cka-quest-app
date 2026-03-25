"use client";

import { K8sBg } from "@/components/K8sBg";
import { Landing } from "@/components/Landing";
import { useAppState } from "@/components/AppShell";

export default function Page() {
  const { lang, setLang } = useAppState();
  return (
    <>
      <K8sBg />
      <Landing lang={lang} setLang={setLang} />
    </>
  );
}
