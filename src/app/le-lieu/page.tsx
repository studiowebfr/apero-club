import type { Metadata } from "next";
import { site } from "@/content/site";
import { histoire } from "@/content/histoire";
import { GradientScene } from "@/components/ui/GradientScene";

export const metadata: Metadata = {
  title: "Le lieu",
  description:
    "Bois brut, lumières tamisées, esprit guinguette moderne : l'ambiance d'Apéro Club, bar de quartier à Besançon.",
  alternates: { canonical: "/le-lieu" },
};

export default function LeLieuPage() {
  return (
    <div className="pb-24 pt-32">
      <header className="px-5 lg:px-10">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">Le lieu</p>
        <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,6vw,4rem)] text-ivoire">
          Bois brut, lumières tamisées, esprit guinguette moderne.
        </h1>
        <p className="mt-4 max-w-xl text-ivoire/80">
          Entre esprit guinguette moderne et bar de quartier revisité, l&rsquo;accent est mis sur la convivialité,
          le partage et les bons produits — aussi bien pour un afterwork que pour une soirée entre amis.
        </p>
      </header>

      <div className="mt-16 grid gap-4 px-5 sm:grid-cols-2 lg:px-10">
        <div className="glass glass--photo h-80 overflow-hidden sm:col-span-2 sm:h-[60vh]">
          <GradientScene className="h-full w-full" label="Le comptoir dans sa lumière, service du soir" />
        </div>
        <div className="glass glass--photo h-64 overflow-hidden">
          <GradientScene className="h-full w-full" label="Verre en gros plan, lumière tamisée" />
        </div>
        <div className="glass glass--photo h-64 overflow-hidden">
          <GradientScene className="h-full w-full" label="Planche vue de dessus" />
        </div>
      </div>

      <section className="mt-20 px-5 lg:px-10">
        <div className="mx-auto grid max-w-3xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="glass glass--photo h-72 overflow-hidden">
            <GradientScene className="h-full w-full" label={`${site.fondateurs.join(" et ")}, portrait au comptoir`} />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">
              {site.fondateurs.join(" & ")}
            </p>
            <h2 className="mt-3 font-display text-2xl text-ivoire">{histoire.accroche}</h2>
            <p className="mt-3 text-ivoire/85">{histoire.texte}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
