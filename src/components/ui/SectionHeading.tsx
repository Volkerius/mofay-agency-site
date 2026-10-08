"use client";

import { Reveal, AnimatedText } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Bölüm etiketi — küçük, tek renkli, noktalı. */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal direction="none">
      <span
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.16em] text-fg-muted uppercase",
          className,
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand-cyan animate-pulse-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-cyan" />
        </span>
        {children}
      </span>
    </Reveal>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <SectionLabel>{label}</SectionLabel>

      <AnimatedText
        as="h2"
        text={title}
        delay={1}
        className={cn(
          "mt-6 font-display text-[2rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-[2.75rem] lg:text-[3.4rem]",
          align === "center" && "mx-auto max-w-3xl",
        )}
      />

      {description && (
        <Reveal delay={2}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-fg-muted sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
