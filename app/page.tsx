"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { withBasePath } from "./site-path";

type Lang = "fr" | "en" | "ar";
type Theme = "light" | "dark";

const content = {
  fr: {
    nav: ["Profil", "Expérience", "Projets", "Blog", "Contact"],
    eyebrow: "Ingénieur logiciel · Salé, Maroc", title1: "Je conçois des systèmes", title2: "qui tiennent la charge.",
    intro: "Ingénieur backend spécialisé en systèmes distribués et architectures cloud. Je transforme des problèmes complexes en produits fiables, évolutifs et utiles.",
    explore: "Découvrir mon travail", cv: "Télécharger mon CV", available: "Disponible pour de nouvelles opportunités",
    stats: [["10", "rôles professionnels"], ["25", "certifications"], ["1", "publication scientifique"]],
    profileK: "01 — Profil", profileT: "L’ingénierie avec une vision produit.",
    profile: "Mon travail se situe à l’intersection de l’architecture logicielle, du cloud et de la coordination technique. J’aime structurer les systèmes autant que les équipes qui les construisent — avec clarté, exigence et sens du résultat.",
    values: [["Architecture", "Des fondations simples, modulaires et conçues pour évoluer."], ["Collaboration", "Des décisions lisibles par les équipes produit et métier."], ["Impact", "Une technologie au service d’un résultat concret."]],
    expK: "02 — Parcours", expT: "Expérience professionnelle", now: "ACTUEL",
    exp: [
      ["Software Engineer", "Graviton Solutions", "Oct. 2025 — Aujourd’hui", "Conception de services backend, architecture microservices et intégration d’APIs pour des solutions IoT web et mobile.", "Temps plein · Rabat · Sur site", "Java · Microservices · APIs · IoT"],
      ["Ingénieur Full Stack", "Quick Livraison", "Mars 2024 — Aujourd’hui", "Développement d’une plateforme technologique de livraison, des services backend aux applications mobiles et automatisations cloud.", "Temps plein · Casablanca", "Java · Flutter · AWS · Lambda · Linux"],
      ["Chercheur en biotechnologie", "UM6P · Consortium OGAMS", "Mai 2026 — Aujourd’hui", "Membre de l’équipe de recherche du projet MMRBGD, un portail One Health de données épidémiologiques et génomiques coordonné par l’INH.", "CDD · Rabat · Hybride", "Génomique · Bio-informatique · VMware · Scripting"],
      ["Ingénieur Full Stack", "Orange Maroc", "Fév. — Juin 2025", "Développement de la plateforme FabLab Solidaire avec APIs sécurisées, gestion des utilisateurs et supervision technique.", "Stage · Rabat · Sur site", "Spring Boot · Spring Security · Angular · IoT"],
      ["Backend Engineer", "RocketDevs", "Avr. — Juin 2024", "Développement backend et livraison de fonctionnalités dans un environnement produit distribué.", "Temps plein · À distance", "Backend · APIs · Node.js · Collaboration"],
      ["Full-stack Developer", "DGC Partner", "Juin 2023 — Mars 2024", "Refonte d’infrastructure et développement de produits web dans un environnement cloud-native.", "Temps plein · Kénitra · Sur site", "Cloud-native · Laravel · React · GCP · Leadership"],
      ["Full Stack Developer Manager", "Plum Networks", "Fév. — Juil. 2023", "Pilotage des priorités, accompagnement technique de l’équipe et coordination avec les clients sur des projets livrés de bout en bout.", "Temps plein · San Diego · À distance", "Management · Architecture · Support technique"],
      ["Développeur", "INRA Maroc", "Juil. — Nov. 2022", "Conception de BuscoPhylo, une application web d’analyse phylogénomique basée sur BUSCO pour les chercheurs et non-spécialistes.", "CDD · Rabat · Sur site", "Python · Django · BUSCO · Bio-informatique"],
      ["Bio-informaticien", "INRA Maroc", "Fév. — Juil. 2022", "Développement d’une base de données SSR pour faciliter l’analyse génétique et structurer les données de microsatellites.", "Stage · Rabat · Sur site", "BioPHP · Biopython · Bases de données · Recherche"],
      ["Full-stack Developer", "Borderline Solutions", "Avr. — Oct. 2021", "Réalisation de MedicalDoctorsNetwork, de l’application Android Gimme Profile et du site web de l’entreprise.", "Stage · Salé · Sur site", "Web · Android · PHP · JavaScript"],
    ],
    projectK: "03 — Projets", projectT: "Des idées devenues produits.",
    projects: [["MMRBGD — OGAMS", "2026", "Portail national One Health centralisant les données épidémiologiques et génomiques sur les pathogènes multirésistants au Maroc.", "Génomique · Bioinformatique · Plateforme de données"], ["InterviewPal", "2025", "Préparation aux entretiens avec GPT et AWS Lambda.", "GPT · AWS Lambda"], ["Marketplace e-commerce", "2024", "Plateforme d’achat, vente, produits, utilisateurs et paiements.", "Stripe · Full stack"], ["CRM Call Center", "2023", "Gestion client avec infrastructure CTI.", "Twilio API · CRM"], ["BriefAI", "2023", "Application open source de résumé de textes propulsée par GPT-4 avec une interface React responsive.", "GPT-4 · React · Tailwind CSS"], ["ChessAI", "2023", "Jeu d’échecs web contre une IA utilisant minimax et l’élagage alpha-bêta.", "JavaScript · Algorithmes · IA"], ["EmotionDetector", "2023", "Détection en temps réel des émotions faciales à partir d’un flux vidéo.", "Python · Vision par ordinateur"], ["BuscoPhylo", "2022", "Analyse phylogénomique accessible aux non-spécialistes.", "Python · Django · BUSCO"]], visit: "Voir le projet", consortium: "Consortium coordonné par l’INH",
    blogK: "04 — Journal", blogT: "Idées, décisions et pratiques.", blogIntro: "Cent articles pratiques sur les systèmes backend, le cloud, la livraison, la bioinformatique et le leadership technique.", blogAll: "Explorer les 100 articles", blogRead: "Lire",
    skillsK: "05 — Expertise", skillsT: "Une boîte à outils complète.",
    skills: [["Backend & langages", "Java · Python · TypeScript · PHP · Dart · SQL · Bash"], ["Frameworks & mobile", "Spring Boot · Spring Security · React · Angular · Node.js · Laravel · Flutter"], ["Cloud & DevOps", "AWS · GCP · Docker · Kubernetes · Jenkins · Linux · CI/CD"], ["Architecture", "Microservices · APIs · Systèmes distribués · Cloud-native · Automatisation"], ["Data, IA & recherche", "Génomique · Bio-informatique · Biopython · BUSCO · Machine learning · Bases de données"], ["Leadership produit", "Management d’équipe · Planification · Collaboration client · Analyse métier · Contrôle qualité"]],
    pubK: "Publication scientifique", pubT: "BuscoPhylo — Scientific Reports", pub: "Co-auteur d’une publication internationale présentant un serveur web d’analyse phylogénomique basé sur BUSCO.",
    eduK: "06 — Formation", eduT: "Formation & certifications", certT: "Certifications sélectionnées", allCreds: "Voir les 25 certifications",
    degrees: [["Diplôme d’ingénieur d’État MIAGE", "École High-Tech", "2023—2025"], ["Master MIAGE", "Université Claude Bernard Lyon 1", "2023—2025"], ["Technicien spécialisé en développement informatique", "Pro-Systems, Salé", "2020—2022"], ["DEUST Sciences", "FST Mohammedia", "2019—2021"]],
    contactK: "07 — Contact", contactT: "Construisons quelque chose de solide.", contact: "Un produit à lancer, une architecture à faire évoluer ou une équipe technique à renforcer ? Parlons-en.", write: "M’écrire", place: "Salé, Maroc", footer: "Conçu avec soin, du backend au pixel.",
  },
  en: {
    nav: ["Profile", "Experience", "Projects", "Blog", "Contact"], eyebrow: "Software engineer · Salé, Morocco", title1: "I build systems", title2: "that hold up.", intro: "Backend engineer specializing in distributed systems and cloud architecture. I turn complex problems into reliable, scalable, useful products.", explore: "Explore my work", cv: "Download my résumé", available: "Open to new opportunities",
    stats: [["10", "professional roles"], ["25", "certifications"], ["1", "scientific publication"]], profileK: "01 — Profile", profileT: "Engineering with product perspective.", profile: "My work sits at the intersection of software architecture, cloud and technical coordination. I enjoy structuring systems as much as the teams building them — with clarity, high standards and focus on outcomes.", values: [["Architecture", "Simple, modular foundations designed to evolve."], ["Collaboration", "Decisions understood by product and business teams."], ["Impact", "Technology serving a concrete outcome."]],
    expK: "02 — Journey", expT: "Professional experience", now: "CURRENT", exp: [
      ["Software Engineer", "Graviton Solutions", "Oct. 2025 — Present", "Backend services, microservice architecture, and API integration for connected web and mobile IoT products.", "Full-time · Rabat · On-site", "Java · Microservices · APIs · IoT"],
      ["Full-stack Engineer", "Quick Livraison", "Mar. 2024 — Present", "Engineering a connected delivery platform across backend services, mobile applications, and cloud automation.", "Full-time · Casablanca", "Java · Flutter · AWS · Lambda · Linux"],
      ["Biotechnology Researcher", "UM6P · OGAMS Consortium", "May 2026 — Present", "Research team member on MMRBGD, a national One Health portal for epidemiological and genomic data coordinated by INH.", "Fixed-term · Rabat · Hybrid", "Genomics · Bioinformatics · VMware · Scripting"],
      ["Full-stack Engineer", "Orange Morocco", "Feb. — Jun. 2025", "Built the FabLab Solidaire platform with secure APIs, user management, and technical monitoring.", "Internship · Rabat · On-site", "Spring Boot · Spring Security · Angular · IoT"],
      ["Backend Engineer", "RocketDevs", "Apr. — Jun. 2024", "Backend development and feature delivery within a distributed product engineering environment.", "Full-time · Remote", "Backend · APIs · Node.js · Collaboration"],
      ["Full-stack Developer", "DGC Partner", "Jun. 2023 — Mar. 2024", "Infrastructure modernization and product development in a cloud-native environment.", "Full-time · Kénitra · On-site", "Cloud-native · Laravel · React · GCP · Leadership"],
      ["Full Stack Developer Manager", "Plum Networks", "Feb. — Jul. 2023", "Led priorities, supported engineers, and coordinated with clients across end-to-end software projects.", "Full-time · San Diego · Remote", "Management · Architecture · Technical support"],
      ["Developer", "INRA Morocco", "Jul. — Nov. 2022", "Created BuscoPhylo, a BUSCO-based web application that makes phylogenomics analysis accessible to researchers and non-specialists.", "Fixed-term · Rabat · On-site", "Python · Django · BUSCO · Bioinformatics"],
      ["Bioinformatician", "INRA Morocco", "Feb. — Jul. 2022", "Developed an SSR database to support genetic analysis and organize microsatellite research data.", "Internship · Rabat · On-site", "BioPHP · Biopython · Databases · Research"],
      ["Full-stack Developer", "Borderline Solutions", "Apr. — Oct. 2021", "Delivered MedicalDoctorsNetwork, the Gimme Profile Android application, and the company website.", "Internship · Salé · On-site", "Web · Android · PHP · JavaScript"],
    ],
    projectK: "03 — Projects", projectT: "Ideas turned into products.", projects: [["MMRBGD — OGAMS", "2026", "A national One Health portal centralizing epidemiological and genomic data on multidrug-resistant pathogens in Morocco.", "Genomics · Bioinformatics · Data platform"], ["InterviewPal", "2025", "Interview preparation with GPT and AWS Lambda.", "GPT · AWS Lambda"], ["E-commerce marketplace", "2024", "Buying, selling, products, users and payments.", "Stripe · Full stack"], ["Call center CRM", "2023", "Customer management connected to CTI infrastructure.", "Twilio API · CRM"], ["BriefAI", "2023", "An open-source GPT-4 text summarizer with a polished responsive React interface.", "GPT-4 · React · Tailwind CSS"], ["ChessAI", "2023", "A web chess game against an AI using minimax with alpha-beta pruning.", "JavaScript · Algorithms · AI"], ["EmotionDetector", "2023", "Real-time facial emotion detection from a live video feed.", "Python · Computer vision"], ["BuscoPhylo", "2022", "Phylogenomics analysis made accessible to non-specialists.", "Python · Django · BUSCO"]], visit: "Visit project", consortium: "Consortium coordinated by INH",
    blogK: "04 — Journal", blogT: "Ideas, decisions, and practices.", blogIntro: "One hundred practical articles about backend systems, cloud, delivery, bioinformatics, and technical leadership.", blogAll: "Explore all 100 articles", blogRead: "Read",
    skillsK: "05 — Expertise", skillsT: "A complete technical toolkit.", skills: [["Backend & languages", "Java · Python · TypeScript · PHP · Dart · SQL · Bash"], ["Frameworks & mobile", "Spring Boot · Spring Security · React · Angular · Node.js · Laravel · Flutter"], ["Cloud & DevOps", "AWS · GCP · Docker · Kubernetes · Jenkins · Linux · CI/CD"], ["Architecture", "Microservices · APIs · Distributed systems · Cloud-native · Automation"], ["Data, AI & research", "Genomics · Bioinformatics · Biopython · BUSCO · Machine learning · Databases"], ["Product leadership", "Team management · Planning · Client collaboration · Business analysis · Quality control"]], pubK: "Scientific publication", pubT: "BuscoPhylo — Scientific Reports", pub: "Co-author of an international publication presenting a BUSCO-based phylogenomics web server.", eduK: "06 — Education", eduT: "Education & certifications", certT: "Selected certifications", allCreds: "View all 25 certifications", degrees: [["State Engineering Degree in MIAGE", "École High-Tech", "2023—2025"], ["Master’s in MIAGE", "Claude Bernard Lyon 1 University", "2023—2025"], ["Specialized Technician in Software Development", "Pro-Systems, Salé", "2020—2022"], ["DEUST in Science", "FST Mohammedia", "2019—2021"]], contactK: "07 — Contact", contactT: "Let’s build something solid.", contact: "Launching a product, evolving an architecture or strengthening a technical team? Let’s talk.", write: "Email me", place: "Salé, Morocco", footer: "Designed with care, from backend to pixel.",
  },
  ar: {
    nav: ["نبذة", "الخبرة", "المشاريع", "المدونة", "تواصل"], eyebrow: "مهندس برمجيات · سلا، المغرب", title1: "أبني أنظمة", title2: "تصمد أمام التحديات.", intro: "مهندس برمجيات خلفية متخصص في الأنظمة الموزعة والبنى السحابية. أحوّل المشكلات المعقدة إلى منتجات موثوقة وقابلة للتوسع وذات قيمة.", explore: "اكتشف أعمالي", cv: "تحميل السيرة الذاتية", available: "متاح لفرص جديدة",
    stats: [["10", "أدوار مهنية"], ["25", "شهادة"], ["1", "منشور علمي"]], profileK: "01 — نبذة", profileT: "هندسة برؤية منتج.", profile: "يقع عملي عند تقاطع هندسة البرمجيات والسحابة والتنسيق التقني. أستمتع بتنظيم الأنظمة والفرق التي تبنيها بوضوح ومعايير عالية وتركيز على النتائج.", values: [["الهندسة", "أسس بسيطة ومرنة مصممة للتطور."], ["التعاون", "قرارات واضحة لفرق المنتج والأعمال."], ["الأثر", "تقنية تخدم نتيجة ملموسة."]],
    expK: "02 — المسار", expT: "الخبرة المهنية", now: "حالي", exp: [
      ["مهندس برمجيات", "Graviton Solutions", "أكتوبر 2025 — الآن", "خدمات خلفية وهندسة خدمات مصغرة ودمج واجهات لتطبيقات إنترنت الأشياء.", "دوام كامل · الرباط · حضوري", "Java · Microservices · APIs · IoT"],
      ["مهندس Full Stack", "Quick Livraison", "مارس 2024 — الآن", "تطوير منصة توصيل مترابطة تشمل الخدمات الخلفية وتطبيقات الجوال والأتمتة السحابية.", "دوام كامل · الدار البيضاء", "Java · Flutter · AWS · Lambda · Linux"],
      ["باحث في التكنولوجيا الحيوية", "UM6P · ائتلاف OGAMS", "مايو 2026 — الآن", "عضو في فريق مشروع MMRBGD الوطني لبيانات الصحة الواحدة الوبائية والجينومية بتنسيق INH.", "عقد محدد · الرباط · هجين", "الجينوميات · المعلوماتية الحيوية · VMware · Scripting"],
      ["مهندس Full Stack", "Orange المغرب", "فبراير — يونيو 2025", "تطوير منصة FabLab Solidaire وواجهاتها الآمنة وإدارة المستخدمين والمراقبة التقنية.", "تدريب · الرباط · حضوري", "Spring Boot · Spring Security · Angular · IoT"],
      ["مهندس Backend", "RocketDevs", "أبريل — يونيو 2024", "تطوير خدمات خلفية وتسليم ميزات ضمن فريق منتجات موزع.", "دوام كامل · عن بعد", "Backend · APIs · Node.js · تعاون"],
      ["مطور Full Stack", "DGC Partner", "يونيو 2023 — مارس 2024", "تحديث البنية التحتية وتطوير منتجات ويب في بيئة سحابية حديثة.", "دوام كامل · القنيطرة · حضوري", "Cloud-native · Laravel · React · GCP · قيادة"],
      ["مدير تطوير Full Stack", "Plum Networks", "فبراير — يوليو 2023", "إدارة الأولويات ودعم الفريق التقني والتنسيق مع العملاء في مشاريع متكاملة.", "دوام كامل · سان دييغو · عن بعد", "إدارة · هندسة · دعم تقني"],
      ["مطور", "INRA المغرب", "يوليو — نوفمبر 2022", "إنشاء BuscoPhylo لتحليل الجينومات التطورية باستخدام BUSCO للباحثين وغير المتخصصين.", "عقد محدد · الرباط · حضوري", "Python · Django · BUSCO · معلوماتية حيوية"],
      ["أخصائي معلوماتية حيوية", "INRA المغرب", "فبراير — يوليو 2022", "تطوير قاعدة بيانات SSR لدعم التحليل الجيني وتنظيم بيانات الميكروساتلايت.", "تدريب · الرباط · حضوري", "BioPHP · Biopython · قواعد بيانات · بحث"],
      ["مطور Full Stack", "Borderline Solutions", "أبريل — أكتوبر 2021", "إنجاز MedicalDoctorsNetwork وتطبيق Gimme Profile للأندرويد وموقع الشركة.", "تدريب · سلا · حضوري", "ويب · Android · PHP · JavaScript"],
    ],
    projectK: "03 — المشاريع", projectT: "أفكار تحولت إلى منتجات.", projects: [["MMRBGD — OGAMS", "2026", "بوابة وطنية وفق نهج صحة واحدة تجمع البيانات الوبائية والجينومية لمسببات الأمراض متعددة المقاومة في المغرب.", "الجينوميات · المعلوماتية الحيوية · منصة بيانات"], ["InterviewPal", "2025", "التحضير للمقابلات باستخدام GPT وAWS Lambda.", "GPT · AWS Lambda"], ["منصة تجارة إلكترونية", "2024", "البيع والشراء والمنتجات والمستخدمون والمدفوعات.", "Stripe · Full stack"], ["نظام CRM لمركز اتصال", "2023", "إدارة العملاء ببنية اتصالات CTI.", "Twilio API · CRM"], ["BriefAI", "2023", "تطبيق مفتوح المصدر لتلخيص النصوص باستخدام GPT-4 وواجهة React متجاوبة.", "GPT-4 · React · Tailwind CSS"], ["ChessAI", "2023", "لعبة شطرنج على الويب ضد ذكاء اصطناعي بخوارزمية minimax.", "JavaScript · خوارزميات · ذكاء اصطناعي"], ["EmotionDetector", "2023", "اكتشاف مشاعر الوجه لحظياً من بث الفيديو.", "Python · رؤية حاسوبية"], ["BuscoPhylo", "2022", "تحليل الجينومات التطورية لغير المتخصصين.", "Python · Django · BUSCO"]], visit: "زيارة المشروع", consortium: "ائتلاف منسق من طرف INH",
    blogK: "04 — المدونة", blogT: "أفكار وقرارات وممارسات.", blogIntro: "مئة مقال عملي حول الأنظمة الخلفية والسحابة والتسليم والمعلوماتية الحيوية والقيادة التقنية.", blogAll: "استكشف 100 مقال", blogRead: "اقرأ",
    skillsK: "05 — الخبرات", skillsT: "مجموعة تقنية متكاملة.", skills: [["الخلفية واللغات", "Java · Python · TypeScript · PHP · Dart · SQL · Bash"], ["الأطر والجوال", "Spring Boot · Spring Security · React · Angular · Node.js · Laravel · Flutter"], ["السحابة وDevOps", "AWS · GCP · Docker · Kubernetes · Jenkins · Linux · CI/CD"], ["الهندسة", "Microservices · APIs · أنظمة موزعة · Cloud-native · أتمتة"], ["البيانات والبحث", "الجينوميات · المعلوماتية الحيوية · Biopython · BUSCO · تعلم الآلة · قواعد البيانات"], ["قيادة المنتج", "إدارة الفرق · التخطيط · تعاون العملاء · تحليل الأعمال · مراقبة الجودة"]], pubK: "منشور علمي", pubT: "BuscoPhylo — Scientific Reports", pub: "مؤلف مشارك في منشور دولي يقدم خادم ويب لتحليل الجينومات التطورية باستخدام BUSCO.", eduK: "06 — التعليم", eduT: "التعليم والشهادات", certT: "شهادات مختارة", allCreds: "عرض جميع الشهادات 25", degrees: [["دبلوم مهندس دولة MIAGE", "École High-Tech", "2023—2025"], ["ماجستير MIAGE", "Université Claude Bernard Lyon 1", "2023—2025"], ["تقني متخصص في تطوير البرمجيات", "Pro-Systems، سلا", "2020—2022"], ["دبلوم DEUST في العلوم", "FST المحمدية", "2019—2021"]], contactK: "07 — تواصل", contactT: "لنبنِ شيئاً متيناً.", contact: "لديك منتج تريد إطلاقه، أو بنية تحتاج إلى تطوير، أو فريق تقني تريد تعزيزه؟ لنتحدث.", write: "راسلني", place: "سلا، المغرب", footer: "صُمم بعناية، من الخادم إلى أصغر بكسل.",
  },
} as const;

const certs = [
  { name: "Programming for the Internet of Things Project", issuer: "University of California, Irvine", issued: "Mar. 2025", mark: "IoT", href: "https://www.coursera.org/account/accomplishments/verify/1F73XO37Z13A" },
  { name: "Generative AI for Everyone", issuer: "DeepLearning.AI", issued: "Mar. 2025", mark: "AI", href: "https://www.coursera.org/account/accomplishments/verify/4T6X7DHE05KZ" },
  { name: "Attendance Hashgraph Developer", issuer: "The Hashgraph Association", issued: "Mar. 2025", mark: "HBR", href: "https://certs.hashgraphdev.com/0a912979-a156-4b20-9d27-41c8ceaf4d66.pdf" },
  { name: "DevOps on AWS: Code, Build, and Test", issuer: "Amazon Web Services", issued: "Feb. 2025", mark: "AWS", href: "https://www.coursera.org/account/accomplishments/verify/9NBK0HO3EOTZ" },
  { name: "Python Project for Data Engineering", issuer: "IBM", issued: "Feb. 2025", mark: "IBM", href: "https://www.coursera.org/account/accomplishments/verify/9MOTA2355GX8" },
  { name: "Introduction to Data Engineering", issuer: "IBM", issued: "Feb. 2025", mark: "DATA", href: "https://www.coursera.org/account/accomplishments/verify/8I4BIS408XZL" },
  { name: "ISO 27001 Cybersecurity Risk Management", issuer: "LinkedIn Learning", issued: "Jul. 2023", mark: "ISO", href: "https://www.linkedin.com/learning/certificates/2ad012632837b0c8cea2af3cb269843e333cc0e2e64620fb1fffe827e756d40f/" },
  { name: "Machine Learning Introduction for Everyone", issuer: "IBM", issued: "May 2023", mark: "ML", href: "https://www.coursera.org/account/accomplishments/verify/UQ67LYS678J7" },
] as const;
const companyVisuals = [
  { logo: "/brands/graviton.svg", label: "GS", className: "brand-graviton" },
  { logo: "/brands/quick-livraison.png", label: "QL", className: "brand-quick" },
  { logo: "/brands/um6p.png", label: "UM6P", className: "brand-mmrbgd" },
  { logo: "/brands/orange.svg", label: "OM", className: "brand-orange" },
  { logo: "/brands/rocketdevs.jpeg", label: "RD", className: "brand-rocketdevs" },
  { logo: "/brands/digicall-partner.jpg", label: "DP", className: "brand-digicall" },
  { logo: "/brands/plum-networks.png", label: "PN", className: "brand-plum" },
  { logo: "/brands/inra.jpeg", label: "INRA", className: "brand-inra" },
  { logo: "/brands/inra.jpeg", label: "INRA", className: "brand-inra" },
  { logo: "/brands/borderline-solutions.jpg", label: "BS", className: "brand-borderline" },
];
const experienceLinks: readonly ({ organization: string; project?: string } | null)[] = [
  { organization: "https://graviton.ma/" },
  { organization: "https://quicklivraison.ma/" },
  { organization: "https://www.um6p.ma/", project: "https://moroccomrbgd.net/" },
  { organization: "https://www.orange.ma/" },
  { organization: "https://rocketdevs.com/" },
  null,
  { organization: "https://plumnetworks.co.uk/" },
  { organization: "https://www.inra.org.ma/", project: "https://buscophylo.inra.org.ma/" },
  { organization: "https://www.inra.org.ma/" },
  null,
];
const degreeVisuals = [
  { logo: "/brands/hightech.png", label: "HT", className: "" },
  { logo: "/brands/lyon1.svg", label: "L1", className: "" },
  { logo: "/brands/prosystems.jpg", label: "PS", className: "degree-prosystems" },
  { logo: "/brands/fstm.jpg", label: "FST", className: "" },
];
const projectLinks = ["https://moroccomrbgd.net/", null, null, null, "https://github.com/alaesahbou/BriefAI", "https://alaesahbou.github.io/chessAI/", "https://github.com/alaesahbou/EmotionDetector", "https://buscophylo.inra.org.ma/"] as const;
const projectSymbols = [null, "⌁", "↗", "◉", "AI", "♞", "◌", "⌘"] as const;
const consortiumPartners = [
  { name: "INH", logo: "/brands/inh.jpeg" },
  { name: "UM6P", logo: "/brands/um6p.png" },
  { name: "MASCIR", logo: "/brands/mascir.jpeg" },
  { name: "IAV Hassan II", logo: "/brands/iav-hassan-ii.jpeg" },
  { name: "INRA", logo: "/brands/inra.jpeg" },
  { name: "ONSSA / AMPA", logo: "/brands/onssa.png" },
] as const;
const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/in/alae-eddine-sahbou/" },
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/alaesahbou/" },
  { name: "Facebook", icon: FaFacebookF, href: "https://web.facebook.com/alae.sa.3" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/alaesa2001" },
] as const;
const languageLevels = {
  fr: [["Arabe", "Langue maternelle"], ["Français", "Professionnel"], ["Anglais", "Professionnel"]],
  en: [["Arabic", "Native"], ["French", "Professional"], ["English", "Professional"]],
  ar: [["العربية", "اللغة الأم"], ["الفرنسية", "مستوى مهني"], ["الإنجليزية", "مستوى مهني"]],
} as const;
const latestArticles = [
  { slug: "from-developer-to-technical-leader", title: "From Developer to Technical Leader", date: "Aug 18, 2026", category: "Engineering Leadership", image: "/blog/leadership.jpg" },
  { slug: "automating-technical-documentation-with-ai", title: "Automating Technical Documentation With AI", date: "Aug 1, 2026", category: "AI & Automation", image: "/blog/ai.jpg" },
  { slug: "fair-data-principles-for-genomic-platforms", title: "FAIR Data Principles for Genomic Platforms", date: "Jul 15, 2026", category: "Bioinformatics", image: "/blog/bioinformatics.jpg" },
] as const;

export default function Home({ initialLang = "en" }: { initialLang?: Lang }) {
  const lang = initialLang; const [theme, setTheme] = useState<Theme>(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light"); const [menuOpen, setMenuOpen] = useState(false); const t = content[lang];
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  const links = ["about", "experience", "projects", "blog", "contact"];
  const languagePaths: Record<Lang, string> = { en: "/", fr: "/fr", ar: "/ar" };
  return <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
    <header><a className="logo" href="#top" aria-label="Alae-Eddine Sahbou — home" onClick={()=>setMenuOpen(false)}>AS<span>.</span></a><nav id="primary-navigation" className={menuOpen?"mobile-open":""} aria-label="Primary navigation">{t.nav.map((n,i)=><a key={n} href={`#${links[i]}`} onClick={()=>setMenuOpen(false)}>{n}</a>)}</nav><div className="controls"><div className="langs" aria-label="Language selector">{(["en","fr","ar"] as Lang[]).map(x=><a href={withBasePath(languagePaths[x])} className={lang===x?"on":""} aria-current={lang===x?"page":undefined} hrefLang={x} onClick={()=>localStorage.setItem("lang",x)} key={x}>{x.toUpperCase()}</a>)}</div><button className="theme" aria-label="Toggle color theme" onClick={()=>setTheme(theme==="light"?"dark":"light")}>◐</button><button className={`menu-toggle ${menuOpen?"open":""}`} type="button" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button></div></header>
    <section className="hero wrap" id="top"><div><p className="kicker"><i/>{t.eyebrow}</p><h1>{t.title1}<br/><em>{t.title2}</em></h1><p className="intro">{t.intro}</p><div className="actions"><a className="primary" href="#projects">{t.explore}<b>↘</b></a><a href={withBasePath("/alae-eddine-sahbou-cv.pdf")} download>{t.cv}<b>↓</b></a></div></div><div className="portrait"><img src={withBasePath("/alae-eddine-sahbou-profile.jpeg")} alt="Alae-Eddine Sahbou"/><span className="portrait-frame" aria-hidden="true"/><div className="portrait-label"><b>Backend</b><span>Cloud · Systems</span></div><small>{`{ build; scale; lead; }`}</small></div><p className="available"><i/>{t.available}</p></section>
    <section className="stats"><div className="wrap">{t.stats.map(([a,b])=><div key={b}><strong>{a}</strong><span>{b}</span></div>)}</div></section>
    <section className="section wrap about" id="about"><div><p className="kicker">{t.profileK}</p><h2>{t.profileT}</h2></div><div><p className="bigcopy">{t.profile}</p>{t.values.map(([a,b],i)=><article className="value" key={a}><span>0{i+1}</span><div><h3>{a}</h3><p>{b}</p></div></article>)}</div></section>
    <section className="section experience" id="experience"><div className="wrap"><div className="experience-heading"><div><p className="kicker">{t.expK}</p><h2>{t.expT}</h2></div><div className="experience-total"><strong>10</strong><span>2021—2026</span></div></div><div className="timeline">{t.exp.map(([a,b,c,d,e,f],i)=>{const visual=companyVisuals[i];const links=experienceLinks[i];return <article className={i<3?"current-role":""} key={b+a}><span className="job-index">{String(i+1).padStart(2,"0")}</span><div className={`company-mark ${visual.className}`} aria-hidden="true">{visual.logo?<img src={withBasePath(visual.logo)} alt=""/>:visual.label}</div><div className="role-copy"><div className="role-line"><h3>{a}</h3>{i<3&&<i>{t.now}</i>}</div><p className="company-name">{links?.organization?<a href={links.organization} target="_blank" rel="noreferrer">{b}<span aria-hidden="true">↗</span></a>:b}</p><p className="job-context">{e}</p><p className="job-description">{d}</p><div className="job-skills" aria-label="Related skills">{f.split(" · ").map((skill)=><span key={skill}>{skill}</span>)}</div>{links?.project&&<a className="experience-project" href={links.project} target="_blank" rel="noreferrer">{i===2?"MMRBGD":"BuscoPhylo"}<b>↗</b></a>}</div><time>{c}</time></article>})}</div></div></section>
    <section className="section wrap" id="projects"><p className="kicker">{t.projectK}</p><h2>{t.projectT}</h2><div className="projects">{t.projects.map(([a,b,c,d],i)=><article className={i===0?"featured-project":""} key={a}><div className="top"><span>0{i+1}</span><span>{b}</span></div><div className={`symbol ${i===0?"project-logo":""}`}>{i===0?<img src={withBasePath("/brands/mmrbgd-logo.jpg")} alt="MMRBGD"/>:projectSymbols[i]}</div><h3>{a}</h3><p>{c}</p>{i===0&&<div className="consortium"><span>{t.consortium}</span><div className="consortium-logos">{consortiumPartners.map(({name,logo})=><div key={name}><img src={withBasePath(logo)} alt=""/><b>{name}</b></div>)}</div></div>}<div className="project-meta"><small>{d}</small>{projectLinks[i]&&<a className="project-link" href={projectLinks[i]} target="_blank" rel="noreferrer" aria-label={`${t.visit}: ${a}`}>{t.visit}<b>↗</b></a>}</div></article>)}</div></section>
    <section className="section home-blog" id="blog"><div className="wrap"><div className="home-blog-heading"><div><p className="kicker">{t.blogK}</p><h2>{t.blogT}</h2></div><div><p>{t.blogIntro}</p><Link href="/blog">{t.blogAll}<b>↗</b></Link></div></div><div className="home-blog-grid">{latestArticles.map((post)=><article key={post.slug}><Link className="home-blog-image" href={`/blog/${post.slug}`}><img src={withBasePath(post.image)} alt="" width="1200" height="675" loading="lazy"/></Link><p className="blog-card-meta"><span>{post.category}</span><time>{post.date}</time></p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><Link className="home-blog-read" href={`/blog/${post.slug}`}>{t.blogRead}<b>↗</b></Link></article>)}</div></div></section>
    <section className="section expertise"><div className="wrap skillgrid"><div><p className="kicker">{t.skillsK}</p><h2>{t.skillsT}</h2></div><div>{t.skills.map(([a,b])=><article className="skill" key={a}><h3>{a}</h3><p>{b}</p></article>)}</div></div><div className="wrap publication"><div><p className="kicker">{t.pubK}</p><h3><a href="https://buscophylo.inra.org.ma/" target="_blank" rel="noreferrer">{t.pubT}<span>↗</span></a></h3><p>{t.pub}</p></div><strong>2022</strong></div></section>
    <section className="section wrap education-section"><p className="kicker">{t.eduK}</p><h2>{t.eduT}</h2><div className="education"><div className="degree-list">{t.degrees.map(([a,b,c],i)=>{const visual=degreeVisuals[i];return <article className={`degree ${visual.className}`} key={a}><div className={`degree-mark ${visual.logo?"has-logo":""}`} aria-hidden="true">{visual.logo?<img src={withBasePath(visual.logo)} alt=""/>:visual.label}</div><div className="degree-copy"><h3>{a}</h3><p>{b}</p></div><span>{c}</span></article>})}</div><aside className="cert-panel"><div className="cert-head"><span>25</span><h3>{t.certT}</h3></div>{certs.map((cert)=><a className="certificate" href={cert.href} target="_blank" rel="noreferrer" key={cert.name}><span className="cert-mark">{cert.mark}</span><p><strong>{cert.name}</strong><small>{cert.issuer} · {cert.issued}</small></p><b>↗</b></a>)}<a className="all-credentials" href="https://www.linkedin.com/in/alae-eddine-sahbou/details/certifications/" target="_blank" rel="noreferrer">{t.allCreds}<b>↗</b></a></aside></div><div className="languages-row">{languageLevels[lang].map(([name,level],i)=><article key={name}><span>0{i+1}</span><div><h3>{name}</h3><p>{level}</p></div><i><b/></i></article>)}</div></section>
    <section className="contact" id="contact"><div className="wrap"><p className="kicker">{t.contactK}</p><h2>{t.contactT}</h2><p>{t.contact}</p><a href="mailto:alae.shb147@gmail.com"><span>{t.write}</span><span>↗</span></a><div className="social-links" aria-label="Social profiles">{socialLinks.map(({name,icon:Icon,href})=><a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`${name} profile`}><span className="social-icon"><Icon aria-hidden="true" focusable="false"/></span><span>{name}</span><b>↗</b></a>)}</div><div className="meta"><span>alae.shb147@gmail.com</span><span>+212 6 53 42 25 57</span><span>{t.place}</span></div></div></section>
    <footer className="wrap"><a className="logo" href="#top">AS<span>.</span></a><p>{t.footer}</p><p>© 2026 Alae-Eddine Sahbou</p></footer>
  </main>;
}
