import type { Metadata } from "next";
import { adresseComplete, itineraireUrl, site } from "@/content/site";
import { TonightStatus } from "@/components/ui/TonightStatus";
import { GlassCard } from "@/components/ui/GlassCard";
import { StyledMap } from "@/components/ui/StyledMap";
import { HorairesTable } from "@/components/nous-trouver/HorairesTable";
import { ContactForm } from "@/components/nous-trouver/ContactForm";
import { IconArrow, IconPhone } from "@/components/icons";

export const metadata: Metadata = {
  title: "Nous trouver",
  description: "Adresse, horaires et contact d'Apéro Club, 45 rue Bersot à Besançon. Privatisation et groupes.",
  alternates: { canonical: "/nous-trouver" },
};

export default function NousTrouverPage() {
  return (
    <div className="px-5 pb-24 pt-32 lg:px-10">
      <header className="mb-12">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">Nous trouver</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,4rem)] text-ivoire">{adresseComplete()}</h1>
      </header>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="glass overflow-hidden">
            <StyledMap className="aspect-[4/3]" />
          </div>

          <a
            href={itineraireUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-bleu-action px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90"
            data-cursor-hover
          >
            Itinéraire
            <IconArrow className="h-4 w-4" />
          </a>

          <GlassCard className="p-6">
            <TonightStatus />
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="mb-4 font-display text-lg uppercase text-ivoire">Horaires</h2>
            <HorairesTable />
          </GlassCard>

          {site.telephone && (
            <a href={`tel:${site.telephone.replace(/\s+/g, "")}`} className="inline-flex w-fit items-center gap-2 text-ivoire hover:text-ambre-clair">
              <IconPhone className="h-4 w-4" />
              {site.telephone}
            </a>
          )}

          <section>
            <h2 className="font-display text-lg uppercase text-ivoire">Privatisation et groupes</h2>
            <p className="mt-2 max-w-md text-sm text-ivoire/80">
              Un anniversaire, un afterwork d&rsquo;entreprise, une soirée entre amis nombreux : écrivez-nous via le
              formulaire, objet « Privatisation / groupe », et on regarde ensemble ce qui est possible.
            </p>
          </section>
        </div>

        <div>
          <h2 className="mb-5 font-display text-lg uppercase text-ivoire">Nous écrire</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
