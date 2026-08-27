import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardOwnProps<T extends ElementType> = {
  children: ReactNode;
  className?: string;
  /** Passe à true si la carte peut se trouver au-dessus d'une photo ou
   * d'une vidéo : elle reçoit alors le voile le plus opaque (règle de
   * contraste du brief, non négociable). */
  onMedia?: boolean;
  as?: T;
};

type GlassCardProps<T extends ElementType> = GlassCardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof GlassCardOwnProps<T>>;

/** Carte de verre dépoli réutilisable, avec voile opaque intégré sous le
 * flou pour garantir la lisibilité du texte quel que soit ce qu'il y a
 * derrière. */
export function GlassCard<T extends ElementType = "div">({
  children,
  className,
  onMedia = false,
  as,
  ...rest
}: GlassCardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn("glass", onMedia && "glass--photo", className)} {...rest}>
      {children}
    </Tag>
  );
}
