import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Vie privée",
  alternates: { canonical: "/vie-privee" },
};

export default function ViePriveePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32 lg:px-10">
      <h1 className="font-display text-3xl text-ivoire">Vie privée</h1>

      <div className="mt-8 flex flex-col gap-6 text-sm text-ivoire/85">
        <p>
          Ce site ne dépose aucun cookie de mesure d&rsquo;audience ni de traçage publicitaire. Il n&rsquo;intègre
          ni iframe tierce, ni police distante, ni module de réseau social embarqué : il n&rsquo;y a donc rien à
          suivre, et pas de bandeau de consentement à afficher.
        </p>

        <div>
          <h2 className="text-base text-ivoire">Formulaire de contact</h2>
          <p className="mt-2">
            Les informations saisies dans le formulaire (nom, e-mail, téléphone si renseigné, message) sont
            transmises par e-mail à {site.nom} pour te répondre. Elles ne sont ni revendues, ni utilisées à des
            fins commerciales, ni conservées au-delà du traitement de ta demande.
          </p>
        </div>

        <div>
          <h2 className="text-base text-ivoire">Tes droits</h2>
          <p className="mt-2">
            Conformément au RGPD, tu peux demander l&rsquo;accès, la rectification ou la suppression de tes
            données en écrivant à {site.email ?? "l'adresse indiquée sur la page Nous trouver"}.
          </p>
        </div>
      </div>
    </div>
  );
}
