import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { profile, projects, education, achievements } from "@/data/universe";
import { JarvisLabel } from "./JarvisLabel";

type Msg = { from: "user" | "ai"; text: string; actions?: { label: string; href?: string; event?: string }[] };

const suggestions = [
  "Who is Manoranjan?",
  "Tell me about Gym OS",
  "Explain FitMind AI",
  "Show resume",
  "Open GitHub",
  "How do I contact you?",
  "What are you building now?",
  "Show achievements",
];

function reply(q: string): Msg {
  const s = q.toLowerCase();
  if (/who|about|yourself|manor/.test(s))
    return { from: "ai", text: `${profile.name} — ${profile.role}. Based in ${profile.location}.\n\n${profile.bio}`, actions: [{ label: "Download Resume", href: profile.links.resume }] };
  if (/gym\s*os|gymos/.test(s)) {
    const p = projects.find(p => p.id === "gym-os")!;
    return { from: "ai", text: `${p.name} — ${p.tagline}\n\nStack: ${p.stack.join(", ")}\n\nArchitecture: ${p.architecture}`, actions: [{ label: "Open Live", href: p.live }] };
  }
  if (/fitmind|fit\s*mind/.test(s)) {
    const p = projects.find(p => p.id === "fitmind-ai")!;
    return { from: "ai", text: `${p.name} — ${p.tagline}\n\nArchitecture: ${p.architecture}\nLesson: ${p.lessons}`, actions: [{ label: "Open Live", href: p.live }] };
  }
  if (/ssc/.test(s)) {
    const p = projects.find(p => p.id === "ssc-prep")!;
    return { from: "ai", text: `${p.name} — ${p.tagline}`, actions: [{ label: "Open Live", href: p.live }] };
  }
  if (/medora|hospital/.test(s)) {
    const p = projects.find(p => p.id === "medora")!;
    return { from: "ai", text: `${p.name} — ${p.tagline}`, actions: [{ label: "Open Live", href: p.live }] };
  }
  if (/lend|loan|finance/.test(s)) {
    const p = projects.find(p => p.id === "lendflow")!;
    return { from: "ai", text: `${p.name} — ${p.tagline}`, actions: [{ label: "Open Live", href: p.live }] };
  }
  if (/project/.test(s))
    return { from: "ai", text: `I ship real products:\n\n${projects.map(p => `• ${p.name} — ${p.tagline}`).join("\n\n")}` };
  if (/resume|cv/.test(s))
    return { from: "ai", text: "Here's my resume — ATS-friendly.", actions: [{ label: "Download PDF", href: profile.links.resume }] };
  if (/github/.test(s)) return { from: "ai", text: "Opening my GitHub.", actions: [{ label: "github.com/Manoranjan09", href: profile.links.github }] };
  if (/linkedin/.test(s)) return { from: "ai", text: "My LinkedIn.", actions: [{ label: "Open LinkedIn", href: profile.links.linkedin }] };
  if (/leetcode/.test(s)) return { from: "ai", text: "Active on LeetCode as @manoranjan507.", actions: [{ label: "Open LeetCode", href: "https://leetcode.com/u/manoranjan507/" }] };
  if (/contact|email|reach|hire/.test(s))
    return { from: "ai", text: `Fastest way — email me:\n${profile.links.email}\nOr call: ${profile.links.phone}`, actions: [{ label: "Email me", href: `mailto:${profile.links.email}` }] };
  if (/education|college|cgpa|university/.test(s))
    return { from: "ai", text: `${education.university}\n${education.degree}\n${education.duration}\nCGPA · ${education.cgpa}` };
  if (/achieve|award|cert/.test(s))
    return { from: "ai", text: achievements.map(a => `★ ${a.title} — ${a.detail}`).join("\n") };
  if (/building|now|current/.test(s))
    return { from: "ai", text: "Right now: scaling Gym OS, exploring AI agents & RAG systems, contributing to open source, and prepping for graduation 2026." };
  if (/skill|stack|tech/.test(s))
    return { from: "ai", text: "AI · Python · FastAPI · LangChain · Groq · React · Next.js · TypeScript · Tailwind · Firebase · PostgreSQL · Docker · Vercel" };
  if (/terminal/.test(s)) { return { from: "ai", text: "Opening terminal — type `help` there.", actions: [{ label: "Open terminal", event: "terminal:open" }] }; }
  if (/matrix/.test(s)) { return { from: "ai", text: "🕶 There is no spoon.", actions: [{ label: "Enter matrix", event: "ee:matrix" }] }; }
  return { from: "ai", text: "I can tell you about my projects, education, stack, achievements, or how to contact me. Try one of the suggestions ↓" };
}

export function AssistantOrb() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
const [thinking, setThinking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "ai", text: `Hi, I'm ${profile.name.split(" ")[0]}'s assistant. Ask me anything about him.` },
  ]);
  const [q, setQ] = useState("");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);

  const send = (text: string) => {
  if (!text.trim()) return;

  setMsgs((m) => [...m, { from: "user", text }]);
  setQ("");

  setThinking(true);

  setTimeout(() => {
    setMsgs((m) => [...m, reply(text)]);
    setThinking(false);
  }, 600);
};

  return (
    <>
     <motion.button
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
  onClick={() => setOpen((o) => !o)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  aria-label="Open Assistant"
  className="fixed bottom-6 right-6 z-[85] flex h-20 w-20 items-center justify-center rounded-full"
>
  
  {/* Glow */}
  <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl" />

  {/* OUTER SEGMENT */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 18,
      ease: "linear",
    }}
    className="absolute h-20 w-20 rounded-full"
    style={{
      background:
        "conic-gradient(from 0deg,#f97316 0deg,#f97316 45deg,transparent 45deg 90deg,#fb923c 90deg 140deg,transparent 140deg 210deg,#f97316 210deg 260deg,transparent 260deg 360deg)",
      WebkitMask:
        "radial-gradient(circle,transparent 63%,black 64%)",
      mask:
        "radial-gradient(circle,transparent 63%,black 64%)",
    }}
  />

  {/* SECOND RING */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{
      repeat: Infinity,
      duration: 9,
      ease: "linear",
    }}
    className="absolute h-16 w-16 rounded-full"
    style={{
      background:
        "conic-gradient(#fb923c 0deg,#fb923c 25deg,transparent 25deg 70deg,#f97316 70deg 120deg,transparent 120deg 360deg)",
      WebkitMask:
        "radial-gradient(circle,transparent 70%,black 71%)",
      mask:
        "radial-gradient(circle,transparent 70%,black 71%)",
    }}
  />

  {/* Scanner Ring */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 3,
      ease: "linear",
    }}
    className="absolute h-12 w-12 rounded-full border border-orange-400/40"
  >
    <div className="absolute left-1/2 top-0 h-2 w-[2px] -translate-x-1/2 bg-orange-300 shadow-[0_0_10px_#fb923c]" />
  </motion.div>

  {/* Pulse Ring */}
  <motion.div
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.4, 0, 0.4],
    }}
    transition={{
      repeat: Infinity,
      duration: 2,
    }}
    className="absolute h-8 w-8 rounded-full border border-orange-400"
  />

  {/* Core */}
  <motion.div
    animate={{
      scale: [1, 1.15, 1],
      boxShadow: [
        "0 0 12px #f97316",
        "0 0 28px #fb923c",
        "0 0 12px #f97316",
      ],
    }}
    transition={{
      repeat: Infinity,
      duration: 1.6,
    }}
    className="relative h-5 w-5 rounded-full bg-gradient-to-br from-orange-300 to-orange-600"
  />

  {/* Orbit Dot */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{
      repeat: Infinity,
      duration: 5,
      ease: "linear",
    }}
    className="absolute h-14 w-14"
  >
    <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-orange-300 shadow-[0_0_12px_#fb923c]" />
  </motion.div>
</motion.button>
<JarvisLabel
    hovered={hovered}
    open={open}
    thinking={thinking}
/>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-strong fixed bottom-24 right-6 z-[86] flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-orange-400 shadow-[0_0_10px_oklch(0.78_0.18_55)]" />
                <div>
                  <div className="text-sm font-semibold text-white">JARVIS · Assistant</div>
                  <div className="text-[10px] text-white/50">trained on Manoranjan</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[86%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    m.from === "user" ? "bg-white text-black" : "border border-white/10 bg-white/[0.04] text-white/85"
                  }`}>
                    {m.text}
                    {m.actions && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.actions.map(a => a.href ? (
                          <a key={a.label} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-full border border-orange-400/40 bg-orange-400/10 px-2.5 py-0.5 text-[11px] text-orange-200 hover:bg-orange-400/20">{a.label}</a>
                        ) : (
                          <button key={a.label} onClick={() => a.event && window.dispatchEvent(new CustomEvent(a.event))} className="rounded-full border border-orange-400/40 bg-orange-400/10 px-2.5 py-0.5 text-[11px] text-orange-200 hover:bg-orange-400/20">{a.label}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={end} />
            </div>
            <div className="border-t border-white/5 px-3 py-2">
              <div className="mb-2 flex flex-wrap gap-1">
                {suggestions.slice(0, 4).map(s => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60 hover:bg-white/10 hover:text-white">{s}</button>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(q); }} className="flex items-center gap-2">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about me…" className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-orange-400/40" />
                <button className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black hover:bg-white/90"><Send className="h-4 w-4" /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
