"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradientScene } from "@/components/ui/GradientScene";
import { StampTrigger } from "@/components/membership-card/StampTrigger";
import type { StampKey } from "@/components/membership-card/membership-card-context";

const PANNEAUX: { titre: string; texte: string; stamp?: StampKey; label: string }[] = [
  {
    titre: "Vins",
    texte: "Une sélection resserrée, pensée pour accompagner l'apéro plutôt que l'intimider.",
    stamp: "vins",
    label: "Verres de vin alignés sur le comptoir, lumière tamisée",
  },
  {
    titre: "Bières françaises",
    texte: "Des bières françaises, choisies plutôt qu'empilées.",
    stamp: "bieres",
    label: "Pression de bière française, mousse dense, lumière chaude",
  },
  {
    titre: "Cocktails signatures",
    texte: "Des cocktails maison, faits pour être partagés autant que bus.",
    stamp: "cocktails",
    label: "Cocktail signature en gros plan, glaçon net, bois en arrière-plan",
  },
  {
    titre: "Sans alcool",
    texte: "Une carte sans alcool travaillée comme les autres, pas comme un pis-aller.",
    label: "Boisson sans alcool servie avec soin, verre travaillé",
  },
];

export function SectionBoire() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      },
      () => {
        const panneaux = gsap.utils.toArray<HTMLElement>(track.children);
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(panneaux, {
          xPercent: -100 * (panneaux.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section aria-label="Boire" className="relative">
      <div ref={wrapperRef} className="relative overflow-hidden lg:h-screen">
        <div className="px-5 pt-16 lg:absolute lg:left-10 lg:top-16 lg:z-10 lg:pt-0">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">01 — Boire</p>
        </div>
        <div
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 lg:mt-0 lg:h-full lg:snap-none lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {PANNEAUX.map((p) => (
            <div key={p.titre} className="w-[85vw] shrink-0 snap-center lg:flex lg:h-full lg:w-screen lg:items-center lg:justify-center lg:px-10">
              <PanneauContent panneau={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PanneauContent({ panneau }: { panneau: (typeof PANNEAUX)[number] }) {
  const contenu = (
    <div className="glass glass--photo relative h-[70vh] max-h-[560px] overflow-hidden lg:h-[65vh] lg:w-[560px]">
      <GradientScene className="absolute inset-0" label={panneau.label} />
      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="font-display text-3xl uppercase text-ivoire">{panneau.titre}</h3>
        <p className="mt-2 max-w-sm text-sm text-ivoire/85">{panneau.texte}</p>
      </div>
    </div>
  );

  return panneau.stamp ? <StampTrigger stampKey={panneau.stamp}>{contenu}</StampTrigger> : contenu;
}
