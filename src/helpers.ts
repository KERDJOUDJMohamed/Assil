// Shared helper functions
// Shared helper functions
import React from "react";
import type { LangCode, I18nEntry } from "./types";

export function useStoredLang(i18n: Record<LangCode, I18nEntry>, defaultLang: LangCode = "ar") {
  const KEY = "assil:lang";
  const getInitial = (): LangCode => {
    const saved = localStorage.getItem(KEY) as LangCode | null;
    if (saved === "ar" || saved === "fr" || saved === "en") return saved;
    const nav = navigator.language || "";
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("en")) return "en";
    return defaultLang;
  };
  const [lang, setLang] = React.useState<LangCode>(getInitial);
  React.useEffect(() => {
    localStorage.setItem(KEY, lang);
    document.documentElement.setAttribute("dir", i18n[lang].dir);
  }, [lang]);
  return { lang, setLang };
}

export function nowInAlgiers() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
    timeZone: "Africa/Algiers",
  });
  const parts = fmt.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  const hour = parseInt(get("hour"), 10);
  const minute = parseInt(get("minute"), 10);
  const wdShort = get("weekday");
  const map: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return { minutes: hour * 60 + minute, weekday: map[wdShort] ?? 0 };
}

export const WEEKLY_HOURS = Array.from({ length: 7 }, () => ({
  open: 8 * 60,
  close: 21 * 60,
}));

export function useOpenNow() {
  const [{ open, nextChange }, setState] = React.useState({
    open: false,
    nextChange: "",
  });
  React.useEffect(() => {
    function compute() {
      const { minutes, weekday } = nowInAlgiers();
      const { open: o, close: c } = WEEKLY_HOURS[weekday];
      const isOpen = minutes >= o && minutes < c;
      const pad = (n: number) => String(n).padStart(2, "0");
      const nc =
        minutes < o
          ? `${pad(Math.floor(o / 60))}:${pad(o % 60)}`
          : `${pad(Math.floor(c / 60))}:${pad(c % 60)}`;
      setState({ open: isOpen, nextChange: nc });
    }
    compute();
    const id = setInterval(compute, 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return { open, nextChange };
}
