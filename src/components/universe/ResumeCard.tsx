import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  Download,
  ShieldCheck,
  Expand,
  X,
  Printer,
  ExternalLink,
  Share2,
  Eye,
} from "lucide-react";
import resume from "@/assets/resume.pdf";
import { profile } from "@/data/universe";

const META = {
  name: "Manoranjan Kumar",
  title: "AI Engineer • Full Stack Developer",
  filename: "Manoranjan_Kumar_Resume.pdf",
  sizeKB: "~500",
  pages: 1,
  updated: "Latest",
};
export function ResumeCard() {
  const [open, setOpen] = useState(false);
  const url = resume;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const download = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const objUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objUrl;
      a.download = META.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objUrl), 1000);
    } catch {
      window.open(url, "_blank");
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(true)}
        className="group/resume relative flex h-full cursor-pointer flex-col gap-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
      >
        {/* orange glow on hover */}
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl bg-orange-500/0 blur-2xl transition-all duration-500 group-hover/resume:bg-orange-500/20" />

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">Document</div>
            <div className="text-lg font-semibold text-white">Latest Resume</div>
            <div className="text-[10px] text-white/50">{META.name} · {META.title}</div>
          </div>
          <div className="flex items-center gap-1.5" onClick={stop}>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/80 hover:bg-white/10"
              aria-label="Open resume"
            >
              <Expand className="h-3 w-3" /> Open
            </button>
            <button
              onClick={(e) => download(e)}
              className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-medium text-black hover:bg-orange-400"
              aria-label="Download resume PDF"
            >
              <Download className="h-3 w-3" /> PDF
            </button>
          </div>
        </div>

        <motion.div
          layoutId="resume-preview"
          className="relative flex-1 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-3"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex min-w-0 items-center gap-2">
              <FileText className="h-4 w-4 shrink-0 text-orange-300" />
              <div className="truncate text-xs text-white/70">{META.filename}</div>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5 text-[9px] text-emerald-300">
              <ShieldCheck className="h-2.5 w-2.5" /> ATS
            </div>
          </div>

          {/* real first-page preview */}
          <div className="relative mt-2 h-[180px] w-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02]">
            <iframe
              src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1`}
              title="Resume preview"
              loading="lazy"
              className="pointer-events-none h-[520px] w-full origin-top scale-[0.42] transition-transform duration-500 group-hover/resume:scale-[0.46]"
            />
            {/* Click-to-Read overlay */}
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover/resume:opacity-100">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] text-white/90 backdrop-blur">
                <Eye className="h-3 w-3" /> Click to Read
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-4 gap-2 text-center">
            <Stat v={`${META.pages}`} l="Pages" />
            <Stat v={`${META.sizeKB}KB`} l="Size" />
            <Stat v="A4" l="Format" />
            <Stat v={META.updated.split(",")[0]} l="Updated" />
          </div>
        </motion.div>
      </div>

      <FullscreenViewer open={open} onClose={() => setOpen(false)} url={url} onDownload={download} />
    </>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-black/20 p-2">
      <div className="text-sm font-semibold text-white">{v}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/40">{l}</div>
    </div>
  );
}

function FullscreenViewer({
  open,
  onClose,
  url,
  onDownload,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  onDownload: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const share = async () => {
    const shareData = { title: "Manoranjan Kumar — Resume", url: url };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch {}
  };

  const print = () => {
    const w = window.open(url, "_blank");
    w?.addEventListener("load", () => w.print());
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Toolbar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/60 px-4 py-3"
          >
            <div className="flex items-center gap-2 min-w-0">
              <FileText className="h-4 w-4 shrink-0 text-orange-300" />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{META.name} — Resume</div>
                <div className="truncate text-[10px] text-white/50">
                  {META.filename} · {META.pages} page · {META.sizeKB} KB · Updated {META.updated}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ToolBtn onClick={onDownload} icon={<Download className="h-3.5 w-3.5" />} label="Download" />
              <ToolBtn onClick={print} icon={<Printer className="h-3.5 w-3.5" />} label="Print" />
              <ToolBtn
                onClick={() => window.open(url, "_blank")}
                icon={<ExternalLink className="h-3.5 w-3.5" />}
                label="New Tab"
              />
              <ToolBtn onClick={share} icon={<Share2 className="h-3.5 w-3.5" />} label="Share" />
              <button
                onClick={onClose}
                aria-label="Close (Esc)"
                className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viewer */}
          <motion.div
            layoutId="resume-preview"
            onClick={(e) => e.stopPropagation()}
            className="mx-auto my-4 flex w-full max-w-5xl flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl"
          >
            <iframe
              src={`${url}#view=FitH&toolbar=1&navpanes=0`}
              title="Resume fullscreen"
              className="h-full w-full"
            />
          </motion.div>

          <div className="pb-3 text-center text-[10px] text-white/40">
            Press <kbd className="rounded border border-white/20 bg-white/5 px-1">Esc</kbd> to close
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ToolBtn({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/80 hover:bg-white/10"
    >
      {icon} <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// keep profile reference to preserve any indirect ties
void profile;
