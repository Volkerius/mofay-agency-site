"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * İmleci takip eden ışık lekesi olan kart.
 * Konum CSS değişkenine yazılır — her karede React render etmemek için
 * bilinçli olarak state kullanılmıyor.
 */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(124,92,255,0.16)",
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "group surface-card relative overflow-hidden rounded-3xl",
        "hover:border-white/[0.14]",
        className,
      )}
      style={{ ["--glow" as string]: glow }}
    >
      {/* İmlecin altındaki ışık */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 70%)",
        }}
      />
      {/* Üst kenarda ince parlama */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent opacity-60"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
