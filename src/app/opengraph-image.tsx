import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.nom} — Boire, partager, profiter.`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background:
            "radial-gradient(120% 100% at 15% 20%, rgba(201,130,46,0.35), transparent 60%), #0A0E14",
          color: "#ECE6DC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Apéro Club
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#F0C38A",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          Boire · Partager · Profiter
        </div>
        <div style={{ marginTop: 44, fontSize: 28, color: "#8B8F98" }}>
          45 rue Bersot, Besançon · Mer–Dim, 17h – 1h
        </div>
      </div>
    ),
    { ...size },
  );
}
