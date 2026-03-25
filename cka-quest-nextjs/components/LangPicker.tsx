"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, LangKey } from "@/lib/i18n";

export function LangPicker({
  lang,
  setLang,
  align = "right",
}: {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  align?: "right" | "left";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div className="lang" ref={ref} style={{ position: "relative" }}>
      <button className="langbtn" onClick={() => setOpen((x) => !x)} aria-haspopup="menu" aria-expanded={open}>
        {LANGS[lang].flag} {LANGS[lang].name} ▾
      </button>
      {open ? (
        <div className="menu" role="menu" style={align === "left" ? { left: 0, right: "auto" } : undefined}>
          {(Object.entries(LANGS) as Array<[LangKey, (typeof LANGS)[LangKey]]>).map(([k, v]) => (
            <button
              key={k}
              className={`mi ${k === lang ? "active" : ""}`}
              onClick={() => {
                setLang(k);
                setOpen(false);
              }}
              role="menuitem"
            >
              {v.flag} {v.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

