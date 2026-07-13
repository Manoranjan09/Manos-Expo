import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Global easter eggs — listens for typed sequences and dispatched events.
 *   matrix        → green matrix rain
 *   coffee        → steam takeover
 *   sudo hire-me  → access granted toast
 *   future        → roadmap 2026 → 2035
 *   konami        → ↑↑↓↓←→←→BA retro mode
 */
export function EasterEggs() {
  const [matrix, setMatrix] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [granted, setGranted] = useState(false);
  const [future, setFuture] = useState(false);
  const [retro, setRetro] = useState(false);

  // keystroke buffer
  const buf = useRef("");
  const konami = useRef<string[]>([]);
  const KONAMI = ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const k = e.key.toLowerCase();
      buf.current = (buf.current + k).slice(-20);
      if (buf.current.endsWith("matrix")) setMatrix(true);
      if (buf.current.endsWith("coffee")) setCoffee(true);
      if (buf.current.endsWith("future")) setFuture(true);
      if (buf.current.endsWith("sudohireme") || buf.current.endsWith("hire me") || buf.current.endsWith("hireme")) setGranted(true);
      konami.current = [...konami.current, k].slice(-KONAMI.length);
      if (konami.current.join(",") === KONAMI.join(",")) setRetro(true);
    };
    const onMatrix = () => setMatrix(true);
    const onCoffee = () => setCoffee(true);
    const onFuture = () => setFuture(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ee:matrix", onMatrix);
    window.addEventListener("ee:coffee", onCoffee);
    window.addEventListener("ee:future", onFuture);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ee:matrix", onMatrix);
      window.removeEventListener("ee:coffee", onCoffee);
      window.removeEventListener("ee:future", onFuture);
    };
  }, []);

  // auto-dismiss
  useEffect(() => { if (matrix) { const t = setTimeout(() => setMatrix(false), 6000); return () => clearTimeout(t); } }, [matrix]);
  useEffect(() => { if (coffee) { const t = setTimeout(() => setCoffee(false), 4500); return () => clearTimeout(t); } }, [coffee]);
  useEffect(() => { if (granted) { const t = setTimeout(() => setGranted(false), 4000); return () => clearTimeout(t); } }, [granted]);
  useEffect(() => { if (retro) { document.documentElement.classList.add("retro-mode"); const t = setTimeout(() => { setRetro(false); document.documentElement.classList.remove("retro-mode"); }, 6000); return () => clearTimeout(t); } }, [retro]);

  return (
    <>
      <AnimatePresence>{matrix && <MatrixRain />}</AnimatePresence>
      <AnimatePresence>{coffee && <CoffeeSteam />}</AnimatePresence>
      <AnimatePresence>{granted && <AccessGranted />}</AnimatePresence>
      <AnimatePresence>{future && <FutureRoadmap onClose={() => setFuture(false)} />}</AnimatePresence>
      <AnimatePresence>{retro && <RetroBanner />}</AnimatePresence>
    </>
  );
}

function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!;
    c.width = window.innerWidth; c.height = window.innerHeight;
    const cols = Math.floor(c.width / 14);
    const drops = Array(cols).fill(1);
    const chars = "アイウエオカキクケコサシスセソタチツテトナ01ManoranjanOS<>{}/\\";
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.fillStyle = "#22c55e";
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <motion.canvas
      ref={ref}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[200]"
    />
  );
}

function CoffeeSteam() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-amber-900/20 via-transparent to-transparent" />
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: "100vh", x: `${(i * 4.2) % 100}vw`, opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.6, 0], scale: [0.6, 2.5, 3.5] }}
          transition={{ duration: 4 + Math.random() * 2, delay: i * 0.08, ease: "easeOut" }}
          className="absolute h-32 w-32 rounded-full bg-white/10 blur-2xl"
        />
      ))}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-6xl">☕</div>
    </motion.div>
  );
}

function AccessGranted() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] grid place-items-center bg-black/60 backdrop-blur-sm"
    >
      <div className="rounded-3xl border-2 border-green-400/50 bg-black/80 px-10 py-8 text-center shadow-[0_0_80px_oklch(0.75_0.2_150_/_0.6)]">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-green-400/80">System</div>
        <div className="mt-3 font-mono text-4xl font-bold text-green-300">ACCESS GRANTED</div>
        <div className="mt-2 text-sm text-white/70">Recruiters Welcome ✅</div>
        <a href="mailto:manoranjank6203@gmail.com" className="mt-4 inline-block rounded-full bg-green-400 px-4 py-1.5 text-xs font-semibold text-black">Email Manoranjan</a>
      </div>
    </motion.div>
  );
}

const ROADMAP = [
  { year: "2026", body: "Graduate · first full-time role · ship a personal product to 1k users." },
  { year: "2027", body: "Lead an AI product team · deep-dive into agentic systems." },
  { year: "2028", body: "Launch an indie AI SaaS · first paying customers." },
  { year: "2030", body: "Scale to 100k+ users · build a small team." },
  { year: "2032", body: "Publish research or product that reshapes a domain." },
  { year: "2035", body: "Run an AI-first company that people love." },
];

function FutureRoadmap({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] grid place-items-center bg-black/70 p-6 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong w-full max-w-3xl rounded-3xl p-8"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-orange-300">The Roadmap</div>
        <div className="mt-1 text-3xl font-semibold text-white">2026 → 2035</div>
        <div className="mt-6 space-y-3">
          {ROADMAP.map((r, i) => (
            <motion.div key={r.year} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="font-mono text-orange-300">{r.year}</div>
              <div className="text-sm text-white/80">{r.body}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function RetroBanner() {
  return (
    <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }}
      className="fixed left-1/2 top-6 z-[200] -translate-x-1/2 rounded-full border-2 border-pink-400 bg-black px-5 py-2 font-mono text-xs text-pink-300 shadow-[0_0_40px_#ec4899]">
      ↑↑↓↓←→←→ B A · RETRO MODE ENGAGED
    </motion.div>
  );
}
