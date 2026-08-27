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

Voir `.env.local.example`. Deux variables :

- `NEXT_PUBLIC_FORMSPREE_ID` — identifiant du formulaire [Formspree](https://formspree.io), pour l'envoi du formulaire de contact (`/nous-trouver`). Le site est un export 100% statique (GitHub Pages), donc pas de route API Next.js pour envoyer l'e-mail : Formspree fait ce travail à la place. Sans identifiant, le formulaire répond poliment que l'envoi n'est pas encore configuré, il ne casse jamais silencieusement.
- `NEXT_PUBLIC_SITE_URL` — l'URL de production. Utilisée par le sitemap, le JSON-LD et les images Open Graph.

Ces variables sont lues **au moment du build** (site statique oblige) : en local via `.env.local`, et en production via les secrets du workflow GitHub Actions (`Settings → Secrets and variables → Actions` sur le dépôt, secret `NEXT_PUBLIC_FORMSPREE_ID`).

### Configurer Formspree

1. Crée un compte sur [formspree.io](https://formspree.io) et un formulaire.
2. Récupère son identifiant (dans l'URL du endpoint : `https://formspree.io/f/xxxxxxx` → `xxxxxxx`).
3. Ajoute-le comme secret GitHub Actions `NEXT_PUBLIC_FORMSPREE_ID` sur le dépôt, et en local dans `.env.local`.
4. Dans les réglages du formulaire Formspree, indique l'adresse e-mail qui doit recevoir les messages.

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

## Déploiement — GitHub Pages

Le site est publié automatiquement sur **https://studiowebfr.github.io/apero-club/**
à chaque push sur `main`, via `.github/workflows/deploy.yml` (GitHub
Actions → GitHub Pages). Rien à faire manuellement : un `git push` suffit,
le site rebuild et se redéploie tout seul en 1 à 2 minutes.

Le suivi du déploiement se fait dans l'onglet **Actions** du dépôt GitHub.

Points techniques propres à cet hébergement (déjà en place, pour mémoire) :

- `next.config.ts` exporte le site en HTML/CSS/JS statique (`output: "export"`), avec un `basePath` `/apero-club` appliqué uniquement en CI (`GITHUB_ACTIONS=true`) — en local, le site tourne toujours à la racine.
- Pas de route API : le formulaire de contact passe par Formspree (voir plus haut).
- `public/.nojekyll` empêche GitHub Pages d'ignorer le dossier `_next`.

### Passer sur un nom de domaine perso

1. Achète le domaine, pointe-le vers GitHub Pages (voir la doc GitHub :
   *"Managing a custom domain for your GitHub Pages site"*).
2. Mets à jour `NEXT_PUBLIC_SITE_URL` (secret GitHub Actions) et le
   `basePath`/`assetPrefix` dans `next.config.ts` (retire-les : un domaine
   perso sert le site à la racine, plus besoin de préfixe).

### Si un jour il faut repasser sur un hébergement avec serveur (Vercel...)

Retire `output: "export"` de `next.config.ts`, remets une route
`src/app/api/contact/route.ts` (voir l'historique git avant ce commit
pour un exemple avec Resend) si tu préfères gérer l'envoi toi-même plutôt
que Formspree, et déploie normalement — tout le reste du code est
compatible tel quel.

## Qualité

- `npm run lint` — ESLint (Next.js + règles React strictes).
- `npx tsc --noEmit` — vérification des types.
- `npm run build` — build de production ; génère le dossier `out/` prêt à
  déployer (toutes les pages sont statiques).

## Ce qu'il reste à faire avant la mise en ligne

- Configurer Formspree (voir plus haut) pour que le formulaire de contact envoie vraiment des e-mails.
- Compléter `src/content/site.ts` (téléphone, e-mail, Instagram, informations société).
- Faire confirmer les horaires par le bar (`src/content/horaires.ts`).
- Faire relire et valider le texte de `src/content/histoire.ts` par Barney et Jordan.
- Faire le shooting photo/vidéo et remplacer les placeholders (`public/media/README.md`).
- Remplir `src/content/carte.ts` dès que la carte est confirmée.
- Réclamer la fiche Google Business Profile du bar (aujourd'hui alimentée par un agrégateur tiers).
