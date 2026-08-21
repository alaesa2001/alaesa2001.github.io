import type { Metadata } from "next";
import Home from "../page";

const description = "الموقع الشخصي لعلاء الدين صهبو، مهندس برمجيات وباحث في التكنولوجيا الحيوية بالمغرب، متخصص في الأنظمة الخلفية والسحابة وإنترنت الأشياء والمعلوماتية الحيوية ومنصات البيانات الجينومية.";

export const metadata: Metadata = {
  title: { absolute: "علاء الدين صهبو | مهندس برمجيات خلفية وسحابية" },
  description,
  keywords: ["علاء الدين صهبو", "مهندس برمجيات المغرب", "مهندس خلفية الرباط", "مطور Full Stack المغرب", "باحث تكنولوجيا حيوية", "الأنظمة الموزعة", "إنترنت الأشياء", "AWS", "Spring Boot", "المعلوماتية الحيوية", "الجينوميات", "صحة واحدة"],
  alternates: {
    canonical: "/ar",
    languages: { en: "/", fr: "/fr", ar: "/ar", "x-default": "/" },
  },
  openGraph: {
    title: "علاء الدين صهبو | مهندس برمجيات خلفية وسحابية",
    description,
    url: "/ar",
    locale: "ar_MA",
    alternateLocale: ["en_US", "fr_FR"],
    type: "profile",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "علاء الدين صهبو — مهندس برمجيات خلفية وسحابية" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "علاء الدين صهبو | مهندس برمجيات خلفية وسحابية",
    description,
    images: ["/og.png"],
  },
};

export default function ArabicPortfolio() {
  return <Home initialLang="ar" />;
}
