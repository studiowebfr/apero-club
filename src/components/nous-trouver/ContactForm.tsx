"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, OBJETS_CONTACT, type ContactFormValues } from "@/lib/contact-schema";
import { GlassCard } from "@/components/ui/GlassCard";

type Statut = "idle" | "envoi" | "succes" | "erreur";

// Le site est un export statique (GitHub Pages) : pas de serveur pour une
// route API. Le formulaire poste directement à Formspree, qui relaie par
// e-mail. Sans identifiant configuré, on l'annonce clairement plutôt que
// de laisser le formulaire échouer en silence.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export function ContactForm() {
  const [statut, setStatut] = useState<Statut>("idle");
  const [erreurServeur, setErreurServeur] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    if (!FORMSPREE_ID) {
      setStatut("erreur");
      setErreurServeur("Le formulaire n'est pas encore configuré. Écris directement à contact@... en attendant.");
      return;
    }

    setStatut("envoi");
    setErreurServeur(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.nom,
          email: values.email,
          telephone: values.telephone || undefined,
          _subject: `[Apéro Club] ${values.objet} — ${values.nom}`,
          objet: values.objet,
          message: values.message,
        }),
      });
      if (!res.ok) throw new Error("L'envoi a échoué.");
      setStatut("succes");
      reset();
    } catch (e) {
      setStatut("erreur");
      setErreurServeur(e instanceof Error ? e.message : "L'envoi a échoué.");
    }
  }

  if (statut === "succes") {
    return (
      <GlassCard className="p-6">
        <p className="text-ivoire">Message envoyé. On te répond dès que possible.</p>
        <button type="button" onClick={() => setStatut("idle")} className="mt-4 text-sm text-ambre-clair underline">
          Envoyer un autre message
        </button>
      </GlassCard>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Champ label="Nom" htmlFor="nom" erreur={errors.nom?.message}>
        <input id="nom" type="text" autoComplete="name" {...register("nom")} className={champClass} />
      </Champ>

      <Champ label="E-mail" htmlFor="email" erreur={errors.email?.message}>
        <input id="email" type="email" autoComplete="email" {...register("email")} className={champClass} />
      </Champ>

      <Champ label="Téléphone (facultatif)" htmlFor="telephone" erreur={errors.telephone?.message}>
        <input id="telephone" type="tel" autoComplete="tel" {...register("telephone")} className={champClass} />
      </Champ>

      <Champ label="Objet" htmlFor="objet" erreur={errors.objet?.message}>
        <select id="objet" defaultValue="" {...register("objet")} className={champClass}>
          <option value="" disabled>
            Choisir…
          </option>
          {OBJETS_CONTACT.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Champ>

      <Champ label="Message" htmlFor="message" erreur={errors.message?.message}>
        <textarea id="message" rows={5} {...register("message")} className={champClass} />
      </Champ>

      <label className="flex items-start gap-2.5 text-sm text-ivoire/85">
        <input type="checkbox" {...register("consentement")} className="mt-1 h-4 w-4 shrink-0 accent-bleu-action" />
        J&rsquo;accepte que ces informations soient utilisées pour me répondre. Aucune autre utilisation.
      </label>
      {errors.consentement && <p className="-mt-3 text-sm text-ambre-clair">{errors.consentement.message}</p>}

      {statut === "erreur" && erreurServeur && (
        <p role="alert" className="text-sm text-ambre-clair">
          {erreurServeur}
        </p>
      )}

      <button
        type="submit"
        disabled={statut === "envoi"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-bleu-action px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-bleu-action/90 disabled:opacity-60"
      >
        {statut === "envoi" ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}

const champClass =
  "w-full rounded-xl border border-verre-bord bg-nuit-surface px-4 py-3 text-ivoire placeholder:text-gris-perle focus-visible:border-ambre-clair";

function Champ({
  label,
  htmlFor,
  erreur,
  children,
}: {
  label: string;
  htmlFor: string;
  erreur?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm text-ivoire/85">
        {label}
      </label>
      {children}
      {erreur && <p className="text-sm text-ambre-clair">{erreur}</p>}
    </div>
  );
}
