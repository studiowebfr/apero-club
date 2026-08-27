"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CLE_SESSION = "apero-club-vu";
const DUREE_MS = 1600;

/** Préchargeur court (1,6s max), affiché une seule fois par session. Pas
 * de spinner : le nom se compose, c'est tout. */
export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dejaVu = true;
    try {
      dejaVu = sessionStorage.getItem(CLE_SESSION) === "1";
    } catch {
      // sessionStorage indisponible (navigation privée stricte, etc.) :
      // on ne bloque jamais l'affichage du site pour ça.
    }
    if (dejaVu) return;

    // Lecture ponctuelle de sessionStorage au montage, forcément
    // postérieure au rendu serveur : ce n'est pas une donnée dérivable
    // pendant le rendu, ni une source à laquelle s'abonner.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.body.style.overflow = "hidden";

    const reduitMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duree = reduitMotion ? 200 : DUREE_MS;

    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(CLE_SESSION, "1");
      } catch {
        // idem
      }
    }, duree);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-6 bg-nuit"
          aria-hidden="true"
        >
          <motion.p
            initial={{ letterSpacing: "0.35em", opacity: 0 }}
            animate={{ letterSpacing: "0.05em", opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl font-semibold uppercase text-ivoire sm:text-3xl"
          >
            Apéro Club
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-px w-24 origin-left bg-ambre-tamise"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
