"use client";

import { useEffect, useRef } from "react";

type MarqueeProps = {
  text: string;
  className?: string;
};

/** Bandeau défilant en boucle infinie, typo en contour ambre. La vitesse
 * suit la direction du scroll : on avance plus vite quand le visiteur
 * descend, on ralentit / inverse légèrement quand il remonte. */
export function Marquee({ text, className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dernierScrollY = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      const delta = window.scrollY - dernierScrollY;
      dernierScrollY = window.scrollY;
      const vitesse = 28 + Math.min(Math.abs(delta) * 1.2, 60);
      track.style.animationDuration = `${Math.max(6, 3200 / vitesse)}s`;
      track.style.animationDirection = delta < 0 ? "reverse" : "normal";
    };

    const boucle = () => {
      frame = requestAnimationFrame(boucle);
    };
    frame = requestAnimationFrame(boucle);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap" ref={trackRef}>
        <MarqueeContent text={text} />
        <MarqueeContent text={text} />
      </div>
    </div>
  );
}

function MarqueeContent({ text }: { text: string }) {
  return (
    <span className="text-outline-ambre font-display px-4 text-[clamp(2rem,7vw,5rem)] font-semibold uppercase tracking-tight">
      {text}
    </span>
  );
}
