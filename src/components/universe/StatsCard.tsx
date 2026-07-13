import { codingProfiles } from "@/data/universe";
import { ArrowUpRight } from "lucide-react";

export function StatsCard() {
  const cells = Array.from({ length: 7 * 20 }).map((_, i) => {
    // Pseudo-stable pattern, denser toward the right (recent activity)
    const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const v = Math.abs(seed);
    return Math.min(1, v + i / 200);
  });
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Signals</div>
          <div className="text-lg font-semibold text-white">Coding profiles</div>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">
          ● active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {codingProfiles.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-orange-400/30 hover:bg-orange-400/[0.05]"
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
              {p.name}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="mt-1 text-xl font-semibold text-white">{p.value}</div>
            <div className="text-[10px] text-white/50">{p.sub}</div>
          </a>
        ))}
      </div>

      <div className="mt-auto">
        <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
          <span>GitHub contributions</span>
          <span className="text-white/60">120+ this year</span>
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
          {cells.map((v, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-[3px]"
              style={{
                background:
                  v > 0.75
                    ? "oklch(0.78 0.18 55)"
                    : v > 0.5
                      ? "oklch(0.6 0.14 55 / 0.7)"
                      : v > 0.25
                        ? "oklch(0.4 0.08 55 / 0.5)"
                        : "oklch(1 0 0 / 0.06)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
