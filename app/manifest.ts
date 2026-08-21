import type { MetadataRoute } from "next";
import { withBasePath } from "./site-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alae-Eddine Sahbou — Backend & Cloud Engineer",
    short_name: "Alae Sahbou",
    description: "Portfolio of Alae-Eddine Sahbou, a backend and cloud engineer specializing in distributed systems and cloud architecture.",
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#f3f1eb",
    theme_color: "#111411",
    icons: [
      { src: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
