import Link from "next/link";
import { adresseComplete, itineraireUrl } from "@/content/site";
import { GradientScene } from "@/components/ui/GradientScene";
import { GlassCard } from "@/components/ui/GlassCard";
import { TonightStatus } from "@/components/ui/TonightStatus";
import { IconArrow } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-28 pt-32 lg:pb-16">
      <GradientScene
        className="absolute inset-0"
        label="Plan macro d'un verre posé sur le bois, lumière tamisée du bar"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/40 to-nuit/10" />

      <div className="relative z-10 flex flex-col gap-8 px-5 lg:px-10">
        <div>
          <h1 className="font-display text-[clamp(3rem,13vw,8rem)] font-semibold uppercase leading-[0.9] text-ivoire">
            Apéro Club
          </h1>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.35em] text-ambre-clair sm:text-base">
            Boire · Partager · Profiter
          </p>
          <p className="mt-4 text-sm text-ivoire/80 sm:text-base">
            {adresseComplete()} · Du mercredi au dimanche, 17h – 1h
          </p>
        </div>

        <GlassCard onMedia className="w-fit px-5 py-4">
          <TonightStatus />
        </GlassCard>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/la-carte"
            className="inline-flex items-center gap-2 rounded-full bg-bleu-action px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90"
            data-cursor-hover
          >
            Voir la carte
            <IconArrow className="h-4 w-4" />
          </Link>
          <a
            href={itineraireUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-ivoire"
            data-cursor-hover
          >
            Itinéraire
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-lg">
          <AccesRapide href="/la-carte" titre="La carte" description="Vins, bières, cocktails, planches." />
          <AccesRapide href="/nous-trouver" titre="Nous trouver" description="45 rue Bersot, Besançon." />
        </div>
      </div>
    </section>
  );
}

function AccesRapide({ href, titre, description }: { href: string; titre: string; description: string }) {
  return (
    <GlassCard onMedia as={Link} href={href} className="block px-4 py-3.5 transition-colors hover:border-ambre-tamise" data-cursor-hover>
      <p className="text-sm font-medium text-ivoire">{titre}</p>
      <p className="mt-0.5 text-xs text-gris-perle">{description}</p>
    </GlassCard>
  );
}
