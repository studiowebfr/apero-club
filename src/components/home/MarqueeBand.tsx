import { Marquee } from "@/components/ui/Marquee";

export function MarqueeBand() {
  return (
    <div className="overflow-hidden border-y border-verre-bord py-6">
      <Marquee text="PRODUITS FRANÇAIS ET LOCAUX · PRIX ACCESSIBLES · DU MERCREDI AU DIMANCHE · 17H – 1H · " />
    </div>
  );
}
