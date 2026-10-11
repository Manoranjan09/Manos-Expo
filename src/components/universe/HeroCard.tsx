import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Download,
  Sparkles,
  X,
} from "lucide-react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { profile } from "@/data/universe";

export function HeroCard() {
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!profileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [profileOpen]);

  return (
    <>
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* Clickable profile picture */}
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              aria-label="Open my personal introduction"
              title="A little more about me"
              className="group relative shrink-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-14 w-14 rounded-2xl object-cover shadow-[0_10px_30px_-10px_oklch(0.78_0.18_55)] ring-1 ring-white/15 transition duration-300 group-hover:scale-105 group-hover:ring-orange-400/60"
              />

              <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-[#0b0b10] bg-emerald-400 shadow-[0_0_12px_oklch(0.78_0.18_150)]" />

              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-orange-400/0 transition group-hover:ring-orange-400/50" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:truncate">
                🟢 {profile.status}
              </div>

              <div className="truncate text-xl font-semibold text-gradient">
                {profile.name}
              </div>

              <div className="text-[11px] text-white/50 sm:truncate">
                {profile.role}
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 sm:flex">
            <MapPin className="h-3 w-3" /> {profile.location}
          </div>
        </div>

        <div>
          <h1 className="text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-tight text-white">
            {profile.heading.line1}
            <br />
            <span className="accent-gradient">{profile.heading.line2}</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            {profile.bio}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={profile.cta.primary.target}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-[0_10px_30px_-10px_white]"
          >
            {profile.cta.primary.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            <Download className="h-4 w-4 text-orange-400" />
            {profile.cta.secondary.label}
          </motion.a>

          <span className="hidden items-center gap-1.5 text-[11px] text-white/40 sm:inline-flex">
            <Sparkles className="h-3 w-3 text-orange-400" /> Press ⌘K to explore
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 sm:grid-cols-6">
          {profile.stats.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="text-lg font-semibold text-white">{s.value}</div>
              <div className="truncate text-[10px] uppercase tracking-wider text-white/40">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal introduction popup */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setProfileOpen(false);
              }
            }}
            onTouchStart={(event) => {
              if (event.target === event.currentTarget) {
                // Allows backdrop interaction on touch devices.
              }
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-dialog-title"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111110]/95 p-6 text-center shadow-[0_0_80px_rgba(249,115,22,0.12)] sm:p-8"
            >
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-orange-500/[0.07] blur-3xl" />

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                aria-label="Close introduction"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="mx-auto w-fit rounded-full border border-orange-400/40 p-1 shadow-[0_0_35px_rgba(249,115,22,0.18)]">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-28 w-28 rounded-full object-cover ring-2 ring-white/10"
                  />
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                    {profile.availability}
                  </span>
                </div>

                <h2
                  id="profile-dialog-title"
                  className="mt-3 text-2xl font-semibold text-white"
                >
                  Hey, I'm {profile.name.split(" ")[0]} 👋
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-orange-300/90">
                  {profile.role}
                </p>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  Welcome to my digital universe! I enjoy building AI-powered
                  products, developing full-stack applications, and exploring
                  automation testing. I'm always learning, building, and turning
                  ideas into useful software.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["AI Engineering", "Full Stack", "Playwright"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-white/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3 border-t border-white/10 pt-5">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-orange-400/40 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                  </a>

                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-sky-400/40 hover:text-sky-300"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>

                  <a
                    href={profile.links.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-pink-400/40 hover:text-pink-300"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${profile.links.email}`}
                    aria-label="Email me"
                    title="Email"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-orange-100"
                  >
                    Let's connect <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                <p className="mt-5 text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Thanks for exploring Manoranjan OS
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}