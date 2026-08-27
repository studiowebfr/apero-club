import { GradientScene } from "@/components/ui/GradientScene";
import { site } from "@/content/site";
import { histoire } from "@/content/histoire";

export function SectionAssocies() {
  return (
    <section aria-label="Deux associés, une idée de soirée" className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="glass glass--photo h-72 overflow-hidden lg:h-96">
          <GradientScene
            className="h-full w-full"
            label="Barney Mougnard et Jordan Guenot au comptoir, portrait en lumière du soir"
          />
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">
            {site.fondateurs.join(" & ")}
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4.5vw,3rem)] text-ivoire">{histoire.accroche}</h2>
          <p className="mt-4 max-w-md text-ivoire/85">{histoire.texte}</p>
        </div>
      </div>
    </section>
  );
}
