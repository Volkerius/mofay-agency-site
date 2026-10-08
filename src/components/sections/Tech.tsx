"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function Tech({ t }: { t: Dictionary }) {
  return (
    <section id="teknoloji" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-64 h-[30rem] w-[30rem] rounded-full opacity-20 blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.55), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <SectionHeading
          label={t.tech.label}
          title={t.tech.title}
          description={t.tech.description}
        />

        <div className="mt-14 space-y-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.05] sm:mt-16">
          {t.tech.groups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index}
              className="bg-ink-950/85 backdrop-blur-sm"
            >
              <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-7">
                <h3 className="w-full shrink-0 font-mono text-[0.7rem] tracking-[0.16em] text-fg-dim uppercase sm:w-52">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="cursor-default rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[0.85rem] text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-violet/45 hover:bg-brand-violet/[0.08] hover:text-fg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
