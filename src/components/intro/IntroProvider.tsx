"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "noor-intro";

type IntroState = { done: boolean; finish: () => void };

const IntroContext = createContext<IntroState>({ done: true, finish: () => {} });

export const useIntro = () => useContext(IntroContext);

/** Inline script for <head>: marks returning visitors before first paint so the overlay never flashes. */
export const introBootScript = `try{document.documentElement.dataset.intro=sessionStorage.getItem("${STORAGE_KEY}")?"seen":"playing"}catch(e){document.documentElement.dataset.intro="seen"}`;

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.intro === "seen") setDone(true);
  }, []);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    document.documentElement.dataset.intro = "seen";
    setDone(true);
  }, []);

  return <IntroContext.Provider value={{ done, finish }}>{children}</IntroContext.Provider>;
}
