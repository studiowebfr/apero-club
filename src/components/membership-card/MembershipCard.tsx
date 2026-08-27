"use client";

import { motion } from "framer-motion";
import { adresseComplete, itineraireUrl } from "@/content/site";
import { horaires, joursAffichage, joursLabel } from "@/content/horaires";
import { cn } from "@/lib/utils";
import { STAMP_KEYS, STAMP_LABELS, type StampKey } from "./membership-card-context";

type MembershipCardProps = {
  stamped: Set<StampKey>;
  flipped?: boolean;
  size?: "flottante" | "grande";
  className?: string;
};

/** L'élément signature du site : une carte de membre en verre dépoli qui
 * se tamponne au fil du scroll et se retourne en fin de parcours.
 * Purement décorative (aria-hidden) : l'équivalent textuel de la
 * progression est fourni par le composant appelant. */
export function MembershipCard({ stamped, flipped = false, size = "flottante", className }: MembershipCardProps) {
  const petite = size === "flottante";

  return (
    <div
      aria-hidden="true"
      className={cn("glass relative", petite ? "h-28 w-44 p-3 sm:h-32 sm:w-52 sm:p-4" : "h-56 w-full max-w-sm p-6 sm:h-64", className)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Face avant — les tampons */}
        <div className="absolute inset-0 flex flex-col justify-between" style={{ backfaceVisibility: "hidden" }}>
          <div className="flex items-start justify-between">
            <span className={cn("font-display uppercase tracking-wide text-ivoire", petite ? "text-[10px]" : "text-sm")}>
              Apéro Club
            </span>
            <span className={cn("text-gris-perle", petite ? "text-[8px]" : "text-[10px]")}>Carte de membre</span>
          </div>

          <div className={cn("grid grid-cols-7 gap-1", petite && "gap-0.5")}>
            {STAMP_KEYS.map((key) => (
              <Tampon key={key} lettre={STAMP_LABELS[key].charAt(0)} obtenu={stamped.has(key)} petite={petite} />
            ))}
          </div>
        </div>

        {/* Face arrière — adresse, horaires, itinéraire */}
        <div
          className="absolute inset-0 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <p className={cn("font-display uppercase tracking-wide text-ivoire", petite ? "text-[10px]" : "text-sm")}>
              Apéro Club
            </p>
            <p className={cn("text-gris-perle", petite ? "text-[8px]" : "text-xs")}>{adresseComplete()}</p>
          </div>

          {!petite && (
            <ul className="text-xs text-ivoire/80">
              {joursAffichage.map((jour) => {
                const creneau = horaires[jour];
                return (
                  <li key={jour} className="flex justify-between gap-4">
                    <span>{joursLabel[jour]}</span>
                    <span>{creneau.ouvert ? `${creneau.ouverture} – ${creneau.fermeture}` : "Fermé"}</span>
                  </li>
                );
              })}
            </ul>
          )}

          <a
            href={itineraireUrl()}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            className={cn(
              "self-start rounded-full bg-bleu-action px-3 py-1.5 font-medium text-white",
              petite ? "text-[9px]" : "text-xs",
            )}
          >
            Itinéraire
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function Tampon({ lettre, obtenu, petite }: { lettre: string; obtenu: boolean; petite: boolean }) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-full border",
        obtenu ? "border-ambre-clair text-ambre-clair" : "border-dashed border-verre-bord text-gris-perle/40",
        petite ? "text-[7px]" : "text-[10px]",
      )}
      style={obtenu ? { transform: "rotate(-6deg)" } : undefined}
    >
      <span className="font-display font-semibold uppercase leading-none">{lettre}</span>
    </div>
  );
}

export function progressionLabel(stamped: Set<StampKey>): string {
  const total = STAMP_KEYS.length;
  const obtenus = STAMP_KEYS.filter((k) => stamped.has(k))
    .map((k) => STAMP_LABELS[k])
    .join(", ");
  return `Progression carte de membre : ${stamped.size} sur ${total}${obtenus ? ` (${obtenus})` : ""}.`;
}
