import { motion } from "framer-motion";
import { beyond } from "@/data/universe";

export function BeyondCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40">Off the keyboard</div>
        <div className="text-lg font-semibold text-white">Beyond engineering</div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
        {beyond.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            className="group flex flex-col items-start gap-1 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-orange-400/30 hover:bg-orange-400/[0.05]"
          >
            <div className="text-2xl">{b.icon}</div>
            <div className="text-sm font-medium text-white">{b.label}</div>
            <div className="text-[10px] leading-snug text-white/50">{b.note}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
