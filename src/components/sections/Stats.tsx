"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

export function Stats({ t }: { t: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/50 py-20 sm:py-24">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 mask-fade-b" />

      <div className="container-page relative">
        <div className="flex flex-col items-center text-center">
          <SectionLabel>{t.stats.label}</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {t.stats.title}
          </h2>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.05] lg:grid-cols-4">
          {t.stats.items.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index}
              className="bg-ink-950/80 px-5 py-9 text-center backdrop-blur-sm sm:px-6 sm:py-11"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="text-gradient block font-display text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl lg:text-[3.4rem]">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
                <span className="mt-2.5 block text-[0.82rem] text-fg-muted sm:text-sm">
                  {item.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
