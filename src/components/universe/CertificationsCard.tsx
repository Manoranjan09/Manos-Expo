import { ExternalLink, Award, ShieldCheck, FileCheck2 } from "lucide-react";
import { certifications } from "@/data/universe";

export function CertificationsCard() {
  const featured = certifications.filter((cert) => cert.featured);
  const others = certifications.filter((cert) => !cert.featured);

  return (
    <div className="flex h-full flex-col gap-4 text-white">
      {/* Header */}
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/40">
          Credentials
        </div>

        <div className="mt-1 flex items-center gap-2">
          <Award className="h-5 w-5 text-orange-300" />

          <h2 className="text-xl font-semibold text-white">
            Certifications & Credentials
          </h2>
        </div>

        <p className="mt-1 text-xs text-white/45">
          Verified certifications, technical learning and professional credentials.
        </p>
      </div>

      {/* Featured certifications */}
      {featured.length > 0 && (
        <div className="grid gap-3">
          {featured.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              featured
            />
          ))}
        </div>
      )}

      {/* Other certifications */}
      {others.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {others.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-1.5 text-[10px] text-white/30">
          <ShieldCheck className="h-3 w-3 text-emerald-400/70" />
          Credentials available for verification
        </div>

        <div className="text-[10px] uppercase tracking-[0.18em] text-white/20">
          {certifications.length} Credentials
        </div>
      </div>
    </div>
  );
}

function CertificateCard({
  certificate,
  featured = false,
}: {
  certificate: (typeof certifications)[number];
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400/20 hover:bg-white/[0.045] ${
        featured ? "shadow-[0_0_40px_rgba(249,115,22,0.06)]" : ""
      }`}
    >
      {/* Orange hover glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-orange-500/0 blur-3xl transition-all duration-500 group-hover:bg-orange-500/15" />

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div
          className={`grid shrink-0 place-items-center rounded-xl border border-orange-400/20 bg-orange-400/10 text-orange-300 ${
            featured ? "h-12 w-12" : "h-10 w-10"
          }`}
        >
          {featured ? (
            <Award className="h-5 w-5" />
          ) : (
            <FileCheck2 className="h-4 w-4" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h3
                className={`font-semibold text-white ${
                  featured ? "text-base" : "text-sm"
                }`}
              >
                {certificate.name}
              </h3>

              <div className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-orange-300/70">
                {certificate.issuer}
              </div>
            </div>

            <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] text-white/45">
              {certificate.year}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-white/50">
              {certificate.category}
            </span>

            {featured && (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-300/80">
                Featured
              </span>
            )}
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-white/50">
            {certificate.description}
          </p>

          {/* Google Drive button */}
          <a
  href={certificate.link}
  target="_blank"
  rel="noreferrer"
  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-black shadow-[0_8px_25px_-10px_rgba(255,255,255,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/90"
>
  <ExternalLink className="h-3 w-3" />
  View Certificate
</a>
        </div>
      </div>
    </div>
  );
}