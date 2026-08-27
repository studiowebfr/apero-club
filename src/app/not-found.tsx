import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-5 pt-24 text-center">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-ambre-clair">404</p>
      <h1 className="font-display text-[clamp(2rem,6vw,3.5rem)] text-ivoire">Cette page n&rsquo;existe pas.</h1>
      <p className="max-w-sm text-ivoire/80">
        La page que tu cherches a peut-être changé d&rsquo;adresse. La carte et les horaires sont toujours là.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-bleu-action px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90"
        >
          Retour à l&rsquo;accueil
        </Link>
        <Link href="/la-carte" className="glass inline-flex items-center px-7 py-3.5 text-sm font-medium text-ivoire">
          Voir la carte
        </Link>
      </div>
    </div>
  );
}
