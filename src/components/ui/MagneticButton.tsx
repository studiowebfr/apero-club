"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const LIMITE_PX = 6;

/** Bouton avec un léger effet magnétique (6px max) au survol — réservé au
 * call-to-action final, la cible tactile la plus généreuse du site. */
export function MagneticButton({ href, children, className, target, rel, ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * LIMITE_PX * 2);
    y.set(relY * LIMITE_PX * 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-bleu-action px-8 py-4 text-base font-medium text-white transition-colors hover:bg-bleu-action/90",
        className,
      )}
      data-cursor-hover
    >
      {children}
    </motion.a>
  );
}
