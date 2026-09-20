import { ExternalLink, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { researchPapers } from "@/data/universe";

export function ResearchCard() {
  return (
    <div className="flex h-full flex-col gap-4 text-white">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Research
            </div>

            <div className="mt-1 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-orange-300" />

              <h2 className="text-xl font-semibold text-white">
                Research & Publications
              </h2>
            </div>
          </div>

          {/* Publication badge */}
          <div className="shrink-0 rounded-full border border-orange-400/40 bg-orange-400/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-orange-300 shadow-[0_0_18px_rgba(249,115,22,0.12)]">
            {researchPapers.length} Publications
          </div>
        </div>

        <p className="mt-1 text-xs text-white/45">
          Research work and technical publications.
        </p>
      </div>

      {/* Papers */}
      <div className="grid flex-1 gap-3">
        {researchPapers.map((paper, index) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08,
              duration: 0.4,
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-400/15 bg-orange-400/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/40 hover:bg-orange-400/[0.05] hover:shadow-[0_0_30px_rgba(249,115,22,0.10)]"
          >
            {/* Subtle orange glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-500/15" />

            {/* Top */}
            <div className="relative flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange-400/25 bg-orange-400/10">
                <FileText className="h-4 w-4 text-orange-300" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold leading-snug text-white">
                  {paper.title}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full border border-orange-400/20 bg-orange-400/10 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-orange-300">
                    {paper.type}
                  </span>

                  <span className="text-[10px] text-white/35">
                    {paper.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="relative mt-3 line-clamp-2 text-[11px] leading-relaxed text-white/50">
              {paper.description}
            </p>

            {/* Footer */}
            <div className="relative mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0 truncate text-[10px] text-white/30">
                {paper.authors}
              </div>

              <a
                href={paper.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-black shadow-[0_8px_25px_-10px_rgba(255,255,255,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90"
              >
                <ExternalLink className="h-3 w-3" />
                View Paper
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <BookOpen className="h-3 w-3 text-orange-300/70" />
          Research & technical publications
        </div>

        <div className="text-[10px] uppercase tracking-[0.18em] text-white/20">
          {researchPapers.length} Papers
        </div>
      </div>
    </div>
  );
}