import { useId } from "react";
import { cn } from "@/lib/utils";

type GradientSceneProps = {
  className?: string;
  /** Légende invisible à l'écran : décrit le média réel à venir, pour que
   * quiconque inspecte le DOM (ou un lecteur d'écran, si l'image porte du
   * sens) comprenne ce qui doit remplacer le placeholder. */
  label: string;
  decorative?: boolean;
};

/** Placeholder de média en attendant le shooting photo/vidéo du client
 * (voir public/media/README.md) : dégradé ambre animé + grain, jamais une
 * image de banque ni une photo de marque. */
export function GradientScene({ className, label, decorative = true }: GradientSceneProps) {
  // `useId` (et non un compteur de module) : le compteur divergeait entre
  // le rendu serveur et l'hydratation client, provoquant un mismatch.
  const filterId = `grain-${useId()}`;
  return (
    <div
      className={cn("relative overflow-hidden bg-nuit-surface", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? "true" : undefined}
    >
      <div
        className="absolute inset-0 opacity-70 motion-safe:animate-[pulse_9s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 15%, rgba(201,130,46,0.35), transparent 60%), radial-gradient(90% 70% at 85% 85%, rgba(240,195,138,0.18), transparent 55%), #0a0e14",
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay" aria-hidden="true">
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
      {decorative && <span className="sr-only">{label}</span>}
    </div>
  );
}
