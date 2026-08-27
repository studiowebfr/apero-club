import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { SectionBoire } from "@/components/home/SectionBoire";
import { SectionPartager } from "@/components/home/SectionPartager";
import { SectionProfiter } from "@/components/home/SectionProfiter";
import { MarqueeBand } from "@/components/home/MarqueeBand";
import { SectionLieu } from "@/components/home/SectionLieu";
import { SectionAssocies } from "@/components/home/SectionAssocies";
import { SectionVenir } from "@/components/home/SectionVenir";
import { SectionAppelFinal } from "@/components/home/SectionAppelFinal";
import { MembershipCardProvider } from "@/components/membership-card/membership-card-context";
import { FloatingMembershipCard } from "@/components/membership-card/FloatingMembershipCard";

export const metadata: Metadata = {
  title: "Apéro Club — Bar à apéro, vins, bières et cocktails à Besançon",
  description:
    "Bar à apéro rue Bersot à Besançon : vins, bières françaises, cocktails signatures, planches et tapas. Ouvert du mercredi au dimanche, 17h – 1h.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <MembershipCardProvider>
      <Hero />
      <Manifesto />
      <SectionBoire />
      <SectionPartager />
      <SectionProfiter />
      <MarqueeBand />
      <SectionLieu />
      <SectionAssocies />
      <SectionVenir />
      <SectionAppelFinal />
      <FloatingMembershipCard />
    </MembershipCardProvider>
  );
}
