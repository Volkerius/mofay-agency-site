"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Kaydırma yönetimi.
 *
 * 1) Lenis yumuşak kaydırma — yalnızca fare/trackpad cihazlarda.
 *    Dokunmatikte native kaydırma daha akıcı ve pil dostu.
 *
 * 2) Çapa (#...) tıklamaları HER cihazda buradan yönetilir. Native
 *    davranışa bırakmıyoruz çünkü:
 *    - Aynı hash'e ikinci tıklama native'de HİÇBİR ŞEY yapmıyor
 *      (kullanıcı "buton çalışmıyor" sanıyordu),
 *    - iOS Safari'nin fragment kaydırması overflow ayarlarıyla
 *      kaprisli davranabiliyor.
 *    scrollIntoView, bölümlerdeki scroll-mt-24 ofsetine saygı duyar.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    let frame = 0;
    let iptal = false;

    if (!reduced && !coarse) {
      // Dinamik import: dokunmatik cihazlar lenis modülünü hiç indirmez
      import("lenis").then(({ default: LenisCtor }) => {
        if (iptal) return;
        lenis = new LenisCtor({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      });

        const raf = (time: number) => {
          lenis?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    }

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      // Adres çubuğunda hash güncel kalsın ama sayfa zıplamasın
      history.pushState(null, "", id);

      /* Mobil menüden gelen tıklama: perde kapanırken ANINDA atla.
         Kapanan perde ekranı örttüğü için sıçrama görünmüyor; smooth
         scroll ise 10bin piksellik sayfada saniyeler sürüp "çalışmıyor"
         hissi veriyordu. Menünün kaydırma kilidini de scroll'dan ÖNCE
         bırak — React bunu useEffect'te, yani kaydırmadan sonra açıyor. */
      const menuden = !!anchor.closest("#mobil-menu");
      if (menuden) document.body.style.overflow = "";

      if (lenis && !menuden) {
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      } else {
        target.scrollIntoView({
          behavior: reduced || menuden ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      iptal = true;
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
