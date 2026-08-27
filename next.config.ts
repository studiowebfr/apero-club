import type { NextConfig } from "next";

// Le site est publié sur GitHub Pages, en page de projet
// (studiowebfr.github.io/apero-club) : il lui faut un export 100%
// statique, un `basePath`/`assetPrefix` correspondant au nom du dépôt, et
// des chemins en `/index.html` (`trailingSlash`) puisqu'il n'y a aucun
// serveur Next derrière pour réécrire les routes.
const REPO_NAME = "apero-club";
const estGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: estGithubActions ? `/${REPO_NAME}` : "",
  assetPrefix: estGithubActions ? `/${REPO_NAME}/` : undefined,
  trailingSlash: true,
  images: {
    // Pas de serveur pour optimiser les images à la volée sur de l'hébergement
    // statique. `next/image` reste utilisable, juste sans transformation.
    unoptimized: true,
  },
};

export default nextConfig;
