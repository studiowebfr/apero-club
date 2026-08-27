import { carte } from "@/content/carte";
import { GradientScene } from "@/components/ui/GradientScene";
import { EtatVide } from "@/components/ui/EtatVide";
import { StampTrigger } from "@/components/membership-card/StampTrigger";

export function SectionPartager() {
  const planches = carte.find((f) => f.id === "planches")?.produits ?? [];

  return (
    <StampTrigger stampKey="planches">
      <section aria-label="Partager" className="px-5 py-24 lg:px-10 lg:py-32">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">02 — Partager</p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ivoire">
          Des planches apéro et des tapas de la région, faites pour se poser au milieu de la table.
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planches.length > 0 ? (
            planches.map((produit) => (
              <div key={produit.nom} className="glass glass--photo overflow-hidden">
                <GradientScene className="h-48 w-full" label={`Planche : ${produit.nom}`} />
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg text-ivoire">{produit.nom}</h3>
                    {produit.prix != null && <span className="text-ambre-clair">{produit.prix.toFixed(2)} €</span>}
                  </div>
                  {produit.description && <p className="mt-2 text-sm text-gris-perle">{produit.description}</p>}
                </div>
              </div>
            ))
          ) : (
            <>
              <GlassPlaceholder label="Planche vue de dessus, partage à table" />
              <GlassPlaceholder label="Planche vue de dessus, planche mixte" />
              <EtatVide
                titre="La carte des planches arrive"
                description="Les planches et tapas seront publiés ici dès que la carte du bar sera confirmée."
              />
            </>
          )}
        </div>
      </section>
    </StampTrigger>
  );
}

function GlassPlaceholder({ label }: { label: string }) {
  return (
    <div className="glass glass--photo h-64 overflow-hidden">
      <GradientScene className="h-full w-full" label={label} />
    </div>
  );
}
