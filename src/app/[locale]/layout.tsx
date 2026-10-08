import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Analytics } from "@vercel/analytics/next";

/* Fontlar Google'dan değil, kendi sunucumuzdan ve KIRPILMIŞ hâlde geliyor.
 *
 * next/font/google değişken fontları indiriyordu: Inter tek başına 130KB'dı
 * (100-900 tüm ağırlık ekseni + tüm Latin alt kümeleri), toplam 212KB.
 * Biz yalnızca Latin + Türkçe karakterleri ve kodda gerçekten kullanılan
 * ağırlıkları kullanıyoruz — kırpılmış hâli 100KB.
 *
 * Dosyalar scratchpad/fontkes.py ile üretildi. Yeni bir ağırlık ya da
 * alışılmadık bir karakter (örn. Kiril, Yunan) kullanacaksan o betiği
 * güncelleyip fontları yeniden üretmen gerekir; yoksa harf kutu görünür.
 */

const sora = localFont({
  variable: "--font-sora",
  display: "swap",
  adjustFontFallback: "Arial",
  src: [
    { path: "../fonts/Sora-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Sora-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Sora-800.woff2", weight: "800", style: "normal" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
  src: [
    { path: "../fonts/Inter-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-500.woff2", weight: "500", style: "normal" },
  ],
});

const jetbrains = localFont({
  variable: "--font-mono-jb",
  display: "swap",
  adjustFontFallback: false,
  // Küçük, dekoratif etiketlerde kullanılıyor — kritik yolda beklemesin,
  // sonradan gelip yerine otursun.
  preload: false,
  src: [{ path: "../fonts/JetBrainsMono-400.woff2", weight: "400", style: "normal" }],
});

export const viewport: Viewport = {
  themeColor: "#050609",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: `%s — ${site.name}`,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: {
        tr: `${site.url}/tr`,
        en: `${site.url}/en`,
        "x-default": `${site.url}/tr`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          url: `/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [`/og?locale=${locale}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    /* icons alanı BİLEREK yok: src/app altındaki favicon.ico, icon.png ve
       apple-icon.png dosyalarını Next.js kendisi bulup <link> etiketlerini
       üretiyor. Elle tanımlarsak ikisi çakışıyor.
       favicon.ico özellikle gerekli: Google mobil arama sonuçlarında site
       adının yanında favicon gösteriyor ve klasik .ico'yu arıyor. */
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  // Arama motorlarına firmayı tanıtan yapısal veri
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/${locale}`,
    email: site.email,
    telephone: site.phone,
    description: t.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "İzmir",
      addressCountry: "TR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 38.4237, longitude: 27.1428 },
    areaServed: ["İzmir", "TR", "Worldwide"],
    knowsLanguage: ["tr", "en"],
    sameAs: Object.values(site.social),
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og?locale=${locale}`,
    serviceType: t.services.items.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "tr" ? "Hizmetler" : "Services",
      itemListElement: t.services.items.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: locale,
    publisher: { "@id": `${site.url}/#organization` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-950 text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded-full focus:bg-brand-violet focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          {locale === "tr" ? "İçeriğe geç" : "Skip to content"}
        </a>

        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Header locale={locale as Locale} t={t} />

        <main id="main">{children}</main>

        <Footer locale={locale as Locale} t={t} />
        <WhatsAppButton
          label={t.contact.direct.whatsapp}
          message={t.contact.direct.whatsappMessage}
        />
        {/* Vercel Web Analytics — çerezsiz, KVKK dostu ziyaretçi sayımı.
            Panelden Analytics sekmesi AÇILMADAN veri toplamaz. */}
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </body>
    </html>
  );
}
