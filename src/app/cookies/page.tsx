import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-32 lg:px-10">
      <h1 className="font-display text-3xl text-ivoire">Cookies</h1>

      <div className="mt-8 flex flex-col gap-6 text-sm text-ivoire/85">
        <p>
          Ce site n&rsquo;utilise aucun cookie de mesure d&rsquo;audience, de publicité ou de traçage. Il n&rsquo;y
          a donc pas de bandeau de consentement : il n&rsquo;y a rien à consentir.
        </p>
        <p>
          Le stockage technique éventuellement utilisé par le navigateur (par exemple pour retenir que le
          préchargeur d&rsquo;accueil a déjà été vu au cours de la session) reste local à ton appareil et n&rsquo;est
          transmis à aucun serveur.
        </p>
      </div>
    </div>
  );
}
