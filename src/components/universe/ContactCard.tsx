import { Linkedin, Mail, Instagram, Phone, Globe, MapPin, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { profile } from "@/data/universe";

export function ContactCard() {
  const items = [
    { icon: Mail, label: "Email", href: `mailto:${profile.links.email}`, value: profile.links.email },
    { icon: Phone, label: "Phone", href: `tel:${profile.links.phone.replace(/\s/g, "")}`, value: profile.links.phone },
    { icon: SiGithub, label: "GitHub", href: profile.links.github, value: "Manoranjan09" },
    { icon: Linkedin, label: "LinkedIn", href: profile.links.linkedin, value: "manoranjan-kumar" },
    { icon: Globe, label: "Portfolio", href: profile.links.portfolio, value: "manosportfolio.vercel.app" },
    { icon: Instagram, label: "Instagram", href: profile.links.instagram, value: "@manoranjan_009" },
  ];
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-white/40">Get in touch</div>
          <div className="text-lg font-semibold text-white">Let's build something</div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-white/50">
          <MapPin className="h-3 w-3" /> {profile.location}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, href, value }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition hover:-translate-y-0.5 hover:border-orange-400/30 hover:bg-orange-400/[0.06]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-white/80 group-hover:text-orange-300">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
                <div className="truncate text-sm text-white">{value}</div>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </a>
        ))}
      </div>
    </div>
  );
}
