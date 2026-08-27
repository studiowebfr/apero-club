import { itineraireUrl, site } from "@/content/site";
import { IconPhone, IconPin } from "@/components/icons";

/** Barre fixe en bas, mobile uniquement : les deux gestes réels d'un
 * client à 19h — l'itinéraire, et l'appel s'il y a un numéro à composer. */
export function MobileActionBar() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 flex rounded-none border-x-0 border-b-0 lg:hidden">
      <a
        href={itineraireUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 border-r border-verre-bord py-4 text-sm font-medium text-ivoire"
      >
        <IconPin className="h-4 w-4" />
        Itinéraire
      </a>
      {site.telephone ? (
        <a
          href={`tel:${site.telephone.replace(/\s+/g, "")}`}
          className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-ivoire"
        >
          <IconPhone className="h-4 w-4" />
          Appeler
        </a>
      ) : (
        <a
          href="/nous-trouver"
          className="flex flex-1 items-center justify-center gap-2 py-4 text-sm font-medium text-ivoire"
        >
          <IconPhone className="h-4 w-4" />
          Nous écrire
        </a>
      )}
    </div>
  );
}
