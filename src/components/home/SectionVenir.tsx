import { adresseComplete, itineraireUrl } from "@/content/site";
import { StyledMap } from "@/components/ui/StyledMap";
import { IconArrow } from "@/components/icons";

export function SectionVenir() {
  return (
    <section aria-label="Venir" className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="glass overflow-hidden">
          <StyledMap className="aspect-[4/3]" />
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">Venir</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ivoire">{adresseComplete()}</h2>
          <p className="mt-3 text-ivoire/80">Rue Bersot, en plein centre de Besançon.</p>
          <a
            href={itineraireUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-bleu-action px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90"
            data-cursor-hover
          >
            Itinéraire
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
