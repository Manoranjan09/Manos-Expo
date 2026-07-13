import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * GlassCard — draggable, tiltable, cursor-light surface.
 * Persists position to localStorage by `id`.
 */
export function GlassCard({
  id,
  className = "",
  children,
  initial,
  span = "md",
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  initial?: { x: number; y: number };
  span?: "sm" | "md" | "lg" | "xl" | "tall" | "wide";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`card:${id}`);
      if (raw) {
        const p = JSON.parse(raw);
        x.set(p.x ?? 0);
        y.set(p.y ?? 0);
      } else if (initial) {
        x.set(initial.x);
        y.set(initial.y);
      }
    } catch {}
  }, [id]);

  const persist = () => {
    try {
      localStorage.setItem(`card:${id}`, JSON.stringify({ x: x.get(), y: y.get() }));
    } catch {}
  };

  const sizeClass = {
    sm: "col-span-12 sm:col-span-6 lg:col-span-3 min-h-[220px]",
    md: "col-span-12 sm:col-span-6 lg:col-span-4 min-h-[260px]",
    lg: "col-span-12 lg:col-span-6 min-h-[320px]",
    xl: "col-span-12 lg:col-span-8 min-h-[360px]",
    tall: "col-span-12 sm:col-span-6 lg:col-span-3 row-span-2 min-h-[460px]",
    wide: "col-span-12 min-h-[280px]",
  }[span];

  const [light, setLight] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      ref={ref}
      id={id}
      drag
      dragMomentum={false}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 24 }}
      onDragEnd={persist}
      whileDrag={{ scale: 1.02, zIndex: 50 }}
      style={{ x, y, rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        mx.set(px - 0.5);
        my.set(py - 0.5);
        setLight({ x: px * 100, y: py * 100 });
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className={`group glass noise relative rounded-[28px] p-5 will-change-transform ${sizeClass} ${className}`}
    >
      {/* cursor light */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${light.x}% ${light.y}%, oklch(0.9 0.15 60 / 0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
