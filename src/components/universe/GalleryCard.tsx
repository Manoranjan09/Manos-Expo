import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Grid3x3, LayoutGrid, Rows3, X, ZoomIn, ZoomOut } from "lucide-react";
import { gallery } from "@/data/universe";

const categories = ["All", "Professional", "College", "Travel", "Nature", "Coffee", "Campus Life"];
type ViewMode = "masonry" | "grid" | "filmstrip";

export function GalleryCard() {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const [view, setView] = useState<ViewMode>("masonry");
  const [zoom, setZoom] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const savedScroll = useRef(0);

  const filtered = gallery.filter((g) => cat === "All" || g.category === cat);

  // Preserve scroll when lightbox opens/closes
  useEffect(() => {
    if (open !== null) {
      savedScroll.current = scrollerRef.current?.scrollTop ?? 0;
    } else if (scrollerRef.current) {
      scrollerRef.current.scrollTop = savedScroll.current;
    }
  }, [open]);

  const close = useCallback(() => {
    setOpen(null);
    setZoom(1);
  }, []);
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setOpen((o) => (o === null ? o : (o + 1) % filtered.length)),
    [filtered.length]
  );

  // Keyboard nav
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(4, z + 0.25));
      else if (e.key === "-") setZoom((z) => Math.max(1, z - 0.25));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  // Swipe on mobile
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchStart.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStart.current = null;
  };

  const download = async (src: string, alt: string) => {
    try {
      const r = await fetch(src);
      const b = await r.blob();
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${alt.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(src, "_blank");
    }
  };

  return (
    <div className="flex h-[300px] flex-col gap-3 sm:h-[360px] lg:h-[420px]">
      {/* Sticky header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Frames</div>
          <div className="text-lg font-semibold text-white">Life beyond code</div>
          <div className="mt-0.5 text-[10px] text-white/40">📷 {gallery.length} Memories</div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5">
          {(
            [
              ["masonry", LayoutGrid],
              ["grid", Grid3x3],
              ["filmstrip", Rows3],
            ] as const
          ).map(([m, Icon]) => (
            <button
              key={m}
              onClick={() => setView(m)}
              aria-label={m}
              className={`grid h-6 w-6 place-items-center rounded-full transition ${
                view === m ? "bg-white text-black" : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-2.5 py-0.5 text-[11px] transition ${
              cat === c
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Scrollable region */}
      <div
        ref={scrollerRef}
        className="gallery-scroll relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1"
      >
        {filtered.length === 0 ? (
          <div className="grid h-full place-items-center rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-white/40">
            More moments arriving soon.
          </div>
        ) : view === "filmstrip" ? (
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">
            {filtered.map((g, i) => (
              <motion.button
                key={g.src + i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.02, 0.2) }}
                onClick={() => setOpen(i)}
                className="group relative h-40 w-40 shrink-0 snap-start overflow-hidden rounded-xl border border-white/5"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <HoverMeta g={g} />
              </motion.button>
            ))}
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {filtered.map((g, i) => (
              <GalleryTile key={g.src + i} g={g} i={i} onOpen={() => setOpen(i)} square />
            ))}
          </div>
        ) : (
          <div className="columns-2 gap-2 sm:columns-3 [&>*]:mb-2">
            {filtered.map((g, i) => (
              <GalleryTile key={g.src + i} g={g} i={i} onOpen={() => setOpen(i)} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && filtered[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[120] grid place-items-center bg-black/85 p-6 backdrop-blur-md"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <motion.img
              key={filtered[open].src}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: zoom, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              src={filtered[open].src}
              alt={filtered[open].alt}
              className="max-h-[82vh] max-w-[90vw] cursor-zoom-in rounded-2xl border border-white/10 object-contain"
              style={{ transformOrigin: "center" }}
            />

            {/* Caption */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-xs text-white/80 backdrop-blur"
            >
              <span className="text-orange-300">{filtered[open].category}</span>
              <span className="mx-2 text-white/30">·</span>
              {filtered[open].alt}
              <span className="mx-2 text-white/30">·</span>
              <span className="text-white/50">
                {open + 1} / {filtered.length}
              </span>
            </div>

            {/* Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-6 top-6 flex items-center gap-2"
            >
              <IconBtn onClick={() => setZoom((z) => Math.max(1, z - 0.25))}><ZoomOut className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => setZoom((z) => Math.min(4, z + 0.25))}><ZoomIn className="h-4 w-4" /></IconBtn>
              <IconBtn onClick={() => download(filtered[open]!.src, filtered[open]!.alt)}>
                <Download className="h-4 w-4" />
              </IconBtn>
              <IconBtn onClick={close}><X className="h-4 w-4" /></IconBtn>
            </div>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
                setZoom(1);
              }}
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/80"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
                setZoom(1);
              }}
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/80"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IconBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/80"
    >
      {children}
    </button>
  );
}

type GItem = { src: string; alt: string; category: string; aspect?: string; location?: string; date?: string };

function HoverMeta({ g }: { g: GItem }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <div className="text-[10px] font-medium uppercase tracking-wider text-orange-300">{g.category}</div>
      <div className="line-clamp-1 text-[11px] text-white/90">{g.alt}</div>
      {(g.location || g.date) && (
        <div className="mt-0.5 text-[10px] text-white/60">
          {g.location}
          {g.location && g.date ? " · " : ""}
          {g.date}
        </div>
      )}
    </div>
  );
}

function GalleryTile({
  g,
  i,
  onOpen,
  square,
}: {
  g: GItem;
  i: number;
  onOpen: () => void;
  square?: boolean;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.25) }}
      whileHover={{ y: -2 }}
      onClick={onOpen}
      className="group relative block w-full overflow-hidden rounded-xl border border-white/5 hover:border-orange-400/30 hover:shadow-[0_0_24px_-6px_rgba(251,146,60,0.35)]"
    >
      <img
        src={g.src}
        alt={g.alt}
        loading="lazy"
        decoding="async"
        className={`w-full object-cover transition duration-500 group-hover:scale-110 ${
          square ? "aspect-square" : g.aspect ?? "aspect-square"
        }`}
      />
      <HoverMeta g={g} />
    </motion.button>
  );
}
