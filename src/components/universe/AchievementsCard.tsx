import { Trophy } from "lucide-react";
import { achievements, experience } from "@/data/universe";

export function AchievementsCard() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40">Highlights</div>
        <div className="text-lg font-semibold text-white">Achievements & roles</div>
      </div>
      <div className="grid flex-1 gap-2 sm:grid-cols-2">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="group rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-orange-400/30 hover:bg-orange-400/[0.05]"
          >
            <div className="flex items-center gap-2">
              <Trophy className="h-3.5 w-3.5 text-orange-300" />
              <div className="text-sm font-medium text-white">{a.title}</div>
            </div>
            <div className="mt-1 text-[11px] text-white/50">{a.detail}</div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {experience.map((e) => (
          <span
            key={e.role}
            title={`${e.role} — ${e.body}`}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/70"
          >
            {e.role}
          </span>
        ))}
      </div>
    </div>
  );
}
