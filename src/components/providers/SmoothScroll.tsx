"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let enregistre = false;

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (!enregistre) {
      gsap.registerPlugin(ScrollTrigger);
      enregistre = true;
    }

    const reduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduitMotion) {
      // Défilement natif conservé tel quel : pas de lerp sur un système qui
      // a explicitement demandé moins de mouvement.
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      // `gsap.ticker` fournit le temps écoulé en secondes ; `lenis.raf`
      // attend des millisecondes (comme `performance.now()`). Sans cette
      // conversion, le delta interne de Lenis est ~1000x trop petit et le
      // défilement rampe au lieu d'avancer.
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
