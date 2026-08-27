// La carte : vins, bières, cocktails, sans alcool, planches, tapas.
//
// Vide par défaut, volontairement. Aucun prix, aucune boisson, aucun plat
// n'est inventé — les prix accessibles sont l'argument principal de la
// maison, une carte fausse la décrédibiliserait immédiatement.
//
// Pour ajouter un produit une fois la carte confirmée par le client,
// copie ce modèle dans le tableau de la bonne famille :
//
// {
//   nom: "Nom du produit",
//   description: "Une phrase courte, sans invention (origine, cépage...).",
//   prix: 6.5,               // en euros, ou `null` si le prix n'est pas encore fixé
//   vegetarien: null,        // true / false / null — ne mets true que si confirmé
// },

export type ProduitCarte = {
  nom: string;
  description?: string;
  prix: number | null;
  vegetarien?: boolean | null;
  allergenes?: string[];
};

export type FamilleCarte = {
  id: "vins" | "bieres" | "cocktails" | "sans-alcool" | "planches" | "tapas";
  titre: string;
  produits: ProduitCarte[];
};

export const carte: FamilleCarte[] = [
  { id: "vins", titre: "Vins", produits: [] },
  { id: "bieres", titre: "Bières françaises", produits: [] },
  { id: "cocktails", titre: "Cocktails signatures", produits: [] },
  { id: "sans-alcool", titre: "Sans alcool", produits: [] },
  { id: "planches", titre: "Planches apéro", produits: [] },
  { id: "tapas", titre: "Tapas de la région", produits: [] },
];

// Date à laquelle la carte ci-dessus a été relevée auprès du client.
// Mets-la à jour à chaque modification — elle s'affiche en petit sur la
// page /la-carte pour que les visiteurs sachent que l'information est fraîche.
// Format : "YYYY-MM-DD", ou `null` tant qu'aucune carte n'a été fournie.
export const dateReleve: string | null = null;

// [[À COMPLÉTER]] — mention des allergènes, obligatoire dès qu'un plat
// est publié. À demander au client en même temps que la carte.
export const mentionAllergenes: string | null = null;
