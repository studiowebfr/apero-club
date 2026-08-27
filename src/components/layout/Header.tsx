"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconClose, IconMenu } from "@/components/icons";

const LIENS = [
  { href: "/la-carte", label: "La carte" },
  { href: "/le-programme", label: "Le programme" },
  { href: "/le-lieu", label: "Le lieu" },
  { href: "/nous-trouver", label: "Nous trouver" },
] as const;

export function Header() {
  const [compact, setCompact] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const barreRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const premierLien = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const barre = barreRef.current;
    if (!barre) return;

    if (menuOuvert) {
      barre.setAttribute("inert", "");
      document.body.style.overflow = "hidden";
      premierLien.current?.focus();
    } else {
      barre.removeAttribute("inert");
      document.body.style.overflow = "";
    }

    const onKey = (e: KeyboardEvent) => {
      if (!menuOuvert) return;
      if (e.key === "Escape") {
        setMenuOuvert(false);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a, button");
      if (focusables.length === 0) return;
      const premier = focusables[0];
      const dernier = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === premier) {
        e.preventDefault();
        dernier.focus();
      } else if (!e.shiftKey && document.activeElement === dernier) {
        e.preventDefault();
        premier.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      barre.removeAttribute("inert");
      document.body.style.overflow = "";
    };
  }, [menuOuvert]);

  return (
    <header
      className={cn(
        "glass fixed inset-x-0 top-0 z-50 mx-auto flex max-w-none items-center justify-between rounded-none border-x-0 border-t-0 px-5 transition-[padding] duration-300",
        compact ? "py-2.5" : "py-4",
      )}
    >
      <div ref={barreRef} className="flex w-full items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold uppercase tracking-wide text-ivoire">
          Apéro Club
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LIENS.map((lien) => (
            <Link key={lien.href} href={lien.href} className="text-sm text-ivoire/90 transition-colors hover:text-ambre-clair">
              {lien.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/la-carte"
            className="inline-flex items-center rounded-full bg-bleu-action px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90"
          >
            Voir la carte
          </Link>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOuvert}
          onClick={() => setMenuOuvert(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-verre-bord text-ivoire lg:hidden"
        >
          <IconMenu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8 bg-nuit lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOuvert(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-verre-bord text-ivoire"
            >
              <IconClose className="h-5 w-5" />
            </button>

            {LIENS.map((lien, i) => (
              <Link
                key={lien.href}
                href={lien.href}
                ref={i === 0 ? premierLien : undefined}
                onClick={() => setMenuOuvert(false)}
                className="font-display text-3xl uppercase text-ivoire hover:text-ambre-clair"
              >
                {lien.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
