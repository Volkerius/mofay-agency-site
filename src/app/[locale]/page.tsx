import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Stats } from "@/components/sections/Stats";
import { Tech } from "@/components/sections/Tech";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale as Locale);

  return (
    <>
      <Hero t={t} />
      <Marquee t={t} />
      <Services t={t} />
      <Work t={t} />
      <Process t={t} />
      <Stats t={t} />
      <Tech t={t} />
      <Testimonials t={t} />
      <Faq t={t} />
      <Contact t={t} locale={locale as Locale} />
    </>
  );
}
