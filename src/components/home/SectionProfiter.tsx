import { categorieLabel, programme, type CategorieEvenement } from "@/content/programme";
import { site } from "@/content/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { StampTrigger } from "@/components/membership-card/StampTrigger";
import { IconBall, IconDice, IconInstagram, IconNote } from "@/components/icons";
import type { StampKey } from "@/components/membership-card/membership-card-context";

const BLOCS: { categorie: CategorieEvenement; stamp: StampKey; icone: typeof IconDice }[] = [
  { categorie: "jeux", stamp: "jeux", icone: IconDice },
  { categorie: "sport", stamp: "sport", icone: IconBall },
  { categorie: "musique", stamp: "musique", icone: IconNote },
];

export function SectionProfiter() {
  return (
    <section aria-label="Profiter" className="px-5 py-24 lg:px-10 lg:py-32">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">03 — Profiter</p>
      <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ivoire">
        Musique, jeux de société, événements sportifs — le programme change, revenez voir.
      </h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {BLOCS.map(({ categorie, stamp, icone: Icone }) => {
          const evenements = programme.filter((e) => e.categorie === categorie);
          return (
            <StampTrigger key={categorie} stampKey={stamp}>
              <GlassCard className="flex h-full flex-col gap-4 p-6">
                <Icone className="h-6 w-6 text-ambre-clair" />
                <h3 className="font-display text-xl text-ivoire">{categorieLabel[categorie]}</h3>
                {evenements.length > 0 ? (
                  <ul className="flex flex-col gap-3">
                    {evenements.map((e) => (
                      <li key={`${e.titre}-${e.date}`} className="text-sm">
                        <p className="text-ivoire">{e.titre}</p>
                        <p className="text-gris-perle">
                          {formatDateFr(e.date)}
                          {e.heure ? ` · ${e.heure}` : ""}
                        </p>
                        {e.description && <p className="mt-1 text-gris-perle">{e.description}</p>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EtatVideProgramme />
                )}
              </GlassCard>
            </StampTrigger>
          );
        })}
      </div>
    </section>
  );
}

function EtatVideProgramme() {
  return (
    <div className="mt-auto flex flex-col gap-3">
      <p className="text-sm text-gris-perle">Rien de programmé pour l&rsquo;instant sur ce créneau.</p>
      {site.reseaux.instagramHandle ? (
        <a
          href={`https://www.instagram.com/${site.reseaux.instagramHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-ivoire hover:text-ambre-clair"
        >
          <IconInstagram className="h-4 w-4" />
          Suivre sur Instagram
        </a>
      ) : (
        <p className="text-xs text-gris-perle">Instagram — lien à venir</p>
      )}
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
