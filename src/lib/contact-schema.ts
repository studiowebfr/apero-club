import { z } from "zod";

export const OBJETS_CONTACT = ["Question", "Privatisation / groupe", "Presse", "Autre"] as const;

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Indique ton nom (2 caractères minimum)."),
  email: z.string().trim().email("Cette adresse e-mail n'est pas valide."),
  telephone: z.string().trim().optional().or(z.literal("")),
  objet: z.enum(OBJETS_CONTACT, { message: "Choisis un objet." }),
  message: z.string().trim().min(10, "Le message doit faire au moins 10 caractères."),
  consentement: z.literal(true, {
    error: "Il faut accepter que ces informations soient utilisées pour te répondre.",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
