import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useState } from "react";
import { projects } from "@/data/universe";

export function ProjectsCard() {
  const [active, setActive] = useState(projects[0].id);
  const [expanded, setExpanded] = useState(false);

  const p = projects.find((x) => x.id === active) ?? projects[0];

  return (
    <div id="projects" className="flex h-full min-w-0 flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">
            Selected work · live
          </div>
          <div className="text-lg font-semibold text-white">
            Engineering projects
          </div>
        </div>

        <a
          className="shrink-0 rounded-full border border-white/10 p-2 text-white/60 transition hover:border-orange-400/30 hover:text-white"
          href="https://github.com/Manoranjan09"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <SiGithub className="h-4 w-4" />
        </a>
      </div>

      {/* Project selector */}
      <div className="flex flex-wrap gap-1.5">
        {projects.map((pr) => (
          <button
            key={pr.id}
            onClick={() => {
              setActive(pr.id);
              setExpanded(false);
            }}
            aria-pressed={active === pr.id}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition ${
              active === pr.id
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {pr.logo && (
              <img
                src={pr.logo}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 shrink-0 rounded-full object-contain"
              />
            )}
            <span>{pr.name}</span>
          </button>
        ))}
      </div>

      {/* Selected project case study */}
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.accent}`}
      >
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_70%_-20%,oklch(1_0_0/0.15),transparent_50%)]" />

        <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-[0.06]">
          {Array.from({ length: 72 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>

        <div className="relative flex h-full min-w-0 flex-col justify-between gap-4 p-5">
          {/* Project identity */}
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">
              Case study
            </div>

            <div className="mt-3 flex min-w-0 items-center gap-3">
              {p.logo && (
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-black/20 p-2 shadow-lg backdrop-blur-md sm:h-16 sm:w-16">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <h3 className="min-w-0 break-words text-2xl font-semibold text-white">
                {p.name}
              </h3>
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              {p.tagline}
            </p>
          </div>

          {/* Expanded case study */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid gap-2 text-xs text-white/70 sm:grid-cols-2"
              >
                <Detail label="Architecture" value={p.architecture} />
                <Detail label="Challenges" value={p.challenges} />
                <Detail label="Lessons" value={p.lessons} />
                <Detail label="Future" value={p.future} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Technology tags and actions */}
          <div className="flex min-w-0 flex-wrap items-end justify-between gap-3">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[10px] text-white/70 backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur transition hover:bg-black/50"
              >
                {expanded ? "Less" : "Case study"}
                <ChevronDown
                  className={`h-3 w-3 transition ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              <a
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black transition hover:bg-white/90"
                href={p.live}
                target="_blank"
                rel="noreferrer"
              >
                Live
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-2.5 backdrop-blur">
      <div className="text-[9px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
      <div className="mt-1 leading-snug text-white/80">{value}</div>
    </div>
  );
}