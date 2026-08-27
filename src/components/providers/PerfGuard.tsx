"use client";

import { useEffect } from "react";

type NavigateurEtendu = Navigator & { deviceMemory?: number };

/** `backdrop-filter` est le poste le plus coûteux du glassmorphism, en
 * particulier sur les téléphones d'entrée de gamme. Sous un seuil de
 * mémoire/cœurs disponibles, on bascule toutes les cartes de verre sur un
 * voile opaque sans flou plutôt que de forcer le calcul (voir globals.css,
 * classe `.perf-reduite`). */
export function PerfGuard() {
  useEffect(() => {
    const nav = navigator as NavigateurEtendu;

    // `deviceMemory` (Chrome/Android uniquement) est le signal le plus
    // fiable. Sur les navigateurs qui ne l'exposent pas (Safari, Firefox),
    // on se rabat sur un seuil de cœurs beaucoup plus bas pour éviter de
    // dégrader des appareils récents qui n'exposent simplement pas l'API.
    const appareilLimite =
      typeof nav.deviceMemory === "number"
        ? nav.deviceMemory <= 4
        : typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;

    if (appareilLimite) {
      document.documentElement.classList.add("perf-reduite");
    }
  }, []);

  return null;
}
