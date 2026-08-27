// Coordonnées et informations légales de l'établissement.
//
// Tout champ marqué `null` est une information réelle qui n'a pas encore
// été communiquée par le client. Ne JAMAIS remplacer un `null` par une
// valeur inventée : les composants sont écrits pour masquer proprement
// ce qui manque (pas de numéro affiché tant qu'aucun numéro n'est fourni).
//
// Pour mettre à jour un champ : remplace la valeur `null` (ou le texte
// existant) par la bonne information, entre guillemets. Exemple déjà
// rempli ci-dessous avec l'adresse, qui est confirmée.

export const site = {
  nom: "Apéro Club",
  baseline: "Boire, partager, profiter.",

  adresse: {
    rue: "45 rue Bersot",
    codePostal: "25000",
    ville: "Besançon",
    pays: "France",
    // Exemple : "geo: { lat: 47.2333, lng: 6.0333 }" — à affiner avec les
    // coordonnées précises du 45 rue Bersot une fois vérifiées.
    geo: { lat: 47.2371, lng: 6.0308 },
  },

  // [[À COMPLÉTER]] — aucun numéro public trouvé. C'est la première
  // information à demander au client.
  telephone: null as string | null,

  // [[À COMPLÉTER]]
  email: null as string | null,

  reseaux: {
    // [[À COMPLÉTER]] — identifiant Instagram exact (ex: "aperoclub.besancon")
    instagramHandle: null as string | null,
    // [[À COMPLÉTER]]
    facebookUrl: null as string | null,
  },

  fondateurs: ["Barney Mougnard", "Jordan Guenot"],

  ouverture: "2026-06-05",

  // Informations société — nécessaires aux mentions légales.
  // [[À COMPLÉTER]] dans leur intégralité, à demander au client.
  societe: {
    raisonSociale: null as string | null,
    formeJuridique: null as string | null,
    siret: null as string | null,
    rcs: null as string | null,
    tva: null as string | null,
    licence: null as string | null, // licence de débit de boissons (ex: licence IV)
    directeurPublication: null as string | null,
    hebergeur: null as string | null,
  },

  mentions: {
    alcool:
      "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
    mineurs: "La vente d'alcool est interdite aux mineurs de moins de 18 ans.",
  },
} as const;

// URL de production. À remplacer par le nom de domaine définitif une fois
// acheté — utilisée pour le sitemap, le JSON-LD et les images Open Graph.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://apero-club-besancon.fr";

export function adresseComplete(): string {
  const { rue, codePostal, ville } = site.adresse;
  return `${rue}, ${codePostal} ${ville}`;
}

export function itineraireUrl(): string {
  const q = encodeURIComponent(`${adresseComplete()}, ${site.adresse.pays}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}
