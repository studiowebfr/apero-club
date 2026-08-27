import type { Metadata } from "next";
import { carte, dateReleve, mentionAllergenes } from "@/content/carte";
import { EtatVide } from "@/components/ui/EtatVide";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "Vins, bières françaises, cocktails signatures, planches apéro et tapas de la région — la carte du bar Apéro Club à Besançon.",
  alternates: { canonical: "/la-carte" },
};

export default function LaCartePage() {
  return (
    <div className="px-5 pb-24 pt-32 lg:px-10">
      <header className="mb-10">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">La carte</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] text-ivoire">
          Vins, bières, cocktails, planches.
        </h1>
        <p className="mt-2 max-w-lg text-ivoire/80">
          Des prix accessibles, des produits français et locaux. Pensée pour se lire d&rsquo;un coup d&rsquo;œil,
          debout, le soir.
        </p>
        {dateReleve && <p className="mt-2 text-xs text-gris-perle">Carte à jour au {dateReleve}.</p>}
      </header>

      <nav aria-label="Familles" className="glass sticky top-20 z-30 mb-12 flex gap-5 overflow-x-auto px-5 py-3 text-sm">
        {carte.map((famille) => (
          <a key={famille.id} href={`#${famille.id}`} className="whitespace-nowrap text-ivoire/80 hover:text-ambre-clair">
            {famille.titre}
          </a>
        ))}
      </nav>

      <div className="mx-auto flex max-w-2xl flex-col gap-16">
        {carte.map((famille) => (
          <section key={famille.id} id={famille.id} className="scroll-mt-36 border-t border-ambre-tamise/40 pt-8">
            <h2 className="font-display text-2xl uppercase text-ivoire">{famille.titre}</h2>

            {famille.produits.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-5">
                {famille.produits.map((produit) => (
                  <li key={produit.nom} className="flex items-baseline justify-between gap-6">
                    <div>
                      <p className="text-lg text-ivoire">
                        {produit.nom}
                        {produit.vegetarien === true && (
                          <span className="ml-2 text-xs uppercase tracking-wide text-ambre-clair">Végé</span>
                        )}
                      </p>
                      {produit.description && <p className="mt-0.5 text-sm text-gris-perle">{produit.description}</p>}
                    </div>
                    <span className="shrink-0 text-lg text-ambre-clair">
                      {produit.prix != null ? `${produit.prix.toFixed(2)} €` : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6">
                <EtatVide
                  titre="Cette famille arrive bientôt"
                  description="La carte complète sera publiée ici dès qu'elle sera confirmée par le bar."
                />
              </div>
            )}
          </section>
        ))}
      </div>

      <p className="mx-auto mt-16 max-w-2xl text-xs text-gris-perle">
        {mentionAllergenes ?? "Informations allergènes : à demander au comptoir."}
      </p>
    </div>
  );
}
