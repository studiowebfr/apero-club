"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export const STAMP_KEYS = [
  "vins",
  "bieres",
  "cocktails",
  "planches",
  "jeux",
  "sport",
  "musique",
] as const;

export type StampKey = (typeof STAMP_KEYS)[number];

export const STAMP_LABELS: Record<StampKey, string> = {
  vins: "Vins",
  bieres: "Bières",
  cocktails: "Cocktails",
  planches: "Planches",
  jeux: "Jeux",
  sport: "Sport",
  musique: "Musique",
};

type MembershipCardContextValue = {
  stamped: Set<StampKey>;
  addStamp: (key: StampKey) => void;
};

const MembershipCardContext = createContext<MembershipCardContextValue | null>(null);

export function MembershipCardProvider({ children }: { children: ReactNode }) {
  const [stamped, setStamped] = useState<Set<StampKey>>(() => new Set());

  const addStamp = useCallback((key: StampKey) => {
    setStamped((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ stamped, addStamp }), [stamped, addStamp]);

  return <MembershipCardContext.Provider value={value}>{children}</MembershipCardContext.Provider>;
}

export function useMembershipCard() {
  const ctx = useContext(MembershipCardContext);
  if (!ctx) {
    throw new Error("useMembershipCard doit être utilisé dans <MembershipCardProvider>");
  }
  return ctx;
}
