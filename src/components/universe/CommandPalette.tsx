import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { profile, projects } from "@/data/universe";

type Item = { label: string; hint: string; href?: string; action?: () => void };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items: Item[] = [
    { label: "Download Resume", hint: "pdf", href: profile.links.resume },
    { label: `Email ${profile.links.email}`, hint: "contact", href: `mailto:${profile.links.email}` },
    { label: "GitHub · Manoranjan09", hint: "external", href: profile.links.github },
    { label: "LinkedIn", hint: "external", href: profile.links.linkedin },
    { label: "Portfolio site", hint: "external", href: profile.links.portfolio },
    { label: "Instagram", hint: "external", href: profile.links.instagram },
    ...projects.map((p) => ({ label: `Open ${p.name}`, hint: "live", href: p.live })),
    {
      label: "Reset workspace layout",
      hint: "system",
      action: () => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("card:"))
          .forEach((k) => localStorage.removeItem(k));
        location.reload();
      },
    },
  ];

  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-start justify-center px-4 pt-[18vh] backdrop-blur-md"
          style={{ background: "oklch(0 0 0 / 0.5)" }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <Search className="h-4 w-4 text-white/50" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the universe…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
              <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50">ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center text-sm text-white/40">Nothing here.</div>
              )}
              {filtered.map((i) => {
                const content = (
                  <>
                    <span>{i.label}</span>
                    <span className="flex items-center gap-2 text-xs text-white/40">
                      {i.hint}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </>
                );
                const cls =
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-white/80 hover:bg-white/[0.06]";
                if (i.href) {
                  return (
                    <a
                      key={i.label}
                      href={i.href}
                      target={i.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className={cls}
                      onClick={() => setOpen(false)}
                    >
                      {content}
                    </a>
                  );
                }
                return (
                  <button
                    key={i.label}
                    className={cls}
                    onClick={() => {
                      i.action?.();
                      setOpen(false);
                    }}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
