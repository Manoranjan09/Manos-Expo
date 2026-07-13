import { motion } from "framer-motion";
import { Linkedin, Code2, Heart } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/data/universe";

const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Gallery", href: "#gallery" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: profile.links.github, icon: SiGithub, },
  { label: "LinkedIn", href: profile.links.linkedin, icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/", icon: Code2 },
];

export function FooterSignature() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8"
    >
      {/* soft radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -z-10 h-40 opacity-70"
        style={{
          background:
            "radial-gradient(600px 200px at 50% 0%, oklch(0.74 0.18 50 / 0.15), transparent 60%)",
        }}
      />

      <div className="flex flex-col items-center gap-3 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">
          Designed & Engineered by
        </div>
        <div className="text-2xl font-semibold text-white sm:text-3xl">
          <span className="accent-gradient">Manoranjan Kumar</span>
        </div>
        <div className="text-xs text-white/50">AI Engineer • Full Stack Developer</div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/45">
          Made with <Heart className="h-3 w-3 fill-orange-400 text-orange-400" /> using React,
          TypeScript, Tailwind, Framer Motion & countless cups of coffee.
        </div>
      </div>

      {/* Nav links */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} className="story-link text-xs text-white/60 hover:text-white">
            {l.label}
          </a>
        ))}
        <span className="h-3 w-px bg-white/10" />
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="story-link inline-flex items-center gap-1 text-xs text-white/60 hover:text-white"
          >
            <s.icon className="h-3 w-3" /> {s.label}
          </a>
        ))}
      </div>

      <div className="mx-auto mt-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mt-4 flex flex-col items-center gap-1 text-center text-[11px] text-white/35">
        <div>© 2026 Manoranjan Kumar · All Rights Reserved.</div>
        <div>Built with passion. Continuously evolving.</div>
      </div>
    </motion.footer>
  );
}
