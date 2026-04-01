"use client";

import { createContext, useContext, useState } from "react";
import { LangKey, LANGS, DEFAULT_LANG } from "@/lib/i18n";
import { getLangCookie, setLangCookie } from "@/lib/lang-cookie";

type LangCtx = { lang: LangKey; setLang: (l: LangKey) => void };

const LangContext = createContext<LangCtx>({ lang: DEFAULT_LANG, setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangKey>(() => {
    const l = getLangCookie();
    return l && LANGS[l] ? l : DEFAULT_LANG;
  });

  const setLang = (l: LangKey) => {
    setLangState(l);
    setLangCookie(l);
    if (typeof document !== "undefined") {
      document.documentElement.dir = LANGS[l]?.dir || "ltr";
    }
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
