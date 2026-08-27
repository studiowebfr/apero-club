"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GradientScene } from "@/components/ui/GradientScene";

export function SectionLieu() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section aria-label="Le lieu" className="relative h-[80vh] overflow-hidden">
      <div ref={imgRef} className="absolute inset-0">
        <GradientScene className="h-full w-full" label="Salle du bar, bois brut et lumières tamisées, plan large" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-nuit via-transparent to-transparent" />
      <div className="relative flex h-full items-end p-5 lg:p-10">
        <p className="max-w-xl font-display text-[clamp(1.6rem,4vw,2.75rem)] text-ivoire">
          Bois brut, lumières tamisées, esprit guinguette moderne.
        </p>
      </div>
    </section>
  );
}
