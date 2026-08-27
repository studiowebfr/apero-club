import Link from "next/link";
import { adresseComplete, site } from "@/content/site";
import { horaires, joursAffichage, joursLabel } from "@/content/horaires";
import { IconInstagram } from "@/components/icons";

export function Footer() {
  return (
    <footer id="pied-de-page" className="border-t border-verre-bord bg-nuit px-5 pb-28 pt-16 lg:pb-16">
      <p className="font-display text-[clamp(2.5rem,10vw,7rem)] font-semibold uppercase leading-none text-ivoire">
        Apéro Club
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-3">
        <div>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-gris-perle">Adresse</h2>
          <p className="text-ivoire">{adresseComplete()}</p>
          {site.telephone && <p className="mt-1 text-ivoire">{site.telephone}</p>}
          {site.email && <p className="mt-1 text-ivoire">{site.email}</p>}
        </div>

        <div>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-gris-perle">Horaires</h2>
          <ul className="space-y-1 text-ivoire/90">
            {joursAffichage.map((jour) => {
                const creneau = horaires[jour];
                return (
                  <li key={jour} className="flex gap-4">
                    <span className="w-24">{joursLabel[jour]}</span>
                    <span>{creneau.ouvert ? `${creneau.ouverture} – ${creneau.fermeture}` : "Fermé"}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-gris-perle">Suivre</h2>
          {site.reseaux.instagramHandle ? (
            <a
              href={`https://www.instagram.com/${site.reseaux.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ivoire hover:text-ambre-clair"
            >
              <IconInstagram className="h-5 w-5" />
              Instagram
            </a>
          ) : (
            <p className="text-sm text-gris-perle">Instagram — lien à venir</p>
          )}

          <nav className="mt-6 flex flex-col gap-1 text-sm text-gris-perle">
            <Link href="/mentions-legales" className="hover:text-ivoire">Mentions légales</Link>
            <Link href="/vie-privee" className="hover:text-ivoire">Vie privée</Link>
            <Link href="/cookies" className="hover:text-ivoire">Cookies</Link>
          </nav>
        </div>
      </div>

      <div className="mt-12 space-y-1 border-t border-verre-bord pt-6 text-xs text-gris-perle">
        <p>{site.mentions.alcool}</p>
        <p>{site.mentions.mineurs}</p>
        {site.societe.raisonSociale && <p>{site.societe.raisonSociale}</p>}
      </div>
    </footer>
  );
}
