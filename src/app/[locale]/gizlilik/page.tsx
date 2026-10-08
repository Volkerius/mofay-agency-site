import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/**
 * KVKK aydınlatma / gizlilik sayfası.
 *
 * İletişim formu ad, e-posta ve mesaj topladığı için KVKK gereği aydınlatma
 * metni bulundurmak zorunlu. Metin bilerek sade: hukuk bürosu şablonu değil,
 * gerçekte ne toplayıp ne yaptığımızın dürüst anlatımı. Sitede takip çerezi
 * olmadığı için çerez bandı gerekmiyor; buradaki çerez bölümü yalnızca dil
 * tercihini (NEXT_LOCALE) anlatıyor. Veri işleme pratiği değişirse (analitik
 * eklenirse, form alanı artarsa) bu sayfa da GÜNCELLENMELİ.
 */

const icerik = {
  tr: {
    baslik: "Gizlilik ve KVKK Aydınlatma Metni",
    guncelleme: "Son güncelleme: 3 Eylül 2026",
    bolumler: [
      {
        h: "Veri sorumlusu",
        p: [
          `Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, ${site.domain} alan adlı web sitesini işleten Mofay ("biz") tarafından hazırlanmıştır. Sorularınız için ${site.email} adresinden bize ulaşabilirsiniz.`,
        ],
      },
      {
        h: "Hangi verileri topluyoruz?",
        p: [
          "Sitedeki iletişim formunu doldurduğunuzda ad, e-posta adresi, dilerseniz şirket adı ile hizmet ve bütçe tercihiniz, ve mesajınız bize iletilir. Formu doldurmadığınız sürece sizden kişisel veri toplamayız.",
          "Sunucu altyapımız, güvenlik ve kötüye kullanımın önlenmesi amacıyla istek sırasında IP adresini kısa süreli olarak işleyebilir (ör. aynı adresten dakikada beşten fazla form gönderimini engelleme).",
        ],
      },
      {
        h: "Verilerinizi ne için kullanıyoruz?",
        p: [
          "Form üzerinden ilettiğiniz bilgileri yalnızca talebinize dönüş yapmak, teklif hazırlamak ve sizinle iletişim kurmak için kullanırız. Verileriniz reklam listelerine eklenmez, üçüncü kişilere satılmaz veya pazarlama amacıyla paylaşılmaz.",
        ],
      },
      {
        h: "Verileriniz nerede tutuluyor?",
        p: [
          "Form iletileri, e-posta altyapı sağlayıcımız (Resend) üzerinden e-posta kutumuza iletilir ve orada saklanır. Sitemiz Vercel altyapısında barındırılmaktadır. Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabilir; form gönderdiğinizde iletinizin bu altyapılar üzerinden aktarılmasını kabul etmiş olursunuz.",
        ],
      },
      {
        h: "Çerezler",
        p: [
          "Sitemiz takip veya reklam çerezi kullanmaz. Yalnızca dil tercihinizi hatırlamak için zorunlu nitelikte tek bir çerez (NEXT_LOCALE) tutulur.",
        ],
      },
      {
        h: "Haklarınız",
        p: [
          `KVKK'nın 11. maddesi kapsamında; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Talebinizi ${site.email} adresine iletmeniz yeterlidir; en geç 30 gün içinde dönüş yaparız.`,
        ],
      },
    ],
    geri: "Ana sayfaya dön",
  },
  en: {
    baslik: "Privacy Notice",
    guncelleme: "Last updated: September 3, 2026",
    bolumler: [
      {
        h: "Who we are",
        p: [
          `This notice is provided by Mofay ("we"), operator of ${site.domain}. For any questions, contact us at ${site.email}.`,
        ],
      },
      {
        h: "What we collect",
        p: [
          "When you submit the contact form, we receive your name, e-mail address, optionally your company name with service and budget preferences, and your message. We do not collect personal data unless you submit the form.",
          "Our infrastructure may briefly process your IP address for security and abuse prevention (e.g. limiting more than five submissions per minute from the same address).",
        ],
      },
      {
        h: "How we use it",
        p: [
          "We use the information you send solely to respond to your request, prepare a quote and communicate with you. Your data is never added to advertising lists, sold, or shared for marketing purposes.",
        ],
      },
      {
        h: "Where it is stored",
        p: [
          "Form messages are delivered to our mailbox via our e-mail provider (Resend) and stored there. The site is hosted on Vercel. These providers' servers may be located abroad; by submitting the form you consent to your message being transferred through this infrastructure.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "We use no tracking or advertising cookies. A single essential cookie (NEXT_LOCALE) remembers your language preference.",
        ],
      },
      {
        h: "Your rights",
        p: [
          `You may request access to, correction of, or deletion of your personal data at any time by writing to ${site.email}. We respond within 30 days.`,
        ],
      },
    ],
    geri: "Back to home",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = icerik[locale];
  return {
    title: t.baslik,
    description:
      locale === "tr"
        ? "Mofay'ın kişisel verileri nasıl işlediğine dair KVKK aydınlatma metni."
        : "How Mofay handles personal data submitted through this site.",
    alternates: {
      canonical: `${site.url}/${locale}/gizlilik`,
      languages: {
        tr: `${site.url}/tr/gizlilik`,
        en: `${site.url}/en/gizlilik`,
        "x-default": `${site.url}/tr/gizlilik`,
      },
    },
  };
}

export default async function GizlilikPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = icerik[locale as Locale];

  return (
    <div className="container-page pt-36 pb-24 sm:pt-44">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          {t.baslik}
        </h1>
        <p className="mt-3 text-sm text-fg-dim">{t.guncelleme}</p>

        <div className="mt-12 space-y-10">
          {t.bolumler.map((bolum) => (
            <section key={bolum.h}>
              <h2 className="font-display text-lg font-semibold text-fg">
                {bolum.h}
              </h2>
              {bolum.p.map((paragraf) => (
                <p
                  key={paragraf.slice(0, 40)}
                  className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted"
                >
                  {paragraf}
                </p>
              ))}
            </section>
          ))}
        </div>

        <Link
          href={`/${locale}`}
          className="mt-14 inline-block text-sm text-brand-cyan transition-colors hover:text-fg"
        >
          ← {t.geri}
        </Link>
      </div>
    </div>
  );
}
