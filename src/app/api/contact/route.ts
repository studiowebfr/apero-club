import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/content/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide." }, { status: 400 });
  }

  const resultat = contactSchema.safeParse(body);
  if (!resultat.success) {
    return NextResponse.json(
      { message: "Formulaire invalide.", erreurs: resultat.error.flatten() },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL ?? site.email;

  if (!apiKey || !destinataire) {
    console.error(
      "[/api/contact] Envoi impossible : RESEND_API_KEY et/ou CONTACT_EMAIL ne sont pas configurés dans .env.local.",
    );
    return NextResponse.json(
      { message: "Le formulaire n'est pas encore configuré. Écris directement à contact@... en attendant." },
      { status: 503 },
    );
  }

  const { nom, email, telephone, objet, message } = resultat.data;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Site ${site.nom} <onboarding@resend.dev>`,
      to: destinataire,
      replyTo: email,
      subject: `[${site.nom}] ${objet} — ${nom}`,
      text: [
        `Nom : ${nom}`,
        `E-mail : ${email}`,
        telephone ? `Téléphone : ${telephone}` : null,
        `Objet : ${objet}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  } catch (err) {
    console.error("[/api/contact] Échec de l'envoi via Resend :", err);
    return NextResponse.json({ message: "L'envoi a échoué, réessaie dans un instant." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
