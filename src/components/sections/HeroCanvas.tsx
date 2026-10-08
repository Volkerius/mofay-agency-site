"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; ox: number; oy: number; phase: number };

/**
 * Hero arkasındaki etkileşimli nokta alanı.
 * İmleç yaklaştıkça noktalar itilir ve parlar; uzaklaşınca yaylanarak yerine döner.
 *
 * Dokunmatik cihazlarda hiç çalışmaz: orada imleç yok, geriye yalnızca fark
 * edilmeyen bir "nefes alma" efekti için saniyede 60 kare çizmek kalıyordu.
 * Zeminde zaten aurora ve ızgara var; telefonda görsel kayıp yok, kazanç ise
 * sürekli CPU ve pil tüketiminin sıfırlanması.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const gap = width < 640 ? 42 : width < 1280 ? 34 : 30;
      dots = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          dots.push({ x, y, ox: x, oy: y, phase: Math.random() * Math.PI * 2 });
        }
      }
    };

    const radius = 150;

    const draw = (time: number) => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        // İmleçten kaçış
        const dx = dot.ox - pointer.x;
        const dy = dot.oy - pointer.y;
        const dist = Math.hypot(dx, dy);

        let targetX = dot.ox;
        let targetY = dot.oy;
        let intensity = 0;

        if (pointer.active && dist < radius) {
          const force = (1 - dist / radius) ** 2;
          intensity = force;
          targetX = dot.ox + (dx / (dist || 1)) * force * 26;
          targetY = dot.oy + (dy / (dist || 1)) * force * 26;
        }

        // Yaylı dönüş — ani sıçrama yerine yumuşak takip
        dot.x += (targetX - dot.x) * 0.12;
        dot.y += (targetY - dot.y) * 0.12;

        // Hafif nefes alma efekti
        const breathe = 0.5 + 0.5 * Math.sin(time * 0.0008 + dot.phase);
        const size = 0.9 + intensity * 1.9 + breathe * 0.25;
        const alpha = 0.1 + intensity * 0.72 + breathe * 0.05;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          intensity > 0.04
            ? `rgba(${Math.round(124 + intensity * 60)}, ${Math.round(
                140 + intensity * 80,
              )}, 255, ${alpha})`
            : `rgba(150, 160, 200, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    // Hero ekrandan çıkınca çizimi durdur — boşuna pil yakmasın
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );

    build();
    observer.observe(canvas);
    raf = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
