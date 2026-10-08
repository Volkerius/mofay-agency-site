import { ArrowRight, Clock } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function Process({ t }: { t: Dictionary }) {
  return (
    <section id="surec" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          label={t.process.label}
          title={t.process.title}
          description={t.process.description}
        />

        <div className="relative mt-16 sm:mt-20">
          {/* Dikey ray */}
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[1.35rem] w-px bg-white/[0.08] sm:left-[2.4rem]"
          >
            {/* Kaydırdıkça uzayan çizgi — CSS scroll-driven (process-line).
                Destek yoksa çizgi dolu durur, hiçbir şey kaybolmaz. */}
            <div className="process-line h-full w-full bg-linear-to-b from-brand-violet via-brand-indigo to-brand-cyan" />
          </div>

          <ol className="space-y-3">
            {t.process.steps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={index}>
                  <div className="group relative flex gap-5 rounded-3xl p-4 transition-colors duration-500 hover:bg-white/[0.02] sm:gap-8 sm:p-6">
                    {/* Numara madalyonu */}
                    <div className="relative z-10 shrink-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-ink-900 font-mono text-[0.78rem] font-medium text-fg transition-all duration-500 group-hover:border-brand-violet/60 group-hover:bg-ink-800 sm:h-[4.4rem] sm:w-[4.4rem] sm:text-base">
                        {step.number}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 pt-1 sm:pt-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-2.5 py-1 font-mono text-[0.68rem] text-fg-dim">
                          <Clock size={11} />
                          {step.duration}
                        </span>
                      </div>

                      <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-fg-muted">
                        {step.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2 text-[0.83rem] text-fg-dim">
                        <ArrowRight
                          size={14}
                          className="shrink-0 text-brand-cyan"
                        />
                        <span className="font-medium text-fg-muted">
                          {step.deliverable}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
