import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/universe";

export function EducationCard() {
  const max = 10;
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Education</div>
          <div className="text-lg font-semibold text-white">{education.university}</div>
          <div className="text-[11px] text-white/50">
            {education.degree} · {education.duration}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-1 text-xs text-orange-300">
          <GraduationCap className="h-3 w-3" />
          CGPA {education.cgpa}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-8 items-end gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        {education.semesters.map((s, i) => {
          const h = (s.gpa / max) * 100;
          return (
            <div key={s.sem} className="flex flex-col items-center gap-1">
              <div className="relative flex h-[110px] w-full items-end justify-center">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-md bg-gradient-to-t from-orange-500/70 to-orange-300/40"
                />
                <div className="absolute -top-4 text-[9px] font-mono text-white/70">{s.gpa}</div>
              </div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">S{s.sem}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
