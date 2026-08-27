import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/la-carte", priority: 0.9, changeFrequency: "weekly" },
  { path: "/le-programme", priority: 0.9, changeFrequency: "weekly" },
  { path: "/le-lieu", priority: 0.6, changeFrequency: "monthly" },
  { path: "/nous-trouver", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.1, changeFrequency: "yearly" },
  { path: "/vie-privee", priority: 0.1, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.1, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: maintenant,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
