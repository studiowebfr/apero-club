"use client";

import { horaires, joursAffichage, joursLabel } from "@/content/horaires";
import { useParisWeekday } from "@/lib/use-paris-weekday";
import { cn } from "@/lib/utils";

export function HorairesTable() {
  const jourActuel = useParisWeekday();

  return (
    <table className="w-full text-left">
      <caption className="sr-only">Horaires d&rsquo;ouverture d&rsquo;Apéro Club</caption>
      <tbody>
        {joursAffichage.map((jour) => {
          const creneau = horaires[jour];
          const estAujourdhui = jour === jourActuel;
          return (
            <tr key={jour} className={cn("border-b border-verre-bord/60 last:border-b-0", estAujourdhui && "text-ambre-clair")}>
              <th scope="row" className="py-3 pr-4 text-sm font-medium">
                {joursLabel[jour]}
                {estAujourdhui && <span className="sr-only"> (aujourd&rsquo;hui)</span>}
              </th>
              <td className="py-3 text-sm">{creneau.ouvert ? `${creneau.ouverture} – ${creneau.fermeture}` : "Fermé"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
