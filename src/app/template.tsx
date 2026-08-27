"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** `template.tsx` remonte à chaque navigation (contrairement à layout.tsx) :
 * c'est ce qui permet une transition d'entrée simple à chaque changement
 * de page, sans dépendre d'un mécanisme de sortie fragile côté App Router. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
