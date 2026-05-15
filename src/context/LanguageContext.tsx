"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CONTENT } from "@/data/content";

type Language = "en" | "th";
type ContentType = typeof CONTENT.en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: ContentType;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const value = {
    lang,
    setLang,
    t: CONTENT[lang],
    isEn: lang === "en",
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
