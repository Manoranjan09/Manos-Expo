import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import { nowBuilding } from "@/data/universe";

export function NowBuildingCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">In flight</div>
          <div className="text-lg font-semibold text-white">Currently building</div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 text-[10px] text-orange-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-400" />
          </span>
          live
        </div>
      </div>
      <ul className="flex flex-1 flex-col gap-1.5">
        {nowBuilding.map((n, i) => (
          <motion.li
            key={n.name}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 transition hover:border-orange-400/30"
          >
            <Hammer className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-300" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-white">{n.name}</div>
              <div className="text-[11px] text-white/50">{n.note}</div>
            </div>
          </motion.li>
        ))}
      </ul>
      <div className="text-center text-[10px] uppercase tracking-[0.2em] text-white/30">
        This list grows as I do
      </div>
    </div>
  );
}
