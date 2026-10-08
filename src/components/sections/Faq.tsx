"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

export function Faq({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sss" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                label={t.faq.label}
                title={t.faq.title}
                description={t.faq.description}
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-2.5">
              {t.faq.items.map((item, index) => {
                const isOpen = open === index;

                return (
                  <Reveal key={item.question} delay={index} as="li">
                    <div
                      className={cn(
                        "surface-card overflow-hidden rounded-2xl",
                        isOpen && "border-white/[0.14]",
                      )}
                    >
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                        >
                          <span
                            className={cn(
                              "text-[0.95rem] font-medium tracking-tight transition-colors duration-300 sm:text-base",
                              isOpen ? "text-fg" : "text-fg-muted",
                            )}
                          >
                            {item.question}
                          </span>

                          {/* Artı işareti açıkken 45° dönüp × olur — saf CSS */}
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[transform,colors] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                              isOpen
                                ? "rotate-45 border-brand-violet/50 bg-brand-violet/15 text-brand-violet"
                                : "rotate-0 border-white/[0.1] text-fg-dim",
                            )}
                          >
                            <Plus size={14} strokeWidth={2.4} />
                          </span>
                        </button>
                      </h3>

                      {/* Yükseklik animasyonu: grid 0fr -> 1fr hilesi (saf CSS).
                          İçerik hep DOM'da — ekran okuyucu ve Ctrl+F bulur. */}
                      <div className="acc-panel" data-open={isOpen}>
                        <div className="acc-inner">
                          <p className="px-5 pb-5 text-[0.9rem] leading-relaxed text-fg-muted sm:px-6 sm:pb-6">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
