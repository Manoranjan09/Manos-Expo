import { GlobeHUD } from "./GlobeHUD";
import { LocationHUD } from "./LocationHUD";
import { FloatingParticles } from "./FloatingParticles";

export function BackgroundHUD() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* Ambient Glow */}
      <div
        className="absolute right-[8%] top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.16), transparent 72%)",
        }}
      />

      <GlobeHUD />

      <FloatingParticles />

      <LocationHUD />

    </div>
  );
}