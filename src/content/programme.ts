// Le programme : sport, musique, jeux de société.
//
// Vide par défaut. Aucune date, aucun match, aucun concert n'est inventé.
// Tant que ce tableau est vide, la page "/le-programme" et la section
// "Profiter" de l'accueil affichent un renvoi vers Instagram.
//
// Pour annoncer un événement, ajoute une ligne sur ce modèle :
//
// {
//   categorie: "sport",              // "sport" | "musique" | "jeux"
//   titre: "OM - PSG",
//   date: "2026-09-14",              // YYYY-MM-DD
//   heure: "21:00",                  // optionnel
//   description: "Diffusion en direct, grand écran.",
// },

export type CategorieEvenement = "sport" | "musique" | "jeux";

export type Evenement = {
  categorie: CategorieEvenement;
  titre: string;
  date: string;
  heure?: string;
  description?: string;
};

export const categorieLabel: Record<CategorieEvenement, string> = {
  sport: "Sport",
  musique: "Musique",
  jeux: "Jeux de société",
};

export const programme: Evenement[] = [];
