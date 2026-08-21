import type { Metadata, Viewport } from "next";
import "./globals.css";
import { withBasePath } from "./site-path";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";
const siteTitle = "Alae-Eddine Sahbou | Backend & Cloud Engineer";
const siteDescription =
  "Portfolio of Alae-Eddine Sahbou, a software engineer and biotechnology researcher in Morocco specializing in backend systems, cloud architecture, IoT, bioinformatics and genomic data platforms.";
const languageAlternates = {
  en: "/",
  fr: "/fr",
  ar: "/ar",
  "x-default": "/",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Alae-Eddine Sahbou" },
  description: siteDescription,
  applicationName: "Alae-Eddine Sahbou — Portfolio",
  authors: [{ name: "Alae-Eddine Sahbou", url: siteUrl }],
  creator: "Alae-Eddine Sahbou",
  publisher: "Alae-Eddine Sahbou",
  keywords: ["Alae-Eddine Sahbou", "software engineer Morocco", "backend engineer Rabat", "full stack engineer Morocco", "cloud engineer Morocco", "biotechnology researcher Morocco", "distributed systems", "microservices", "IoT engineering", "cloud architecture", "bioinformatics", "genomics", "One Health data platform", "AWS", "GCP", "Java", "Spring Boot", "Python", "Flutter", "technical leadership"],
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/", languages: languageAlternates },
  manifest: withBasePath("/manifest.webmanifest"),
  icons: {
    icon: [
      { url: withBasePath("/favicon.ico"), sizes: "any" },
      { url: withBasePath("/icon-192.png"), type: "image/png", sizes: "192x192" },
      { url: withBasePath("/icon-512.png"), type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: withBasePath("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  verification: {
    google: "DNpmw6KaQ0da9J0XOdzXLHaetzEQGmWaVoTmYz3NT7A",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Alae-Eddine Sahbou — Portfolio",
    locale: "en_US",
    type: "profile",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Alae-Eddine Sahbou — Backend and Cloud Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#111411" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alae-Eddine Sahbou",
  url: siteUrl,
  image: `${siteUrl}/alae-eddine-sahbou-profile.jpeg`,
  jobTitle: ["Software Engineer", "Full-stack Engineer", "Biotechnology Researcher"],
  description: siteDescription,
  email: "mailto:alae.shb147@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Salé", addressCountry: "MA" },
  knowsLanguage: ["Arabic", "French", "English"],
  knowsAbout: ["Backend engineering", "Full-stack development", "Distributed systems", "Microservices", "Cloud-native architecture", "Internet of Things", "Bioinformatics", "Genomics", "One Health", "Genomic data platforms", "Amazon Web Services", "Google Cloud Platform", "Java", "Spring Boot", "Python", "Flutter", "Technical leadership"],
  sameAs: [
    "https://www.linkedin.com/in/alae-eddine-sahbou/",
    "https://www.instagram.com/alaesahbou/",
    "https://web.facebook.com/alae.sa.3",
    "https://github.com/alaesa2001",
  ],
  worksFor: [
    { "@type": "Organization", name: "Graviton Solutions", url: "https://graviton.ma/" },
    { "@type": "Organization", name: "Quick Livraison", url: "https://quicklivraison.ma/" },
    { "@type": "CollegeOrUniversity", name: "Mohammed VI Polytechnic University", alternateName: "UM6P", url: "https://www.um6p.ma/" },
  ],
  hasCredential: [
    { "@type": "EducationalOccupationalCredential", name: "Programming for the Internet of Things Project", credentialCategory: "certificate", recognizedBy: { "@type": "CollegeOrUniversity", name: "University of California, Irvine" }, url: "https://www.coursera.org/account/accomplishments/verify/1F73XO37Z13A" },
    { "@type": "EducationalOccupationalCredential", name: "Generative AI for Everyone", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "DeepLearning.AI" }, url: "https://www.coursera.org/account/accomplishments/verify/4T6X7DHE05KZ" },
    { "@type": "EducationalOccupationalCredential", name: "Attendance Hashgraph Developer", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "The Hashgraph Association" }, url: "https://certs.hashgraphdev.com/0a912979-a156-4b20-9d27-41c8ceaf4d66.pdf" },
    { "@type": "EducationalOccupationalCredential", name: "DevOps on AWS: Code, Build, and Test", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "Amazon Web Services" }, url: "https://www.coursera.org/account/accomplishments/verify/9NBK0HO3EOTZ" },
    { "@type": "EducationalOccupationalCredential", name: "Python Project for Data Engineering", credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: "IBM" }, url: "https://www.coursera.org/account/accomplishments/verify/9MOTA2355GX8" },
  ],
  alumniOf: [
    { "@type": "EducationalOrganization", name: "École High-Tech" },
    { "@type": "CollegeOrUniversity", name: "Claude Bernard Lyon 1 University" },
    { "@type": "CollegeOrUniversity", name: "FST Mohammedia" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FW7MNZ7GPE" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-FW7MNZ7GPE");` }} />
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem("theme");const v=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.dataset.theme=v}catch(e){}` }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
        {children}
      </body>
    </html>
  );
}
