import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download, Rocket, Zap, Bot, Cloud, Brain, Smartphone } from "lucide-react";
import { profile } from "@/data/universe";

const collabs = [
  { icon: Rocket, label: "AI Products" },
  { icon: Zap, label: "Full Stack Apps" },
  { icon: Bot, label: "AI Automation" },
  { icon: Cloud, label: "SaaS Platforms" },
  { icon: Brain, label: "GenAI Solutions" },
  { icon: Smartphone, label: "Modern Web" },
];

const availability = [
  "Internship Opportunities",
  "Full-Time Roles",
  "Freelance Projects",
  "Open Source Collaboration",
  "AI Product Development",
];

function MagneticCard({ icon: Icon, label, i }: { icon: any; label: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: 0.05 * i, duration: 0.45, ease: "easeOut" }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setT({ x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.25 });
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
      animate={{ x: t.x, y: t.y }}
      whileHover={{ scale: 1.04 }}
      className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 backdrop-blur-xl transition hover:border-orange-400/40 hover:bg-orange-400/[0.06] hover:shadow-[0_10px_40px_-10px_oklch(0.74_0.18_50/0.55)]"
    >
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-orange-300 group-hover:bg-orange-500/15">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm text-white/85">{label}</span>
    </motion.div>
  );
}

export function FinalChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex h-full flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-orange-300/80">Final Chapter</div>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Now, Let's Build <span className="accent-gradient">Yours.</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">
          You've explored my projects, journey, education, and the experiences that shaped me. Whether
          you're building an AI product, scaling a startup, hiring engineers, or just looking for someone
          who enjoys solving meaningful problems — I'd love to hear your story. Let's create something
          extraordinary together.
        </p>
      </motion.div>

      {/* Collab cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {collabs.map((c, i) => (
          <MagneticCard key={c.label} icon={c.icon} label={c.label} i={i} />
        ))}
      </div>

      {/* Availability + CTA */}
      <div className="grid gap-3 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-white">Currently Available</span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {availability.map((a) => (
              <li key={a} className="flex items-center gap-2 text-xs text-white/60">
                <span className="h-1 w-1 rounded-full bg-orange-400" /> {a}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40">Ready when you are</div>
            <div className="mt-1 text-sm text-white/70">One message can start something great.</div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                else window.location.href = `mailto:${profile.links.email}`;
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2.5 text-sm font-medium text-black shadow-[0_10px_30px_-10px_oklch(0.74_0.18_50/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_oklch(0.74_0.18_50/0.9)]"
            >
              Start a Conversation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <a
              href={profile.links.resume}
              download="Manoranjan_Kumar_Resume.pdf"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90 transition hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-orange-400/[0.06]"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quote */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="mt-auto border-l-2 border-orange-400/60 pl-4"
      >
        <p className="text-sm italic leading-relaxed text-white/70">
          "Great software isn't just written. It's crafted with curiosity, consistency, and purpose."
        </p>
        <footer className="mt-1 text-[11px] uppercase tracking-widest text-white/40">
          — Manoranjan Kumar
        </footer>
      </motion.blockquote>
    </div>
  );
}
