"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, MoveHorizontal, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

type Project = Dictionary["work"]["items"][number];

const accents: Record<string, { from: string; to: string; text: string; ring: string }> = {
  violet: {
    from: "rgba(124,92,255,0.9)",
    to: "rgba(91,108,255,0.35)",
    text: "text-brand-violet",
    ring: "ring-brand-violet/30",
  },
  cyan: {
    from: "rgba(34,211,238,0.85)",
    to: "rgba(59,130,246,0.3)",
    text: "text-brand-cyan",
    ring: "ring-brand-cyan/30",
  },
  pink: {
    from: "rgba(244,114,182,0.85)",
    to: "rgba(168,85,247,0.3)",
    text: "text-brand-pink",
    ring: "ring-brand-pink/30",
  },
  amber: {
    from: "rgba(251,191,36,0.8)",
    to: "rgba(249,115,22,0.3)",
    text: "text-brand-amber",
    ring: "ring-brand-amber/30",
  },
  emerald: {
    from: "rgba(52,211,153,0.8)",
    to: "rgba(16,185,129,0.3)",
    text: "text-brand-emerald",
    ring: "ring-brand-emerald/30",
  },
};

/**
 * Kart görseli — gerçek ürün görüntüsü.
 * Web ürünlerinde sitenin ekran görüntüsü, App Store uygulamalarında
 * marka gradyanı üzerinde gerçek uygulama ikonu gösterilir.
 */
function ProjectVisual({ project, index }: { project: Project; index: number }) {
  const accent = accents[project.accent] ?? accents.violet;

  return (
    <div className="reveal-clip relative aspect-16/10 overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-white/[0.07]">
      {project.type === "web" ? (
        <>
          <Image
            src={project.image}
            alt={`${project.title} — ekran görüntüsü`}
            fill
            sizes="(min-width: 1024px) 27rem, 90vw"
            className="object-cover object-top"
          />
          {/* Alt kenara doğru kararan bindirme — kart metnine yumuşak geçiş */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-transparent to-transparent"
          />
        </>
      ) : project.type === "client" ? (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(120% 100% at 20% 0%, ${accent.from}, transparent 55%), radial-gradient(90% 80% at 95% 100%, ${accent.to}, transparent 60%)`,
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
          {project.image ? (
            /* Gerçek marka logosu — SVG, optimizasyona gerek yok */
            <Image
              src={project.image}
              alt={`${project.title} logosu`}
              width={240}
              height={58}
              unoptimized
              className="absolute top-1/2 left-1/2 h-11 w-auto max-w-[72%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] sm:h-13"
            />
          ) : (
            /* Logosu olmayan kurumsal işler: marka adı tipografik olarak */
            <span className="absolute inset-0 flex items-center justify-center px-8 text-center font-display text-2xl font-bold tracking-tight text-white/90 sm:text-[1.65rem]">
              {project.title}
            </span>
          )}
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(120% 100% at 20% 0%, ${accent.from}, transparent 55%), radial-gradient(90% 80% at 95% 100%, ${accent.to}, transparent 60%)`,
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />

          <Image
            src={project.image}
            alt={`${project.title} uygulama simgesi`}
            width={128}
            height={128}
            className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[22%] shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/25 sm:h-28 sm:w-28"
          />

          <span className="absolute bottom-3.5 left-4 flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-ink-950/70 px-3 py-1.5 font-mono text-[0.62rem] tracking-wide text-fg-muted">
             App Store
          </span>
        </>
      )}

      <span className="absolute top-4 right-5 font-display text-5xl font-extrabold text-white/[0.12] tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: Dictionary;
}) {
  const accent = accents[project.accent] ?? accents.violet;
  const cardRef = useRef<HTMLElement>(null);

  // 3D tilt — imlecin konumuna göre kart hafifçe eğilir.
  // CSS değişkeni üzerinden: her mousemove'da React render tetiklenmez.
  const onTiltMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 7).toFixed(2)}deg`);
  };

  const onTiltLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
      style={{
        transform:
          "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
      className="group surface-card flex h-full flex-col rounded-3xl p-5 transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-white/[0.15] sm:p-6"
    >
      <ProjectVisual project={project} index={index} />

      <div className="flex flex-1 flex-col px-1 pt-6">
        <span className="font-mono text-[0.68rem] tracking-[0.14em] text-fg-dim uppercase">
          {project.client}
        </span>

        <h3 className="mt-2.5 font-display text-xl leading-snug font-bold tracking-tight sm:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 text-[0.9rem] leading-relaxed text-fg-muted">
          {project.description}
        </p>

        <div
          className={cn(
            "mt-5 inline-flex items-center gap-2 self-start rounded-full bg-white/[0.04] px-3.5 py-2 text-[0.8rem] font-medium ring-1",
            accent.text,
            accent.ring,
          )}
        >
          <TrendingUp size={14} strokeWidth={2.4} />
          {project.result}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[0.68rem] text-fg-dim"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 self-start border-t border-transparent pt-1 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            {project.type === "app" ? t.work.viewApp : t.work.viewSite}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        )}
      </div>
    </article>
  );
}

export function Work({ t }: { t: Dictionary }) {
  return (
    <section id="isler" className="relative scroll-mt-24 bg-ink-900/40 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          label={t.work.label}
          title={t.work.title}
          description={t.work.description}
        />
      </div>

      {/* --- Masaüstü: sabitlenmiş yatay kaydırma ---
          Eskiden Framer Motion + JS ölçümüyle çalışıyordu; artık CSS
          scroll-driven animation (globals.css: work-outer/work-track).
          Ray kendi genişliğinin yüzdesiyle kayar, ölçüme gerek yok.
          Desteklemeyen tarayıcıda bu blok gizlenir, aşağıdaki kaydırma
          listesi her boyutta gösterilir. */}
      <div
        className="work-outer relative mt-14 hidden md:block"
        style={{ height: `${Math.max(180, t.work.items.length * 62)}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="work-track flex gap-6 pr-24 pl-[max(1.25rem,calc((100vw-80rem)/2+2.5rem))] will-change-transform">
            {t.work.items.map((project, index) => (
              <div key={project.slug} className="w-[clamp(20rem,32vw,27rem)] shrink-0">
                <ProjectCard project={project} index={index} t={t} />
              </div>
            ))}
          </div>

          {/* İlerleme çubuğu — aynı zaman çizelgesine bağlı */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 h-[3px] w-56 -translate-x-1/2 overflow-hidden rounded-full bg-white/[0.09]">
            <div className="work-bar h-full rounded-full bg-linear-to-r from-brand-violet to-brand-cyan" />
          </div>
        </div>
      </div>

      {/* --- Mobil: parmakla kaydırılan liste.
          work-fallback: masaüstü tarayıcı scroll-driven animasyonu
          desteklemiyorsa bu liste orada da görünür. --- */}
      <div className="work-fallback mt-12 md:hidden">
        <Reveal>
          <div className="container-page mb-4 flex items-center gap-2 text-fg-dim">
            <MoveHorizontal size={15} />
            <span className="font-mono text-[0.66rem] tracking-[0.16em] uppercase">
              {t.work.swipeHint}
            </span>
          </div>
        </Reveal>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {t.work.items.map((project, index) => (
            <div
              key={project.slug}
              className="w-[85vw] max-w-sm shrink-0 snap-center"
            >
              <ProjectCard project={project} index={index} t={t} />
            </div>
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}
