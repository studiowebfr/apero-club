import { site, siteUrl } from "@/content/site";
import { horaires, joursOrdre } from "@/content/horaires";

const JOUR_SCHEMA_ORG: Record<string, string> = {
  lundi: "https://schema.org/Monday",
  mardi: "https://schema.org/Tuesday",
  mercredi: "https://schema.org/Wednesday",
  jeudi: "https://schema.org/Thursday",
  vendredi: "https://schema.org/Friday",
  samedi: "https://schema.org/Saturday",
  dimanche: "https://schema.org/Sunday",
};

/** Construit le JSON-LD BarOrPub uniquement à partir de données réelles :
 * aucun champ non sourcé (pas d'aggregateRating, d'award, de priceRange,
 * ni de hasMenu tant que la carte n'est pas fournie). */
export function buildBarOrPubJsonLd() {
  const openingHoursSpecification = joursOrdre
    .filter((jour) => horaires[jour].ouvert)
    .map((jour) => {
      const creneau = horaires[jour];
      if (!creneau.ouvert) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: JOUR_SCHEMA_ORG[jour],
        opens: creneau.ouverture,
        closes: creneau.fermeture,
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: site.nom,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.adresse.rue,
      postalCode: site.adresse.codePostal,
      addressLocality: site.adresse.ville,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.adresse.geo.lat,
      longitude: site.adresse.geo.lng,
    },
    ...(site.telephone ? { telephone: site.telephone } : {}),
    servesCuisine: "Tapas",
    openingHoursSpecification,
    ...(site.reseaux.instagramHandle
      ? { sameAs: [`https://www.instagram.com/${site.reseaux.instagramHandle}`] }
      : {}),
  };
}
