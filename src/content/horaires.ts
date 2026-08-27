// Horaires d'ouverture et fermetures exceptionnelles.
//
// [[À VÉRIFIER]] — ces horaires viennent d'une fiche d'annuaire tierce,
// pas d'une confirmation directe du bar. À faire valider avant mise en ligne.
//
// Le bar ferme après minuit (1h). C'est normal et géré automatiquement par
// `src/lib/hours.ts` : pas besoin d'indiquer "01:00" sur le jour suivant.

export type JourSemaine =
  | "lundi"
  | "mardi"
  | "mercredi"
  | "jeudi"
  | "vendredi"
  | "samedi"
  | "dimanche";

export type CreneauJour =
  | { ouvert: true; ouverture: string; fermeture: string }
  | { ouvert: false };

export const joursOrdre: JourSemaine[] = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

/** Ordre d'affichage habituel (lundi -> dimanche), pour les listes horaires
 * à l'écran. `joursOrdre` ci-dessus reste l'ordre calendaire (dimanche en
 * index 0) utilisé par la logique d'ouverture dans lib/hours.ts. */
export const joursAffichage: JourSemaine[] = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

export const joursLabel: Record<JourSemaine, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
  samedi: "Samedi",
  dimanche: "Dimanche",
};

export const horaires: Record<JourSemaine, CreneauJour> = {
  lundi: { ouvert: false },
  mardi: { ouvert: false },
  mercredi: { ouvert: true, ouverture: "17:00", fermeture: "01:00" },
  jeudi: { ouvert: true, ouverture: "17:00", fermeture: "01:00" },
  vendredi: { ouvert: true, ouverture: "17:00", fermeture: "01:00" },
  samedi: { ouvert: true, ouverture: "17:00", fermeture: "01:00" },
  dimanche: { ouvert: true, ouverture: "17:00", fermeture: "01:00" },
};

export type FermetureExceptionnelle = {
  /** Format YYYY-MM-DD */
  date: string;
  motif?: string;
};

// Pour annoncer une fermeture exceptionnelle (vacances, événement privé...) :
// ajoute une ligne dans le tableau ci-dessous. Elle s'affiche automatiquement
// en bandeau sur le site et disparaît toute seule le lendemain de la date.
//
// Exemple :
// { date: "2026-12-25", motif: "Fermé le soir de Noël" },
export const fermeturesExceptionnelles: FermetureExceptionnelle[] = [];
