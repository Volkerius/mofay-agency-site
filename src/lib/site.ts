/**
 * Markanın tek kaynağı. Ad, iletişim, sosyal hesaplar — hepsi burada.
 * Marka adını değiştirmek istersen sadece bu dosyaya dokunman yeterli.
 */
export const site = {
  name: "Mofay",
  shortName: "M",
  legalName: "Mofay",
  domain: "mofay.co",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mofay.co",
  // ⚠️ info@mofay.co posta kutusu kurulana kadar buraya gerçek çalışan bir
  // adres yaz (yoksa siteden tıklanan mailler kaybolur). Domain aldıktan sonra
  // Cloudflare Email Routing ile info@mofay.co → kendi gmail'ine ücretsiz yönlenir.
  email: "info@mofay.co",
  // WhatsApp için uluslararası format, sadece rakam (90 + numara)
  phone: "+90 507 168 99 69",
  phoneRaw: "905071689969",
  location: "İzmir, Türkiye · Uzaktan da çalışıyoruz",
  /* Sadece GERÇEKTEN AÇILMIŞ hesaplar. github.com/mofayco ve x.com/mofayco
     404 veriyordu — sayfada kırık link, JSON-LD sameAs'ta ölü profil demek.
     Hesap açılınca buraya geri ekle, footer ve sameAs kendiliğinden düzelir. */
  social: {
    instagram: "https://instagram.com/mofay.co",
    facebook: "https://facebook.com/mofay.co",
    linkedin: "https://linkedin.com/company/mofayco",
  },
} as const;

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.phoneRaw}?text=${encodeURIComponent(message)}`;
