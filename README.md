# Apéro Club — site web

Site du bar Apéro Club, 45 rue Bersot à Besançon. Next.js 16 (App Router),
TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, Framer Motion.

Aucun CMS : tout le contenu vit dans `src/content/*.ts`, en TypeScript
typé et commenté en français. C'est fait exprès — les deux gérants ouvrent
à 17h et ferment à 1h, ils n'ont ni le temps ni l'envie d'apprendre un
outil. Chaque fichier de contenu explique, juste au-dessus de la zone à
modifier, comment faire.

## Installation

```bash
npm install
cp .env.local.example .env.local   # puis renseigne les variables (voir plus bas)
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Voir `.env.local.example`. Trois variables :

- `RESEND_API_KEY` — clé API [Resend](https://resend.com), pour l'envoi du formulaire de contact (`/nous-trouver`). Sans elle, le formulaire répond poliment que l'envoi n'est pas encore configuré, il ne casse jamais silencieusement.
- `CONTACT_EMAIL` — l'adresse qui reçoit les messages du formulaire.
- `NEXT_PUBLIC_SITE_URL` — l'URL de production, une fois le nom de domaine acheté. Utilisée par le sitemap, le JSON-LD et les images Open Graph.

## Modifier le contenu

Tout se passe dans `src/content/`.

### Annoncer un événement (`src/content/programme.ts`)

Ajoute une ligne dans le tableau `programme`, sur le modèle donné en
commentaire en tête de fichier :

```ts
{
  categorie: "sport",              // "sport" | "musique" | "jeux"
  titre: "OM - PSG",
  date: "2026-09-14",              // YYYY-MM-DD
  heure: "21:00",                  // optionnel
  description: "Diffusion en direct, grand écran.",
},
```

Ça s'affiche automatiquement sur la page `/le-programme` et dans la
section « Profiter » de l'accueil. Tant que le tableau est vide, le site
renvoie proprement vers Instagram — jamais un bloc mort.

### Annoncer une fermeture exceptionnelle (`src/content/horaires.ts`)

Ajoute une ligne dans `fermeturesExceptionnelles` :

```ts
{ date: "2026-12-25", motif: "Fermé le soir de Noël" },
```

Ça s'affiche en bandeau sur le site, et ça disparaît tout seul le
lendemain de la date — pas besoin de revenir l'enlever.

### Mettre à jour la carte (`src/content/carte.ts`)

Chaque famille (vins, bières, cocktails, sans alcool, planches, tapas) est
un tableau `produits`. Ajoute une ligne sur le modèle donné en commentaire
en tête de fichier, et mets à jour `dateReleve` (format `"YYYY-MM-DD"`) —
elle s'affiche en petit sur `/la-carte` pour indiquer que l'info est
fraîche.

### Coordonnées, réseaux, société (`src/content/site.ts`)

Téléphone, e-mail, Instagram, informations légales (SIRET, licence...).
Les champs encore à `null` sont volontairement masqués sur le site plutôt
que remplacés par une valeur inventée — pense à les compléter avant la
mise en ligne (voir la liste `[[À COMPLÉTER]]` en commentaire dans le
fichier).

## Remplacer les médias

Le site n'a aucune photo pour l'instant : tous les visuels sont des
placeholders générés en CSS (dégradé ambre animé + grain), via le
composant `src/components/ui/GradientScene.tsx`. Voir
`public/media/README.md` pour la liste exacte des fichiers attendus
(nom, format, ratio, durée, poids max) une fois le shooting fait.

**Le shooting doit se faire de nuit, à la lumière du bar** (pas en
journée volets ouverts) : toute la direction artistique repose sur le
contraste de l'ambre sur le fond nuit.

## Déployer sur Vercel

1. Pousse le dépôt sur GitHub.
2. Importe-le sur [vercel.com/new](https://vercel.com/new).
3. Renseigne les variables d'environnement du fichier `.env.local` dans
   les réglages du projet Vercel (`Settings → Environment Variables`).
4. Déploie. Chaque page est pré-rendue statiquement (sauf `/api/contact`),
   donc les temps de build et de réponse restent très courts.
5. Une fois le nom de domaine branché, mets à jour `NEXT_PUBLIC_SITE_URL`
   avec l'URL définitive et redéploie.

## Qualité

- `npm run lint` — ESLint (Next.js + règles React strictes).
- `npx tsc --noEmit` — vérification des types.
- `npm run build` — build de production ; toutes les pages sont
  statiques à l'exception de la route API du formulaire.

## Ce qu'il reste à faire avant la mise en ligne

- Compléter `src/content/site.ts` (téléphone, e-mail, Instagram, informations société).
- Faire confirmer les horaires par le bar (`src/content/horaires.ts`).
- Faire relire et valider le texte de `src/content/histoire.ts` par Barney et Jordan.
- Faire le shooting photo/vidéo et remplacer les placeholders (`public/media/README.md`).
- Remplir `src/content/carte.ts` dès que la carte est confirmée.
- Réclamer la fiche Google Business Profile du bar (aujourd'hui alimentée par un agrégateur tiers).
