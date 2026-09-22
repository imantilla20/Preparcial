"use client";
import { createContext, useContext, ReactNode } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface DictionaryContextType {
  dict: Dictionary;
  lang: Locale;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({ dict, lang, children }: DictionaryContextType & { children: ReactNode }) {
  return <DictionaryContext.Provider value={{ dict, lang }}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const ctx = useContext(DictionaryContext);
  if (!ctx) throw new Error("useDictionary debe usarse dentro de DictionaryProvider");
  return ctx;
}