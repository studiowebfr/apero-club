import type { Metadata } from "next";
import { categorieLabel, programme, type CategorieEvenement } from "@/content/programme";
import { site } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { EtatVide } from "@/components/ui/EtatVide";
import { IconBall, IconDice, IconInstagram, IconNote } from "@/components/icons";

export const metadata: Metadata = {
  title: "Le programme",
  description: "Sport, musique et jeux de société à Apéro Club, Besançon — où voir le match, soirées jeux.",
  alternates: { canonical: "/le-programme" },
};

const CATEGORIES: { id: CategorieEvenement; icone: typeof IconDice }[] = [
  { id: "sport", icone: IconBall },
  { id: "musique", icone: IconNote },
  { id: "jeux", icone: IconDice },
];

export default function LeProgrammePage() {
  return (
    <div className="px-5 pb-24 pt-32 lg:px-10">
      <header className="mb-12 max-w-xl">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">Le programme</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] text-ivoire">
          Ce qui se passe au bar cette semaine.
        </h1>
        <p className="mt-2 text-ivoire/80">
          Diffusion d&rsquo;événements sportifs, musique et jeux de société — le programme change, c&rsquo;est la
          seule page du site qui bouge vraiment.
        </p>
      </header>

      <div className="flex flex-col gap-16">
        {CATEGORIES.map(({ id, icone: Icone }) => {
          const evenements = programme.filter((e) => e.categorie === id);
          return (
            <section key={id}>
              <div className="mb-5 flex items-center gap-3">
                <Icone className="h-6 w-6 text-ambre-clair" />
                <h2 className="font-display text-2xl uppercase text-ivoire">{categorieLabel[id]}</h2>
              </div>

              {evenements.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {evenements.map((e) => (
                    <GlassCard key={`${e.titre}-${e.date}`} as="li" className="p-5">
                      <p className="text-ivoire">{e.titre}</p>
                      <p className="mt-1 text-sm text-ambre-clair">
                        {formatDateFr(e.date)}
                        {e.heure ? ` · ${e.heure}` : ""}
                      </p>
                      {e.description && <p className="mt-2 text-sm text-gris-perle">{e.description}</p>}
                    </GlassCard>
                  ))}
                </ul>
              ) : (
                <EtatVide
                  titre="Rien de programmé pour l'instant"
                  description="Aucune date à annoncer sur ce créneau aujourd'hui."
                  action={
                    site.reseaux.instagramHandle ? (
                      <a
                        href={`https://www.instagram.com/${site.reseaux.instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-ivoire hover:text-ambre-clair"
                      >
                        <IconInstagram className="h-4 w-4" />
                        Suivre sur Instagram
                      </a>
                    ) : undefined
                  }
                />
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function formatDateFr(dateStr: string): string {
  const [a, m, j] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, j)).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}
