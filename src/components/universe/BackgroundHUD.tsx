import { useEffect, useState } from "react";
import { GlobeHUD } from "./GlobeHUD";
import { LocationHUD } from "./LocationHUD";
import { FloatingParticles } from "./FloatingParticles";

export function BackgroundHUD() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse), (max-width: 768px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener?.("change", update);

    return () => {
      media.removeEventListener?.("change", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Ambient Glow (Keep on all devices) */}
      <div
        className="absolute right-[8%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.16), transparent 72%)",
        }}
      />

      {/* Heavy background effects - Desktop only */}
      {!isMobile && (
        <>
          <GlobeHUD />
          <FloatingParticles />
          <LocationHUD />
        </>
      )}
    </div>
  );
}