"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LIGNES = [
  "Un bar de quartier revisité,",
  "esprit guinguette moderne.",
  "Convivialité, partage, bons produits.",
];

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const mots = textRef.current.querySelectorAll<HTMLElement>("[data-mot]");

    const mm = gsap.matchMedia();
    mm.add(
      { motionReduit: "(prefers-reduced-motion: reduce)", motionOk: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        const { motionReduit } = context.conditions as { motionReduit: boolean };
        if (motionReduit) {
          gsap.set(mots, { opacity: 1 });
          return;
        }

        gsap.registerPlugin(ScrollTrigger);
        gsap.set(mots, { opacity: 0.15 });
        gsap.to(mots, {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-5 py-32 lg:px-10 lg:py-48">
      <p
        ref={textRef}
        className="mx-auto max-w-4xl font-display text-[clamp(1.8rem,5.5vw,3.75rem)] font-medium leading-tight text-ivoire"
      >
        {LIGNES.map((ligne, i) => (
          <span key={i} className="block">
            {ligne.split(" ").map((mot, j) => (
              <span key={j} data-mot className="mr-[0.25em] inline-block">
                {mot}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  );
}
