"use client";

// ponytail: Thai support removed — always returns English.
// useLanguage() hook kept so no callers break.
import { createContext, useContext, ReactNode } from "react";
import { CONTENT } from "@/data/content";

type ContentType = typeof CONTENT.en;

interface LanguageContextType {
  t: ContentType;
  // Legacy compat — kept so callers don't need changes
  lang: "en";
  isEn: true;
  setLang: (_: "en") => void;
}

const LanguageContext = createContext<LanguageContextType>({
  t: CONTENT.en,
  lang: "en",
  isEn: true,
  setLang: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider value={{ t: CONTENT.en, lang: "en", isEn: true, setLang: () => { } }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
