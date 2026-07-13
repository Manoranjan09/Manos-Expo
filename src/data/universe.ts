import profileImage from "@/assets/profile.jpeg";
import gallery1 from "@/assets/gallery-1.jpg";

import prof1 from "@/assets/prof-1.jpg";
import prof2 from "@/assets/prof-2.jpg";
import prof3 from "@/assets/prof-3.jpg";

import college1 from "@/assets/college-1.jpg";
import college2 from "@/assets/college-2.jpg";
import college3 from "@/assets/college-3.jpg";
import college4 from "@/assets/college-4.jpg";

import travel1 from "@/assets/travel-1.jpg";
import travel2 from "@/assets/travel-2.jpg";
import travel3 from "@/assets/travel-3.jpg";
import travel4 from "@/assets/travel-4.jpg";

import nature1 from "@/assets/nature-1.jpg";
import nature2 from "@/assets/nature-2.jpg";
import nature3 from "@/assets/nature-3.jpg";
import nature4 from "@/assets/nature-4.jpg";

import resume from "@/assets/resume.pdf";

export const site = {
  name: "Manoranjan OS",
  version: "v1.0",
  subtitle: "Personal Digital Universe",
};

export const profile = {
  name: "Manoranjan Kumar",
  role: "AI Engineer · Full Stack Developer · Product Builder",
  location: "Chandigarh · Mohali · Kharar, India",
  status: "Available for Internships, Full-Time, Freelance & Open Source",
  availability: "Open to opportunities",
  avatar: profileImage,
  heading: {
    line1: "Engineering ideas",
    line2: "into products people love.",
  },
  bio: "Computer Science Engineering student passionate about Artificial Intelligence, Full Stack Development, and building products that solve real-world problems. I enjoy transforming ideas into scalable applications using modern technologies like React, Next.js, FastAPI, Firebase, LangChain, and Generative AI. My goal is to build software that is not only functional but also beautifully designed and impactful.",
  stats: [
    { label: "Years Coding", value: "3+" },
    { label: "Projects Built", value: "20+" },
    { label: "Live Products", value: "6+" },
    { label: "Overall CGPA", value: "7.53" },
    { label: "GitHub Contributions", value: "120+" },
    { label: "Engineering Journey", value: "2022–26" },
  ],
  links: {
    email: "manoranjank6203@gmail.com",
    phone: "+91 6203198958",
    github: "https://github.com/Manoranjan09",
    linkedin: "http://linkedin.com/in/manoranjan-kumar-a15109266",
    portfolio: "https://manosportfolio.vercel.app/",
    instagram: "https://www.instagram.com/manoranjan_009",
    resume: resume,
  },
  cta: {
    primary: { label: "Explore My Universe", target: "#projects" },
    secondary: { label: "Download Resume", target: resume },
  },
};

export const projects = [
  {
    id: "gym-os",
    name: "Gym OS",
    tagline:
      "AI-powered Gym Management Platform — memberships, attendance, billing, QR check-ins, analytics, and complete gym administration.",
    stack: ["React", "TypeScript", "Vite", "TailwindCSS", "shadcn/ui", "FastAPI", "Firebase", "PostgreSQL", "TanStack Query"],
    live: "https://gym-os-flame.vercel.app/",
    github: "https://github.com/Manoranjan09",
    architecture: "React + Vite SPA, FastAPI service layer, Firebase auth, PostgreSQL for billing & memberships, TanStack Query for caching.",
    challenges: "Designing QR-based check-ins with realtime presence and reconciling membership billing edge cases.",
    lessons: "Strong contracts between frontend and FastAPI made iteration painless; cache invalidation is still hard.",
    future: "Add AI trainer recommendations, native mobile companion, automated WhatsApp reminders.",
    accent: "from-orange-500/40 to-rose-500/20",
  },
  {
    id: "fitmind-ai",
    name: "FitMind AI",
    tagline:
      "AI-powered Fitness SaaS — intelligent workout generation, conversational AI coach, tracking, and personalized recommendations.",
    stack: ["Next.js", "TypeScript", "FastAPI", "LangChain", "Firebase", "Groq", "Tailwind CSS"],
    live: "https://fitmind-ai-drab.vercel.app/",
    github: "https://github.com/Manoranjan09",
    architecture: "Next.js App Router, FastAPI + LangChain orchestration, Groq LLM, Firebase realtime sync for streaks & analytics.",
    challenges: "Keeping LLM responses grounded in user fitness history without bloating prompt tokens.",
    lessons: "Treat the LLM as a planner, not a brain — small tools + structured state beats huge prompts.",
    future: "Wearable integration, nutrition coach, voice-first workout sessions.",
    accent: "from-amber-400/40 to-orange-500/10",
  },
  {
    id: "ssc-prep",
    name: "AI SSC Preparation Platform",
    tagline:
      "RAG-powered SSC learning platform — doubt solving, quiz generation, personalized roadmaps, and adaptive practice.",
    stack: ["Next.js", "FastAPI", "LangChain", "HuggingFace", "Firebase", "TailwindCSS"],
    live: "https://clean-frontend-ssc-prep.vercel.app/",
    github: "https://github.com/Manoranjan09",
    architecture: "RAG pipeline over curated SSC corpus, HuggingFace embeddings, ChromaDB vector store, Firebase auth & streaks.",
    challenges: "Chunking dense exam material so retrieval surfaced the right context for short, exam-style questions.",
    lessons: "Evaluation harnesses for RAG quality matter more than the model choice.",
    future: "Adaptive difficulty engine, regional language support, mock test simulator.",
    accent: "from-violet-500/40 to-indigo-500/10",
  },
  {
    id: "medora",
    name: "Medora Hospital Management",
    tagline:
      "Full-stack hospital platform with appointments, patient management, emergency services, doctor dashboards, and AI-assisted workflows.",
    stack: ["React", "TypeScript", "FastAPI", "Firebase", "TailwindCSS"],
    live: "https://hospital-dental.vercel.app/login",
    github: "https://github.com/Manoranjan09",
    architecture: "React + TS frontend, FastAPI domain services, Firebase for auth & realtime updates across roles.",
    challenges: "Role-based dashboards (patient, doctor, admin) without duplicating UI primitives.",
    lessons: "A shared design system pays for itself the moment you ship the second role.",
    future: "Tele-consultation, AI triage assistant, medical records OCR.",
    accent: "from-emerald-400/40 to-teal-500/10",
  },
  {
    id: "lendflow",
    name: "LendFlow AI",
    tagline:
      "Loan & finance management platform with intelligent dashboards, customer tracking, payment analytics, and modern UI.",
    stack: ["React", "FastAPI", "PostgreSQL", "TypeScript", "TailwindCSS"],
    live: "https://lendflow-mocha.vercel.app/",
    github: "https://github.com/Manoranjan09",
    architecture: "React dashboard, FastAPI service, PostgreSQL ledger with views for analytics & repayment timelines.",
    challenges: "Designing accurate repayment schedules with partial / late payments.",
    lessons: "Money math demands explicit decimal types end to end.",
    future: "Risk scoring model, automated reminders, multi-tenant SaaS.",
    accent: "from-cyan-400/40 to-blue-500/10",
  },
];

export const stack = {
  center: "AI",
  inner: ["Python", "FastAPI", "LangChain", "HuggingFace", "OpenAI", "Groq"],
  middle: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Vite", "shadcn/ui"],
  outer: ["Firebase", "PostgreSQL", "MySQL", "Git", "GitHub", "Linux", "Vercel", "Docker"],
};

export type TechCategory = "AI" | "Frontend" | "Backend" | "Database" | "Cloud" | "DevOps" | "Tools";

export type Tech = {
  name: string;
  short: string;
  category: TechCategory;
  ring: "inner" | "middle" | "outer";
  level: 1 | 2 | 3 | 4 | 5;
  years: string;
  projects: string[];
  why: string;
  color: string;
};

export const technologies: Tech[] = [
  // Inner — AI / Backend core
  { name: "Python", short: "Py", category: "Backend", ring: "inner", level: 5, years: "3+ yrs", projects: ["fitmind-ai", "ssc-prep", "gym-os", "medora"], why: "Fastest way from idea to working AI prototype.", color: "#facc15" },
  { name: "FastAPI", short: "FA", category: "Backend", ring: "inner", level: 5, years: "2+ yrs", projects: ["gym-os", "fitmind-ai", "ssc-prep", "medora", "lendflow"], why: "Type-safe, async, and effortless to deploy.", color: "#22d3ee" },
  { name: "LangChain", short: "LC", category: "AI", ring: "inner", level: 4, years: "1.5+ yrs", projects: ["fitmind-ai", "ssc-prep"], why: "Compose LLMs, tools, and memory cleanly.", color: "#a78bfa" },
  { name: "HuggingFace", short: "HF", category: "AI", ring: "inner", level: 4, years: "1.5+ yrs", projects: ["ssc-prep"], why: "The open-source home of modern ML.", color: "#fbbf24" },
  { name: "Groq", short: "Gq", category: "AI", ring: "inner", level: 4, years: "1+ yr", projects: ["fitmind-ai"], why: "Blazing-fast inference for real-time UX.", color: "#fb7185" },
  { name: "OpenAI", short: "AI", category: "AI", ring: "inner", level: 4, years: "2+ yrs", projects: ["fitmind-ai", "ssc-prep"], why: "The reliable planner behind agent workflows.", color: "#34d399" },

  // Middle — Frontend
  { name: "React", short: "Re", category: "Frontend", ring: "middle", level: 5, years: "3+ yrs", projects: ["gym-os", "medora", "lendflow"], why: "Composability I can build my career on.", color: "#38bdf8" },
  { name: "Next.js", short: "Nx", category: "Frontend", ring: "middle", level: 5, years: "2+ yrs", projects: ["fitmind-ai", "ssc-prep"], why: "SSR, routing and DX out of the box.", color: "#e5e7eb" },
  { name: "TypeScript", short: "TS", category: "Frontend", ring: "middle", level: 5, years: "2+ yrs", projects: ["gym-os", "medora", "lendflow"], why: "Refactoring without fear.", color: "#60a5fa" },
  { name: "JavaScript", short: "JS", category: "Frontend", ring: "middle", level: 5, years: "3+ yrs", projects: ["gym-os", "medora", "lendflow", "fitmind-ai"], why: "The language of the web I grew up with.", color: "#fde047" },
  { name: "TailwindCSS", short: "Tw", category: "Frontend", ring: "middle", level: 5, years: "2+ yrs", projects: ["gym-os", "medora", "lendflow", "fitmind-ai", "ssc-prep"], why: "Design velocity without leaving the markup.", color: "#22d3ee" },
  { name: "Vite", short: "Vt", category: "Tools", ring: "middle", level: 5, years: "2+ yrs", projects: ["gym-os", "medora", "lendflow"], why: "Instant HMR spoiled me forever.", color: "#c084fc" },
  { name: "shadcn/ui", short: "sh", category: "Frontend", ring: "middle", level: 4, years: "1+ yr", projects: ["gym-os", "medora", "lendflow"], why: "Own your components, keep the polish.", color: "#f472b6" },

  // Outer — Infra
  { name: "Firebase", short: "Fb", category: "Cloud", ring: "outer", level: 5, years: "2+ yrs", projects: ["gym-os", "medora", "fitmind-ai", "ssc-prep"], why: "Auth + realtime in minutes.", color: "#fb923c" },
  { name: "PostgreSQL", short: "Pg", category: "Database", ring: "outer", level: 4, years: "1.5+ yrs", projects: ["gym-os", "lendflow"], why: "Relational sanity + JSON when needed.", color: "#60a5fa" },
  { name: "MySQL", short: "My", category: "Database", ring: "outer", level: 3, years: "1+ yr", projects: [], why: "Where I first learned to think in tables.", color: "#38bdf8" },
  { name: "Git", short: "Gt", category: "Tools", ring: "outer", level: 5, years: "3+ yrs", projects: [], why: "My time machine.", color: "#f97316" },
  { name: "GitHub", short: "Gh", category: "Tools", ring: "outer", level: 5, years: "3+ yrs", projects: [], why: "120+ contributions and counting.", color: "#e5e7eb" },
  { name: "Linux", short: "Lx", category: "DevOps", ring: "outer", level: 4, years: "2+ yrs", projects: [], why: "The environment I actually think in.", color: "#fbbf24" },
  { name: "Docker", short: "Dk", category: "DevOps", ring: "outer", level: 3, years: "1+ yr", projects: ["gym-os"], why: "Ship once, run anywhere.", color: "#38bdf8" },
  { name: "Vercel", short: "Vc", category: "Cloud", ring: "outer", level: 5, years: "2+ yrs", projects: ["gym-os", "medora", "lendflow", "fitmind-ai", "ssc-prep"], why: "Push to main, ship to the world.", color: "#e5e7eb" },
];

export const education = {
  university: "Chandigarh University",
  degree: "Bachelor of Engineering · Computer Science",
  duration: "August 2022 — June 2026",
  cgpa: "7.53",
  semesters: [
    { sem: "1", gpa: 7.46 },
    { sem: "2", gpa: 7.54 },
    { sem: "3", gpa: 7.12 },
    { sem: "4", gpa: 8.05 },
    { sem: "5", gpa: 8.06 },
    { sem: "6", gpa: 7.70 },
    { sem: "7", gpa: 6.69 },
    { sem: "8", gpa: 7.25 },
  ],
};

export const timeline = [
  { year: "2004", title: "Born", body: "Where the story begins." },
  { year: "2022", title: "Started BE CSE", body: "Joined Chandigarh University, Computer Science Engineering." },
  { year: "2023", title: "Full Stack Development", body: "First real web apps; fell in love with React and shipping." },
  { year: "2024", title: "Entered Generative AI", body: "Built the AI SSC Platform, earned NPTEL Elite certification." },
  { year: "2025", title: "Year of Shipping", body: "Built FitMind AI, Medora, Gym OS · started freelancing · served as Class Representative (7th sem)." },
  { year: "2026", title: "Graduation", body: "Looking for Software Engineering and AI opportunities." },
  { year: "→", title: "The future", body: "Build impactful AI products used by millions." },
];

export const experience = [
  { role: "Engineering Student", org: "Chandigarh University", body: "BE CSE · building, learning, shipping." },
  { role: "Personal Projects", org: "Self-directed", body: "5+ live products across AI, SaaS, and healthcare." },
  { role: "Freelancer", org: "Independent", body: "Designing and building AI-powered web apps for clients." },
  { role: "Open Source Contributor", org: "GitHub", body: "Contributing to and maintaining AI / web tooling." },
];

export const codingProfiles = [
  { name: "GitHub", value: "120+", sub: "contributions · some private repos", href: "https://github.com/Manoranjan09" },
  { name: "LeetCode", value: "Active", sub: "@manoranjan507", href: "https://leetcode.com/u/manoranjan507/" },
  { name: "Live Products", value: "6+", sub: "shipped to production", href: "#projects" },
  { name: "Projects", value: "20+", sub: "personal + freelance", href: "#projects" },
];

export const achievements = [
  { title: "Class Representative", detail: "7th Semester · Chandigarh University" },
  { title: "NPTEL Elite Certification", detail: "Multi-Core Computer Architecture — IIT Guwahati" },
  { title: "Production-grade AI SaaS", detail: "FitMind AI, Gym OS, Medora, SSC Prep" },
  { title: "Multiple Live Deployments", detail: "5+ products shipped on Vercel" },
  { title: "120+ GitHub Contributions", detail: "Consistent open-source activity" },
  { title: "Blockchain Programs", detail: "Infosys Springboard · Metacrafters · CU" },
];

export const beyond = [
  { icon: "♟", label: "Chess", note: "Tactical mind, calm play." },
  { icon: "🧩", label: "Rubik's Cube", note: "Pattern recognition therapy." },
  { icon: "🏔", label: "Travel", note: "Mountains over malls." },
  { icon: "🎵", label: "Music", note: "Lo-fi while shipping, classics on long drives." },
  { icon: "☕", label: "Coffee", note: "Fuel and ritual." },
  { icon: "📸", label: "Photography", note: "Frames I'd want to remember." },
  { icon: "🌄", label: "Mountains", note: "Where I think clearest." },
  { icon: "📚", label: "Learning", note: "A new idea every week." },
];

export const nowBuilding = [
  { name: "Gym OS", note: "Scaling memberships, billing, and analytics." },
  { name: "AI Agents", note: "Tool-using, memory-aware micro-agents." },
  { name: "RAG Applications", note: "Production-quality retrieval pipelines." },
  { name: "Modern SaaS Platforms", note: "Polished products for real users." },
  { name: "Open Source", note: "Small PRs, real impact." },
];

export const gallery: { src: string; alt: string; category: string; aspect?: string }[] = [
  { src: prof1, alt: "Formal portrait", category: "Professional", aspect: "aspect-[3/4]" },
  { src: prof2, alt: "At Chandigarh University — APJ Abdul Kalam mural", category: "Professional", aspect: "aspect-[3/4]" },
  { src: prof3, alt: "Campus walk", category: "Professional", aspect: "aspect-[3/4]" },
  { src: college1, alt: "University Institute of Pharma — Chandigarh University", category: "College", aspect: "aspect-[4/3]" },
  { src: college2, alt: "Chandigarh University entrance road", category: "College", aspect: "aspect-[3/4]" },
  { src: college3, alt: "One last time — hostel days", category: "College", aspect: "aspect-[3/4]" },
  { src: college4, alt: "Project exhibition — Accident Detection & Emergency System", category: "College", aspect: "aspect-[3/4]" },
  { src: travel1, alt: "Winding mountain road in the hills", category: "Travel", aspect: "aspect-[3/4]" },
  { src: travel2, alt: "Ganges river bank, Rishikesh", category: "Travel", aspect: "aspect-[4/3]" },
  { src: travel3, alt: "Himalayan waterfall trek", category: "Travel", aspect: "aspect-[3/4]" },
  { src: travel4, alt: "Hillside cafe at sunset", category: "Travel", aspect: "aspect-[3/4]" },
  { src: nature1, alt: "Snow-capped Himalayas, Manali", category: "Nature", aspect: "aspect-[4/3]" },
  { src: nature2, alt: "Deodar cedar forest canopy", category: "Nature", aspect: "aspect-[3/4]" },
  { src: nature3, alt: "Pink dusk over the mountains", category: "Nature", aspect: "aspect-[4/3]" },
  { src: nature4, alt: "Green light through the trees", category: "Nature", aspect: "aspect-[3/4]" },
  { src: gallery1, alt: "Chess at Love of Pizza", category: "Coffee", aspect: "aspect-[3/4]" },
  { src: profileImage, alt: "Café portrait", category: "Professional", aspect: "aspect-[3/4]" },
];
