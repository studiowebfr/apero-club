# Médias attendus

Ce dossier est vide de photos volontairement : le client n'en a pas fourni pour
ce projet, et rien de son Instagram ni des articles de presse n'a été repris
(droits d'auteur, cohérence de la direction artistique). En attendant, le
site affiche des placeholders — dégradé ambre animé + grain — via le
composant `src/components/ui/GradientScene.tsx`.

Le shooting doit se faire **de nuit, à la lumière du bar** (jeudi soir, en
service, objectif lumineux). Une photo prise en journée volets ouverts
casserait la direction artistique : tout le site repose sur le contraste de
l'ambre sur le fond nuit.

Une fois les fichiers déposés dans les dossiers ci-dessous, remplace le
`<GradientScene />` correspondant par un `<video>` (avec `poster`) ou un
`<Image>` `next/image`, selon le composant.

## `hero/`

| Fichier | Format | Ratio | Durée | Poids max |
|---|---|---|---|---|
| `hero.mp4` | H.264, 1080p | 16:9 (paysage) ou 9:16 (portrait mobile) | ≤ 12s | ≤ 4 Mo |
| `hero.webm` | VP9 | idem | ≤ 12s | ≤ 4 Mo |
| `hero-poster.jpg` | JPEG/AVIF | idem | — | ≤ 300 Ko |

Contenu : plan macro d'un verre qu'on pose sur le bois, lumière tamisée sur
les bouteilles, ou une planche qu'on partage.

## `lieu/`

| Fichier | Format | Ratio | Poids max |
|---|---|---|---|
| `comptoir.jpg` | JPEG/AVIF | 3:2 | ≤ 400 Ko |
| `salle-pleine.jpg` | JPEG/AVIF | 16:9 | ≤ 400 Ko |

## `planches/`

| Fichier | Format | Ratio | Poids max |
|---|---|---|---|
| `planche-1.jpg` | JPEG/AVIF | 4:3, vue de dessus | ≤ 350 Ko |
| `planche-2.jpg` | JPEG/AVIF | 4:3, vue de dessus | ≤ 350 Ko |
| `planche-3.jpg` | JPEG/AVIF | 4:3, vue de dessus | ≤ 350 Ko |

## `verres/`

| Fichier | Format | Ratio | Poids max |
|---|---|---|---|
| `verre-1.jpg` | JPEG/AVIF | 4:5, gros plan | ≤ 300 Ko |
| `verre-2.jpg` | JPEG/AVIF | 4:5, gros plan | ≤ 300 Ko |

## `associes/`

| Fichier | Format | Ratio | Poids max |
|---|---|---|---|
| `barney-jordan.jpg` | JPEG/AVIF | 4:3, portrait au comptoir | ≤ 400 Ko |

Voir aussi `CREDITS.md` pour les placeholders temporaires si des vidéos
libres de droits (Pexels/Coverr) sont utilisées en attendant le shooting.
