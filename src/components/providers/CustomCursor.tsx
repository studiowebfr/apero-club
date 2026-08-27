"use client";

import { useEffect, useRef } from "react";

/** Curseur personnalisé : disque ambre de 8px qui grossit à 48px au survol
 * des éléments marqués `data-cursor-hover`. Désactivé sur tactile et pour
 * `prefers-reduced-motion`. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tactile = window.matchMedia("(pointer: coarse)").matches;
    const reduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (tactile || reduitMotion) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("cursor-none-fine");
    dot.dataset.actif = "true";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currentX = x;
    let currentY = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const cible = (e.target as HTMLElement)?.closest("[data-cursor-hover]");
      dot.dataset.hover = cible ? "true" : "false";
    };

    const boucle = () => {
      currentX += (x - currentX) * 0.25;
      currentY += (y - currentY) * 0.25;
      dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(boucle);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(boucle);

    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[999] h-2 w-2 rounded-full bg-ambre-clair opacity-0 mix-blend-difference transition-[width,height,opacity] duration-200 ease-out data-[actif=true]:opacity-100 data-[hover=true]:h-12 data-[hover=true]:w-12"
    />
  );
}
