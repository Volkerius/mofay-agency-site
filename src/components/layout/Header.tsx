"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Kaydırma eşiği — framer'sız, rAF ile seyreltilmiş pasif dinleyici
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "#hizmetler", label: t.nav.services },
    { href: "#isler", label: t.nav.work },
    { href: "#surec", label: t.nav.process },
    { href: "#teknoloji", label: t.nav.tech },
    { href: "#sss", label: t.nav.faq },
  ];

  const otherLocale: Locale = locale === "tr" ? "en" : "tr";

  const switchLocale = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <>
      {/* Giriş animasyonu CSS (hero-stagger) — Framer Motion'la yapılınca
          header sunucu HTML'ine opacity:0 basılıyor ve hidrasyon bitene
          kadar görünmüyordu. */}
      <header className="hero-stagger fixed inset-x-0 top-0 z-90 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "container-page flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "surface-glass shadow-[0_8px_32px_-16px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link
            href={`/${locale}`}
            aria-label={`${site.name} — ${locale === "tr" ? "ana sayfa" : "home"}`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="primary">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
              >
                {link.label}
                <span className="absolute inset-x-3.5 -bottom-px h-px scale-x-0 bg-linear-to-r from-transparent via-brand-cyan to-transparent transition-transform duration-400 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Dil değiştirici */}
            <Link
              href={`/${otherLocale}`}
              onClick={switchLocale}
              aria-label={t.common.langSwitch}
              className="hidden rounded-full border border-white/10 px-3 py-1.5 font-mono text-[0.7rem] tracking-wider text-fg-muted uppercase transition-colors hover:border-white/25 hover:text-fg sm:block"
            >
              {locale === "tr" ? "EN" : "TR"}
            </Link>

            <Button
              href="#iletisim"
              className="hidden px-5 py-2.5 text-[0.82rem] sm:inline-flex"
              icon={<ArrowUpRight size={15} strokeWidth={2.2} />}
            >
              {t.nav.cta}
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.common.menu}
              aria-expanded={open}
              aria-controls="mobil-menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-fg transition-colors hover:border-white/25 lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menü — hep DOM'da, CSS geçişleriyle açılır/kapanır.
          AnimatePresence yerine: kapalıyken görünmez + tıklanamaz. */}
      <div
        id="mobil-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-100 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {/* Blur YOK: tam ekran backdrop-blur telefon GPU'sunda menünün
            açılışını görünür şekilde geciktiriyordu. Neredeyse opak zemin
            aynı görünümü bedavaya veriyor. */}
        <div className="absolute inset-0 bg-ink-950/[0.985]" />

        <div className="relative flex h-full flex-col">
          <div className="container-page flex items-center justify-between py-6">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              tabIndex={open ? 0 : -1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-fg"
            >
              <X size={19} />
            </button>
          </div>

          <nav className="container-page flex flex-1 flex-col justify-center gap-1 pb-24">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${80 + index * 70}ms` : "0ms" }}
                className={cn(
                  "border-b border-white/[0.07] py-4 font-display text-3xl font-semibold tracking-tight text-fg",
                  "transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                )}
              >
                {link.label}
              </a>
            ))}

            <div
              style={{ transitionDelay: open ? "450ms" : "0ms" }}
              className={cn(
                "mt-8 flex flex-col gap-3 transition-[opacity,translate] duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
              )}
            >
              {/* onClick ŞART: bu buton menünün içinde — kapatmazsak sayfa
                  arkada kayıyor ama perde ekranı örtmeye devam ediyor,
                  üstelik body kaydırma kilidi de takılı kalıyor. */}
              <Button
                href="#iletisim"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="w-full py-4 text-base"
                icon={<ArrowUpRight size={17} />}
              >
                {t.nav.cta}
              </Button>
              <Link
                href={`/${otherLocale}`}
                onClick={switchLocale}
                tabIndex={open ? 0 : -1}
                className="rounded-full border border-white/10 py-3.5 text-center text-sm text-fg-muted"
              >
                {locale === "tr" ? "Switch to English" : "Türkçeye geç"}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
