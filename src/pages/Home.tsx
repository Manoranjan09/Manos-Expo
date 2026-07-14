import { GlassCard } from "@/components/universe/GlassCard";
import { HeroCard } from "@/components/universe/HeroCard";
import { ProjectsCard } from "@/components/universe/ProjectsCard";
import { StackOrbitCard } from "@/components/universe/StackOrbitCard";
import { TimelineCard } from "@/components/universe/TimelineCard";
import { StatsCard } from "@/components/universe/StatsCard";
import { ContactCard } from "@/components/universe/ContactCard";
import { ResumeCard } from "@/components/universe/ResumeCard";
import { EducationCard } from "@/components/universe/EducationCard";
import { AchievementsCard } from "@/components/universe/AchievementsCard";
import { BeyondCard } from "@/components/universe/BeyondCard";
import { NowBuildingCard } from "@/components/universe/NowBuildingCard";
import { BackgroundHUD } from "@/components/universe/BackgroundHUD";
import { CommandPalette } from "@/components/universe/CommandPalette";
import { FinalChapter } from "@/components/universe/FinalChapter";
import { FooterSignature } from "@/components/universe/FooterSignature";
import { TopBar } from "@/components/universe/TopBar";
import { Terminal } from "@/components/universe/Terminal";
import { AssistantOrb } from "@/components/universe/AssistantOrb";
import { EasterEggs } from "@/components/universe/EasterEggs";
import { Cursor } from "@/components/universe/Cursor";
import { JarvisLabel } from "@/components/universe/JarvisLabel";
import { useEffect, useState } from "react";


export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const media = window.matchMedia("(pointer: coarse), (max-width:768px)");
  const update = () => setIsMobile(media.matches);

  update();

  media.addEventListener?.("change", update);

  return () => media.removeEventListener?.("change", update);
}, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {!isMobile && <Cursor />}
      <EasterEggs />
      <TopBar />
      <CommandPalette />
      <Terminal />
      <AssistantOrb />
      <JarvisLabel
  hovered={false}
  open={false}
  thinking={false}
/>
      <BackgroundHUD />

<main className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-12 gap-4 [grid-auto-rows:minmax(140px,auto)]">
          <GlassCard id="hero" span="xl"><HeroCard /></GlassCard>
          <GlassCard id="stack" span="md"><StackOrbitCard /></GlassCard>

          <GlassCard id="projects" span="lg"><ProjectsCard /></GlassCard>
          <GlassCard id="timeline" span="md"><TimelineCard /></GlassCard>
          <GlassCard id="now" span="sm" className="lg:col-span-3"><NowBuildingCard /></GlassCard>

          <GlassCard id="education" span="lg"><EducationCard /></GlassCard>
          <GlassCard id="stats" span="md"><StatsCard /></GlassCard>
          <GlassCard id="resume" span="sm" className="lg:col-span-3"><ResumeCard /></GlassCard>

          <GlassCard id="achievements" span="md"><AchievementsCard /></GlassCard>
          <GlassCard id="beyond" span="xl"><BeyondCard /></GlassCard>


          <GlassCard id="contact" span="lg" className="lg:col-span-5"><ContactCard /></GlassCard>
          <GlassCard id="final" span="xl" className="lg:col-span-7"><FinalChapter /></GlassCard>
        </div>

        <FooterSignature />

        <div className="mt-6 flex flex-col items-center gap-1 pb-12 text-center">
          <div className="text-xs text-white/30">
            Drag cards · press ⌘K to search · ` for terminal · ask the orb · try typing{" "}
            <span className="font-mono text-orange-300">matrix</span>,{" "}
            <span className="font-mono text-orange-300">coffee</span>,{" "}
            <span className="font-mono text-orange-300">future</span>,{" "}
            <span className="font-mono text-orange-300">sudo hire-me</span>
          </div>

          <div className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            Manoranjan OS · An Interactive Digital Universe
          </div>
        </div>
      </main>
    </div>
  );
}