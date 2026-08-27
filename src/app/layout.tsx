import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/providers/CustomCursor";
import { Preloader } from "@/components/providers/Preloader";
import { PerfGuard } from "@/components/providers/PerfGuard";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBarOrPubJsonLd } from "@/lib/jsonld";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  preload: true,
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.nom} — Bar à apéro, vins, bières et cocktails à Besançon`,
    template: `%s — ${site.nom}`,
  },
  description:
    "Bar à apéro rue Bersot à Besançon : vins, bières françaises, cocktails signatures, planches et tapas. Ouvert du mercredi au dimanche, 17h – 1h.",
  keywords: [
    "bar Besançon",
    "apéro Besançon",
    "bar rue Bersot",
    "afterwork Besançon",
    "planches apéro Besançon",
    "où voir le match à Besançon",
    "bar jeux de société Besançon",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nom,
    title: `${site.nom} — Boire, partager, profiter.`,
    description: "Bar à apéro rue Bersot à Besançon. Vins, bières françaises, cocktails signatures, planches.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: site.nom,
    description: "Bar à apéro rue Bersot à Besançon.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${publicSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-nuit text-ivoire antialiased">
        <JsonLd data={buildBarOrPubJsonLd()} />
        <PerfGuard />
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main id="contenu-principal" className="flex-1 pt-0">
            {children}
          </main>
          <MobileActionBar />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
