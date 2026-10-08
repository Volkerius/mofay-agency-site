"use client";

import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

export function Testimonials({ t }: { t: Dictionary }) {
  // Referans yoksa bölümü hiç basma — boş bir "Referanslar" başlığı zarar verir
  if (t.testimonials.items.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          label={t.testimonials.label}
          title={t.testimonials.title}
          align="center"
        />

        <div className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {t.testimonials.items.map((item, index) => (
            <Reveal key={item.author} delay={index} className="h-full">
              <SpotlightCard
                glow="rgba(34,211,238,0.13)"
                className="flex h-full flex-col p-7 sm:p-8"
              >
                <Quote
                  size={26}
                  strokeWidth={1.6}
                  className="text-brand-violet/60"
                />

                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-fg-muted">
                  {item.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.07] pt-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-brand-violet/30 to-brand-cyan/20 font-display text-sm font-bold text-fg ring-1 ring-white/[0.1]">
                    {item.author.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-fg">
                      {item.author}
                    </span>
                    <span className="block truncate text-[0.78rem] text-fg-dim">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
