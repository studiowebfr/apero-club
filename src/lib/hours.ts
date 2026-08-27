import {
  fermeturesExceptionnelles,
  horaires,
  joursLabel,
  joursOrdre,
  type JourSemaine,
} from "@/content/horaires";

const FUSEAU = "Europe/Paris";

type PartiesDate = {
  annee: number;
  mois: number; // 1-12
  jour: number; // 1-31
  heure: number;
  minute: number;
  jourSemaine: JourSemaine;
  dateStr: string; // YYYY-MM-DD
};

const JOUR_ISO_VERS_JOUR_SEMAINE: JourSemaine[] = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

/** Lit un instant absolu comme une date/heure locale à Besançon, quel que
 * soit le fuseau du serveur qui exécute le code (Vercel tourne en UTC). */
function lireDateParis(instant: Date): PartiesDate {
  const formateur = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSEAU,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });

  const parts = formateur.formatToParts(instant);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const annee = Number(get("year"));
  const mois = Number(get("month"));
  const jour = Number(get("day"));
  let heure = Number(get("hour"));
  const minute = Number(get("minute"));
  // Intl peut renvoyer "24" pour minuit avec hour12:false selon l'environnement.
  if (heure === 24) heure = 0;

  const weekdayShort = get("weekday").toLowerCase();
  const jourSemaine = mapWeekdayEnCourtVersJourSemaine(weekdayShort, annee, mois, jour);

  return {
    annee,
    mois,
    jour,
    heure,
    minute,
    jourSemaine,
    dateStr: `${String(annee).padStart(4, "0")}-${String(mois).padStart(2, "0")}-${String(jour).padStart(2, "0")}`,
  };
}

function mapWeekdayEnCourtVersJourSemaine(
  weekdayShort: string,
  annee: number,
  mois: number,
  jour: number,
): JourSemaine {
  // `en-CA` renvoie des abréviations anglaises (Mon, Tue...) qui varient
  // selon la plateforme ICU. On recalcule via un ancrage UTC fiable plutôt
  // que de parser le texte, pour rester robuste entre environnements.
  void weekdayShort;
  const ancrageUTC = Date.UTC(annee, mois - 1, jour, 12, 0, 0);
  const indexIso = new Date(ancrageUTC).getUTCDay(); // 0 = dimanche
  return JOUR_ISO_VERS_JOUR_SEMAINE[indexIso];
}

function veilleDe(jour: JourSemaine): JourSemaine {
  const index = joursOrdre.indexOf(jour);
  return joursOrdre[(index + 6) % 7];
}

function dateStrMoinsUnJour(dateStr: string): string {
  const [a, m, j] = dateStr.split("-").map(Number);
  const ancrage = new Date(Date.UTC(a, m - 1, j, 12, 0, 0));
  ancrage.setUTCDate(ancrage.getUTCDate() - 1);
  return ancrage.toISOString().slice(0, 10);
}

function minutesDepuisMinuit(heureMinute: string): number {
  const [h, m] = heureMinute.split(":").map(Number);
  return h * 60 + m;
}

function estFermetureExceptionnelle(dateStr: string): string | undefined {
  return fermeturesExceptionnelles.find((f) => f.date === dateStr)?.motif ?? undefined;
}

export type EtatOuverture =
  | {
      ouvert: true;
      fermetureLabel: string; // ex: "1h"
      exceptionMotif?: never;
    }
  | {
      ouvert: false;
      exceptionMotif?: string; // renseigné si fermeture exceptionnelle du jour
      prochaineOuverture?: { jourLabel: string; heureLabel: string; estAujourdhui: boolean };
    };

function formatHeureLabel(heureMinute: string): string {
  const [h, m] = heureMinute.split(":").map(Number);
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, "0")}`;
}

/**
 * Calcule si le bar est ouvert à l'instant donné (Europe/Paris), en gérant
 * correctement le passage de minuit : un bar ouvert mercredi 17h-1h doit
 * apparaître "ouvert" mercredi à 23h ET jeudi à 0h30, jusqu'à 1h.
 */
export function getEtatOuverture(instant: Date = new Date()): EtatOuverture {
  const aujourdhui = lireDateParis(instant);
  const minutesActuelles = aujourdhui.heure * 60 + aujourdhui.minute;

  const exceptionAujourdhui = estFermetureExceptionnelle(aujourdhui.dateStr);

  // 1. Le service de la veille déborde-t-il encore sur ce matin ?
  const jourVeille = veilleDe(aujourdhui.jourSemaine);
  const dateStrVeille = dateStrMoinsUnJour(aujourdhui.dateStr);
  const creneauVeille = horaires[jourVeille];
  const exceptionVeille = estFermetureExceptionnelle(dateStrVeille);

  if (
    creneauVeille.ouvert &&
    !exceptionVeille &&
    minutesDepuisMinuit(creneauVeille.fermeture) <= minutesDepuisMinuit(creneauVeille.ouverture)
  ) {
    const finVeilleMinutes = minutesDepuisMinuit(creneauVeille.fermeture);
    if (minutesActuelles < finVeilleMinutes) {
      return { ouvert: true, fermetureLabel: formatHeureLabel(creneauVeille.fermeture) };
    }
  }

  // 2. Le service d'aujourd'hui a-t-il commencé ?
  const creneauJour = horaires[aujourdhui.jourSemaine];
  if (creneauJour.ouvert && !exceptionAujourdhui) {
    const debutMinutes = minutesDepuisMinuit(creneauJour.ouverture);
    if (minutesActuelles >= debutMinutes) {
      return { ouvert: true, fermetureLabel: formatHeureLabel(creneauJour.fermeture) };
    }
  }

  // 3. Fermé : on cherche la prochaine ouverture, à partir d'aujourd'hui.
  for (let offset = 0; offset < 8; offset++) {
    const indexJour = (joursOrdre.indexOf(aujourdhui.jourSemaine) + offset) % 7;
    const jourCandidat = joursOrdre[indexJour];
    const dateStrCandidat =
      offset === 0
        ? aujourdhui.dateStr
        : ajouterJours(aujourdhui.dateStr, offset);
    const creneauCandidat = horaires[jourCandidat];
    const exceptionCandidat = estFermetureExceptionnelle(dateStrCandidat);

    if (!creneauCandidat.ouvert || exceptionCandidat) continue;

    if (offset === 0) {
      const debutMinutes = minutesDepuisMinuit(creneauCandidat.ouverture);
      if (minutesActuelles >= debutMinutes) continue; // déjà couvert au point 2
    }

    return {
      ouvert: false,
      exceptionMotif: exceptionAujourdhui,
      prochaineOuverture: {
        jourLabel: joursLabel[jourCandidat],
        heureLabel: formatHeureLabel(creneauCandidat.ouverture),
        estAujourdhui: offset === 0,
      },
    };
  }

  return { ouvert: false, exceptionMotif: exceptionAujourdhui };
}

function ajouterJours(dateStr: string, jours: number): string {
  const [a, m, j] = dateStr.split("-").map(Number);
  const ancrage = new Date(Date.UTC(a, m - 1, j, 12, 0, 0));
  ancrage.setUTCDate(ancrage.getUTCDate() + jours);
  return ancrage.toISOString().slice(0, 10);
}

/** Fermetures exceptionnelles encore à venir (ou en cours), pour le bandeau. */
export function getFermeturesAAfficher(instant: Date = new Date()) {
  const aujourdhui = lireDateParis(instant).dateStr;
  return fermeturesExceptionnelles.filter((f) => f.date >= aujourdhui);
}
