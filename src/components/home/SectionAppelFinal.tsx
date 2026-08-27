"use client";

import { itineraireUrl } from "@/content/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MembershipCard } from "@/components/membership-card/MembershipCard";
import { useMembershipCard } from "@/components/membership-card/membership-card-context";

export function SectionAppelFinal() {
  const { stamped } = useMembershipCard();

  return (
    <section aria-label="On vous garde une place" className="flex flex-col items-center gap-10 px-5 py-28 text-center lg:py-40">
      <MembershipCard stamped={stamped} flipped size="grande" />

      <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-tight text-ivoire">
        On vous garde une place au comptoir.
      </h2>

      <MagneticButton href={itineraireUrl()} target="_blank" rel="noopener noreferrer" ariaLabel="Itinéraire vers Apéro Club">
        Itinéraire
      </MagneticButton>
    </section>
  );
}
