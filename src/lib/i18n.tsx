import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "he" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (he: string, en: string) => string };
const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("wt-lang")) as Lang | null;
    if (saved === "he" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("wt-lang", l);
  };
  const t = (he: string, en: string) => (lang === "he" ? he : en);
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang outside provider");
  return ctx;
}
