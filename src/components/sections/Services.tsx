"use client";

import {
  ArrowUpRight,
  Check,
  Globe,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const icons: Record<string, LucideIcon> = {
  globe: Globe,
  workflow: Workflow,
  smartphone: Smartphone,
  sparkles: Sparkles,
};

// Her hizmetin kendi ışık rengi — kartlar birbirinden ayrışsın
const glows = [
  "rgba(124,92,255,0.18)",
  "rgba(34,211,238,0.16)",
  "rgba(244,114,182,0.16)",
  "rgba(52,211,153,0.15)",
];

const iconTints = [
  "from-brand-violet/25 to-brand-violet/5 text-brand-violet",
  "from-brand-cyan/25 to-brand-cyan/5 text-brand-cyan",
  "from-brand-pink/25 to-brand-pink/5 text-brand-pink",
  "from-brand-emerald/25 to-brand-emerald/5 text-brand-emerald",
];

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="hizmetler" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-64 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.6), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <SectionHeading
          label={t.services.label}
          title={t.services.title}
          description={t.services.description}
        />

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2">
          {t.services.items.map((service, index) => {
            const Icon = icons[service.icon] ?? Globe;

            return (
              <Reveal
                key={service.slug}
                delay={index}
                className="h-full"
              >
                <SpotlightCard
                  glow={glows[index % glows.length]}
                  className="h-full p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ring-1 ring-white/[0.08] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3 ${
                          iconTints[index % iconTints.length]
                        }`}
                      >
                        <Icon size={23} strokeWidth={1.7} />
                      </div>

                      <span className="font-mono text-xs text-fg-dim/60">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight sm:text-[1.4rem]">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-brand-violet/90">
                      {service.tagline}
                    </p>

                    <p className="mt-4 text-[0.92rem] leading-relaxed text-fg-muted">
                      {service.description}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-6">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-2.5 text-[0.88rem] text-fg-muted"
                        >
                          <Check
                            size={15}
                            strokeWidth={2.6}
                            className="mt-0.5 shrink-0 text-brand-emerald"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#iletisim"
                      className="mt-7 inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg transition-colors hover:text-brand-cyan"
                    >
                      {t.nav.cta}
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
