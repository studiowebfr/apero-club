import { useSyncExternalStore } from "react";

/** Lit une media query côté client via useSyncExternalStore : évite tout
 * setState direct dans un effet, et reste sûr pour le rendu serveur
 * (renvoie `false` tant que l'hydratation n'a pas eu lieu). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
