"use client";

import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Reveal, AnimatedText } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const socials = [
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
];

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-900">
      {/* Alt köşeden yükselen marka ışığı */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.55), rgba(34,211,238,0.25) 45%, transparent 70%)",
        }}
      />
      <div aria-hidden className="noise-overlay" />

      <div className="relative">
        {/* Kapanış çağrısı */}
        <div className="container-page border-b border-white/[0.06] py-20 sm:py-28">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <AnimatedText
                text={t.footer.ctaTitle}
                className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={1}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
                  {t.footer.ctaDescription}
                </p>
              </Reveal>
            </div>

            <Reveal delay={2} direction="left">
              <Button
                href="#iletisim"
                className="px-7 py-4 text-base"
                icon={<ArrowUpRight size={18} />}
              >
                {t.footer.ctaButton}
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Bağlantı sütunları */}
        <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-dim">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] text-fg-dim transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-violet/50 hover:text-fg"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[0.7rem] tracking-[0.18em] text-fg-dim uppercase">
              {t.footer.navTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: "#hizmetler", label: t.nav.services },
                { href: "#isler", label: t.nav.work },
                { href: "#surec", label: t.nav.process },
                { href: "#sss", label: t.nav.faq },
                { href: "#iletisim", label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[0.7rem] tracking-[0.18em] text-fg-dim uppercase">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {t.services.items.map((service) => (
                <li key={service.slug}>
                  <a
                    href="#hizmetler"
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[0.7rem] tracking-[0.18em] text-fg-dim uppercase">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg"
                >
                  <Mail size={15} className="shrink-0 text-fg-dim" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-fg-muted transition-colors hover:text-fg"
                >
                  <Phone size={15} className="shrink-0 text-fg-dim" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-fg-muted">
                <MapPin size={15} className="shrink-0 text-fg-dim" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Alt şerit */}
        <div className="container-page flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-7 sm:flex-row">
          <p className="text-xs text-fg-dim">
            © {year} {site.legalName}. {t.footer.rights}
          </p>

          <div className="flex items-center gap-5">
            <Link
              href={`/${locale}/gizlilik`}
              className="text-xs text-fg-dim transition-colors hover:text-fg"
            >
              {locale === "tr" ? "Gizlilik / KVKK" : "Privacy"}
            </Link>
            <Link
              href={`/${locale === "tr" ? "en" : "tr"}`}
              className="font-mono text-[0.7rem] tracking-wider text-fg-dim uppercase transition-colors hover:text-fg"
            >
              {locale === "tr" ? "English" : "Türkçe"}
            </Link>
            <a
              href="#main"
              className="flex items-center gap-1.5 text-xs text-fg-dim transition-colors hover:text-fg"
            >
              {t.footer.backToTop}
              <ArrowUp size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
