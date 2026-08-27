import { useSyncExternalStore } from "react";
import type { JourSemaine } from "@/content/horaires";

const MAPPING: Record<string, JourSemaine> = {
  Monday: "lundi",
  Tuesday: "mardi",
  Wednesday: "mercredi",
  Thursday: "jeudi",
  Friday: "vendredi",
  Saturday: "samedi",
  Sunday: "dimanche",
};

const formateur = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "long" });

function lireJour(): JourSemaine {
  return MAPPING[formateur.format(new Date())];
}

/** Jour de la semaine actuel à Besançon (Europe/Paris), tenu à jour en
 * direct. `null` tant que le composant n'est pas encore hydraté côté
 * client, pour rester cohérent avec le rendu serveur. */
export function useParisWeekday(): JourSemaine | null {
  return useSyncExternalStore(
    (callback) => {
      const id = setInterval(callback, 60_000);
      return () => clearInterval(id);
    },
    lireJour,
    () => null,
  );
}
