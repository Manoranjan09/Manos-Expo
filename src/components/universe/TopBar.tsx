import { useEffect, useState } from "react";
import { site } from "@/data/universe";

export function TopBar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 pt-4">
      <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/70">
        <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_10px_oklch(0.78_0.18_55)]" />
        <span className="font-medium text-white">{site.name}</span>
        <span className="hidden text-white/30 sm:inline">· {site.subtitle}</span>
        <span className="text-white/30">{site.version}</span>
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <button
          onClick={() => {
            Object.keys(localStorage)
              .filter((k) => k.startsWith("card:"))
              .forEach((k) => localStorage.removeItem(k));
            location.reload();
          }}
          className="glass rounded-full px-3 py-1.5 text-xs text-white/60 hover:text-white"
        >
          Reset layout
        </button>
        <div className="glass rounded-full px-3 py-1.5 text-xs text-white/60">⌘K · Command</div>
        <div className="glass rounded-full px-3 py-1.5 font-mono text-xs text-white/70">{time}</div>
      </div>
    </header>
  );
}
