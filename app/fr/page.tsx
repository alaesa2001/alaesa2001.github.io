import type { Metadata } from "next";
import Home from "../page";

const description = "Portfolio d’Alae-Eddine Sahbou, ingénieur logiciel et chercheur en biotechnologie au Maroc, spécialisé en systèmes backend, cloud, IoT, bioinformatique et plateformes de données génomiques.";

export const metadata: Metadata = {
  title: { absolute: "Alae-Eddine Sahbou | Ingénieur Backend & Cloud" },
  description,
  keywords: ["Alae-Eddine Sahbou", "ingénieur logiciel Maroc", "ingénieur backend Rabat", "développeur full stack Maroc", "chercheur biotechnologie Maroc", "microservices", "IoT", "AWS", "Spring Boot", "bioinformatique", "génomique", "One Health"],
  alternates: {
    canonical: "/fr",
    languages: { en: "/", fr: "/fr", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    title: "Alae-Eddine Sahbou | Ingénieur Backend & Cloud",
    description,
    url: "/fr",
    locale: "fr_FR",
    alternateLocale: ["en_US", "ar_MA"],
    type: "profile",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Alae-Eddine Sahbou — Ingénieur Backend et Cloud" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alae-Eddine Sahbou | Ingénieur Backend & Cloud",
    description,
    images: ["/og.png"],
  },
};

export default function FrenchPortfolio() {
  return <Home initialLang="fr" />;
}
