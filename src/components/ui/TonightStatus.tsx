"use client";

import { useEffect, useState } from "react";
import { getEtatOuverture, getFermeturesAAfficher, type EtatOuverture } from "@/lib/hours";
import { cn } from "@/lib/utils";

type TonightStatusProps = {
  className?: string;
  /** Variante compacte pour le header ou la barre mobile. */
  compact?: boolean;
};

/** Le module "ce soir" : état ouvert/fermé calculé en direct (Europe/Paris),
 * y compris pour le service qui déborde après minuit. Recalculé chaque
 * minute — ce n'est pas une animation, c'est une information qui doit
 * rester exacte tant que la page reste ouverte. */
export function TonightStatus({ className, compact = false }: TonightStatusProps) {
  const [etat, setEtat] = useState<EtatOuverture | null>(null);
  const [fermetures, setFermetures] = useState<{ date: string; motif?: string }[]>([]);

  useEffect(() => {
    const actualiser = () => {
      setEtat(getEtatOuverture());
      setFermetures(getFermeturesAAfficher());
    };
    actualiser();
    const id = setInterval(actualiser, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!etat) {
    // Rendu côté serveur / avant hydratation : évite tout écart d'affichage.
    return <div className={cn("h-6", className)} aria-hidden="true" />;
  }

  const exceptionActive = etat.ouvert === false && etat.exceptionMotif;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className={cn("flex items-center gap-2", compact ? "text-sm" : "text-base")} role="status">
        <span
          className={cn(
            "inline-block h-2 w-2 shrink-0 rounded-full",
            etat.ouvert ? "bg-ambre-clair" : "bg-gris-perle",
          )}
          aria-hidden="true"
        />
        {etat.ouvert ? (
          <span className="font-medium text-ivoire">
            Ouvert · jusqu&rsquo;à {etat.fermetureLabel}
          </span>
        ) : exceptionActive ? (
          <span className="font-medium text-ivoire">Fermeture exceptionnelle{etat.exceptionMotif ? ` — ${etat.exceptionMotif}` : ""}</span>
        ) : etat.prochaineOuverture ? (
          <span className="font-medium text-ivoire">
            Fermé · {etat.prochaineOuverture.estAujourdhui ? "ouvre" : `ouvre ${etat.prochaineOuverture.jourLabel.toLowerCase()}`} à{" "}
            {etat.prochaineOuverture.heureLabel}
          </span>
        ) : (
          <span className="font-medium text-ivoire">Fermé</span>
        )}
      </p>

      {fermetures.length > 0 && (
        <ul className="flex flex-col gap-1 text-xs text-gris-perle">
          {fermetures.map((f) => (
            <li key={f.date}>
              Fermeture exceptionnelle le {formatDateFr(f.date)}
              {f.motif ? ` — ${f.motif}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDateFr(dateStr: string): string {
  const [a, m, j] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, j)).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
