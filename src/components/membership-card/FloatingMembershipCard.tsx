"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/lib/use-media-query";
import { MembershipCard, progressionLabel } from "./MembershipCard";
import { STAMP_KEYS, useMembershipCard } from "./membership-card-context";

/** Instance flottante de la carte de membre : posée en coin d'écran sur
 * desktop, et repliée sur mobile où elle n'apparaît brièvement qu'aux
 * points de tampon pour ne pas manger l'écran. */
export function FloatingMembershipCard() {
  const { stamped } = useMembershipCard();
  const reduitMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visibleMobile, setVisibleMobile] = useState(false);
  const dernierCompte = useRef(0);

  useEffect(() => {
    if (stamped.size === dernierCompte.current) return;
    dernierCompte.current = stamped.size;
    if (stamped.size === 0) return;
    // Minuteur d'affichage éphémère (toast) : ne peut pas se calculer
    // pendant le rendu, c'est un effet de bord délibéré déclenché par un
    // changement de progression, pas une boucle de mise à jour.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleMobile(true);
    const t = setTimeout(() => setVisibleMobile(false), 1800);
    return () => clearTimeout(t);
  }, [stamped.size]);

  const carteComplete = reduitMotion ? new Set(STAMP_KEYS) : stamped;

  return (
    <>
      <span className="sr-only" role="status">
        {progressionLabel(stamped)}
      </span>

      {/* Desktop : toujours visible, en coin d'écran */}
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block">
        <MembershipCard stamped={carteComplete} size="flottante" />
      </div>

      {/* Mobile : apparition brève à chaque tampon */}
      <div className="pointer-events-none fixed bottom-20 right-4 z-40 md:hidden">
        <AnimatePresence>
          {(visibleMobile || reduitMotion) && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <MembershipCard stamped={carteComplete} size="flottante" className="scale-90" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
