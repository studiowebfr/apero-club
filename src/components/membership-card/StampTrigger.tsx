"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMembershipCard, type StampKey } from "./membership-card-context";

type StampTriggerProps = {
  stampKey: StampKey;
  children?: ReactNode;
  className?: string;
};

/** Marqueur invisible : dès qu'il traverse le centre du viewport, la carte
 * de membre reçoit le tampon correspondant. Piloté uniquement par le
 * scroll (IntersectionObserver), jamais par un minuteur. */
export function StampTrigger({ stampKey, children, className }: StampTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { addStamp } = useMembershipCard();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          addStamp(stampKey);
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [addStamp, stampKey]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
