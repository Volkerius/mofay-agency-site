"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Özel imleç — dış halka gecikmeli takip eder, tıklanabilir öğelerde büyür.
 * Sadece hassas işaretleyicisi olan cihazlarda (fare/trackpad) çalışır.
 *
 * Framer Motion olmadan: nokta transform ile anında, halka rAF içinde
 * lerp'le takip ediyor. React state yalnızca kurulum için; kare başına
 * render yok, DOM'a doğrudan yazılıyor.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let visible = false;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const target = event.target as HTMLElement | null;
      hovering = Boolean(
        target?.closest(
          'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]',
        ),
      );
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      // Halka imleci yumuşakça kovalar
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      const size = hovering ? 52 : 30;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      ring.style.borderColor = hovering
        ? "rgba(124,92,255,0.9)"
        : "rgba(255,255,255,0.35)";
      ring.style.backgroundColor = hovering
        ? "rgba(124,92,255,0.12)"
        : "transparent";
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-brand-cyan opacity-0 mix-blend-difference md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden rounded-full border border-white/40 opacity-0 transition-[width,height,border-color,background-color] duration-300 md:block"
      />
    </>
  );
}
