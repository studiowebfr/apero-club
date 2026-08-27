import type { ReactNode } from "react";
import { GlassCard } from "./GlassCard";

type EtatVideProps = {
  titre: string;
  description: string;
  action?: ReactNode;
};

/** État d'attente digne pour une famille de contenu pas encore renseignée
 * (carte, programme...). Jamais un bloc mort, jamais une donnée inventée. */
export function EtatVide({ titre, description, action }: EtatVideProps) {
  return (
    <GlassCard className="flex flex-col items-start gap-3 px-6 py-8">
      <p className="font-display text-lg text-ivoire">{titre}</p>
      <p className="max-w-sm text-sm text-gris-perle">{description}</p>
      {action}
    </GlassCard>
  );
}
