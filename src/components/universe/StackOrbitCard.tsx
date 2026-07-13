import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { technologies, projects as allProjects, type Tech, type TechCategory } from "@/data/universe";

const CATEGORIES: ("All" | TechCategory)[] = [
  "All",
  "Frontend",
  "Backend",
  "AI",
  "Database",
  "Cloud",
  "DevOps",
  "Tools",
];

const RING_RADIUS: Record<Tech["ring"], number> = { inner: 60, middle: 105, outer: 155 };
const RING_DURATION: Record<Tech["ring"], number> = { inner: 38, middle: 62, outer: 92 };
const RING_REVERSE: Record<Tech["ring"], boolean> = { inner: false, middle: true, outer: false };

function Planet({
  tech,
  index,
  count,
  paused,
  dimmed,
  highlighted,
  onHover,
  onLeave,
  onClick,
}: {
  tech: Tech;
  index: number;
  count: number;
  paused: boolean;
  dimmed: boolean;
  highlighted: boolean;
  onHover: (t: Tech, pos: { x: number; y: number }) => void;
  onLeave: () => void;
  onClick: (t: Tech) => void;
}) {
  const radius = RING_RADIUS[tech.ring];
  const duration = RING_DURATION[tech.ring];
  const reverse = RING_REVERSE[tech.ring];
  const delay = -((index / count) * duration);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="absolute inset-0 grid place-items-center"
      style={{
        animation: `orb-spin ${duration}s linear infinite`,
        animationDirection: reverse ? "reverse" : "normal",
        animationDelay: `${delay}s`,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      <div style={{ transform: `translateX(${radius}px)` }}>
        <div
          style={{
            animation: `orb-spin ${duration}s linear infinite`,
            animationDirection: reverse ? "normal" : "reverse",
            animationDelay: `${delay}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <motion.button
            ref={ref}
            onPointerEnter={() => {
              const r = ref.current?.getBoundingClientRect();
              if (r) onHover(tech, { x: r.left + r.width / 2, y: r.top });
            }}
            onPointerLeave={onLeave}
            onClick={() => onClick(tech)}
            whileHover={{ scale: 1.35 }}
            animate={{
              opacity: dimmed ? 0.2 : 1,
              scale: highlighted ? 1.35 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-[10px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/15"
            style={{
              boxShadow: highlighted
                ? `0 0 24px ${tech.color}, 0 0 4px ${tech.color}`
                : `0 0 10px ${tech.color}55`,
            }}
            aria-label={tech.name}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${tech.color}55, transparent 70%)`,
              }}
            />
            <span className="relative">{tech.short}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export function StackOrbitCard() {
  const [filter, setFilter] = useState<"All" | TechCategory>("All");
  const [hover, setHover] = useState<{ tech: Tech; x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<Tech | null>(null);
  const [coreTaps, setCoreTaps] = useState(0);
  const [supernova, setSupernova] = useState(false);

  const shown = useMemo(
    () => technologies.filter((t) => filter === "All" || t.category === filter),
    [filter],
  );
  const byRing = useMemo(() => {
    const groups: Record<Tech["ring"], Tech[]> = { inner: [], middle: [], outer: [] };
    for (const t of shown) groups[t.ring].push(t);
    return groups;
  }, [shown]);

  const stats = useMemo(() => {
    const by = (c: TechCategory) => technologies.filter((t) => t.category === c).length;
    return [
      { label: "Total", value: technologies.length },
      { label: "AI", value: by("AI") },
      { label: "Frontend", value: by("Frontend") },
      { label: "Backend", value: by("Backend") },
    ];
  }, []);

  const handleCoreTap = () => {
    const n = coreTaps + 1;
    setCoreTaps(n);
    if (n >= 5) {
      setSupernova(true);
      setCoreTaps(0);
      setTimeout(() => setSupernova(false), 2600);
    }
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Constellation</div>
          <div className="text-lg font-semibold text-white">Technology Solar System</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] leading-none text-white/70 backdrop-blur"
            >
              <span className="font-bold text-white">{s.value}</span>{" "}
              <span className="text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-2.5 py-0.5 text-[11px] transition ${
              filter === c
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Solar system */}
      <div className="relative mt-1 flex-1 min-h-[340px]">
        {/* Orbit rings */}
        {(["inner", "middle", "outer"] as const).map((ring) => (
          <div
            key={ring}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/5"
            style={{
              width: RING_RADIUS[ring] * 2,
              height: RING_RADIUS[ring] * 2,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Planets */}
        <motion.div
          animate={supernova ? { scale: 1.35 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="absolute inset-0"
        >
          {(["inner", "middle", "outer"] as const).map((ring) =>
            byRing[ring].map((tech, i) => (
              <Planet
                key={tech.name}
                tech={tech}
                index={i}
                count={byRing[ring].length}
                paused={hover?.tech.name === tech.name || supernova}
                dimmed={!!hover && hover.tech.name !== tech.name}
                highlighted={hover?.tech.name === tech.name}
                onHover={(t, pos) => setHover({ tech: t, x: pos.x, y: pos.y })}
                onLeave={() => setHover(null)}
                onClick={(t) => setSelected(t)}
              />
            )),
          )}
        </motion.div>

        {/* Center AI core */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.button
            onClick={handleCoreTap}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            animate={{ boxShadow: supernova ? "0 0 120px oklch(0.85 0.2 55)" : "0 0 50px oklch(0.78 0.18 55)" }}
            className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-rose-500 text-sm font-bold text-black"
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "radial-gradient(circle, oklch(0.85 0.2 55 / 0.6), transparent 60%)" }}
            />
            <span className="relative flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> AI
            </span>
          </motion.button>
        </div>

        {/* Supernova burst */}
        <AnimatePresence>
          {supernova && (
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.9 0.2 55 / 0.7), oklch(0.7 0.2 30 / 0.2) 50%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="text-center text-[10px] text-white/30">
        hover to inspect · click for details · tap AI core 5× ✨
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              left: Math.min(Math.max(hover.x - 110, 12), window.innerWidth - 232),
              top: Math.max(hover.y - 120, 12),
              zIndex: 130,
            }}
            className="pointer-events-none w-56 rounded-2xl border border-white/15 bg-black/80 p-3 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">{hover.tech.name}</div>
              <div className="text-[10px] tracking-widest text-white/50">{hover.tech.category}</div>
            </div>
            <div className="mt-1 text-[11px] text-amber-300">
              {"★".repeat(hover.tech.level)}
              <span className="text-white/100">{"★".repeat(5 - hover.tech.level)}</span>
            </div>
            <div className="mt-1 text-[11px] text-white/60">{hover.tech.years}</div>
            {hover.tech.projects.length > 0 && (
              <div className="mt-2 text-[11px] text-white/70">
                Used in{" "}
                <span className="font-semibold text-white">{hover.tech.projects.length}</span>{" "}
                {hover.tech.projects.length === 1 ? "project" : "projects"}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[140] grid place-items-end bg-black/60 backdrop-blur-md sm:place-items-center"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-t-3xl border border-white/10 bg-neutral-950/95 p-6 text-white shadow-2xl sm:rounded-3xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 text-lg font-black"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selected.color}66, transparent 70%)`,
                    boxShadow: `0 0 30px ${selected.color}55`,
                  }}
                >
                  {selected.short}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-xl font-bold">{selected.name}</div>
                  <div className="text-[11px] uppercase tracking-widest text-white/50">
                    {selected.category} · {selected.years}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Proficiency
                  </div>
                  <div className="mt-1 text-amber-300">
                    {"★".repeat(selected.level)}
                    <span className="text-white/120">{"★".repeat(5 - selected.level)}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Projects
                  </div>
                  <div className="mt-1 text-lg font-bold">{selected.projects.length}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-widest text-white/40">Why I use it</div>
                <p className="mt-1 text-sm text-white/80">{selected.why}</p>
              </div>

              {selected.projects.length > 0 && (
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    Powering these projects
                  </div>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {selected.projects.map((pid) => {
                      const p = allProjects.find((x) => x.id === pid);
                      if (!p) return null;
                      return (
                        <a
                          key={pid}
                          href={p.live}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:border-white/20 hover:bg-white/10"
                        >
                          <span className="truncate font-medium text-white">{p.name}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-white/40 group-hover:text-white" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
