import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Download, Sparkles } from "lucide-react";
import { profile } from "@/data/universe";

export function HeroCard() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-[0_10px_30px_-10px_oklch(0.78_0.18_55)] ring-1 ring-white/15"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-[#0b0b10] bg-emerald-400 shadow-[0_0_12px_oklch(0.78_0.18_150)]" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              🟢 {profile.status}
            </div>
            <div className="truncate text-xl font-semibold text-gradient">{profile.name}</div>
            <div className="truncate text-[11px] text-white/50">{profile.role}</div>
          </div>
        </div>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/60 sm:flex">
          <MapPin className="h-3 w-3" /> {profile.location}
        </div>
      </div>

      <div>
        <h1 className="text-[clamp(1.8rem,3.2vw,3rem)] font-semibold leading-[1.05] tracking-tight text-white">
          {profile.heading.line1}<br />
          <span className="accent-gradient">{profile.heading.line2}</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">{profile.bio}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          href={profile.cta.primary.target}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-[0_10px_30px_-10px_white]"
        >
          {profile.cta.primary.label}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
        <motion.a
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          href={profile.links.resume}
          target="_blank"
          rel="noreferrer"
          download
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <Download className="h-4 w-4 text-orange-400" />
          {profile.cta.secondary.label}
        </motion.a>
        <span className="hidden items-center gap-1.5 text-[11px] text-white/40 sm:inline-flex">
          <Sparkles className="h-3 w-3 text-orange-400" /> Press ⌘K to explore
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-white/5 pt-4 sm:grid-cols-6">
        {profile.stats.map((s) => (
          <div key={s.label} className="min-w-0">
            <div className="text-lg font-semibold text-white">{s.value}</div>
            <div className="truncate text-[10px] uppercase tracking-wider text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
