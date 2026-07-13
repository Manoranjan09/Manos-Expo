import { timeline } from "@/data/universe";
import { motion } from "framer-motion";

export function TimelineCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40">Roadmap</div>
        <div className="text-lg font-semibold text-white">My journey</div>
      </div>
      <ol className="relative flex-1 space-y-3 overflow-y-auto pr-2">
        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-orange-400/60 via-white/10 to-transparent" />
        {timeline.map((t, i) => (
          <motion.li
            key={t.year + t.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative pl-6"
          >
            <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-orange-400/40 bg-orange-400/20 shadow-[0_0_12px_oklch(0.78_0.18_55_/_0.6)]" />
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-orange-300">{t.year}</span>
              <span className="text-sm font-medium text-white">{t.title}</span>
            </div>
            <p className="mt-0.5 text-xs leading-relaxed text-white/55">{t.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
