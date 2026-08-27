import { site } from "@/content/site";

/** Carte stylisée en SVG, thème sombre, marqueur ambre — pas d'iframe
 * Google Maps (poids, cookies, RGPD). */
export function StyledMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label={`Plan stylisé situant ${site.nom} rue Bersot, Besançon`}>
        <rect width="400" height="260" fill="#121721" />
        <g stroke="#8B8F98" strokeOpacity="0.35" strokeWidth="1.5">
          <path d="M0 60 H400" />
          <path d="M0 130 H400" />
          <path d="M0 200 H400" />
          <path d="M90 0 V260" />
          <path d="M230 0 V260" />
          <path d="M320 0 V260" />
        </g>
        <path d="M90 130 H320" stroke="#C9822E" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
        <text x="95" y="122" fill="#8B8F98" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
          RUE BERSOT
        </text>
        <circle cx="230" cy="130" r="7" fill="#F0C38A" />
        <circle cx="230" cy="130" r="12" fill="none" stroke="#F0C38A" strokeOpacity="0.4" strokeWidth="2" />
      </svg>
    </div>
  );
}
