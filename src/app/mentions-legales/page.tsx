import type { Metadata } from "next";
import { adresseComplete, site, siteUrl } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

const { societe } = site;
const infosManquantes = Object.values(societe).every((v) => v === null);

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32 lg:px-10">
      <h1 className="font-display text-3xl text-ivoire">Mentions légales</h1>

      {infosManquantes && (
        <p className="mt-6 rounded-xl border border-ambre-tamise/40 bg-nuit-surface p-4 text-sm text-ambre-clair">
          Cette page est en attente des informations légales de l&rsquo;établissement (raison sociale, SIRET, RCS,
          TVA, licence de débit de boissons, directeur de publication, hébergeur). Elle doit être complétée avant
          la mise en ligne du site.
        </p>
      )}

      <section className="mt-10 flex flex-col gap-6 text-sm text-ivoire/85">
        <div>
          <h2 className="text-base text-ivoire">Éditeur du site</h2>
          <p className="mt-2">{site.nom}</p>
          <p>{adresseComplete()}</p>
          {societe.raisonSociale && <p>{societe.raisonSociale}</p>}
          {societe.formeJuridique && <p>{societe.formeJuridique}</p>}
          {societe.siret && <p>SIRET : {societe.siret}</p>}
          {societe.rcs && <p>RCS : {societe.rcs}</p>}
          {societe.tva && <p>TVA intracommunautaire : {societe.tva}</p>}
          {societe.licence && <p>Licence de débit de boissons : {societe.licence}</p>}
          {site.telephone && <p>Téléphone : {site.telephone}</p>}
          {site.email && <p>E-mail : {site.email}</p>}
        </div>

        <div>
          <h2 className="text-base text-ivoire">Directeur de la publication</h2>
          <p className="mt-2">{societe.directeurPublication ?? "À compléter."}</p>
        </div>

        <div>
          <h2 className="text-base text-ivoire">Hébergement</h2>
          <p className="mt-2">{societe.hebergeur ?? "À compléter."}</p>
          <p>Site : {siteUrl}</p>
        </div>

        <div>
          <h2 className="text-base text-ivoire">Vente d&rsquo;alcool</h2>
          <p className="mt-2">{site.mentions.alcool}</p>
          <p>{site.mentions.mineurs}</p>
        </div>
      </section>
    </div>
  );
}
