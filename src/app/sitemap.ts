import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...locales.map((locale) => ({
      url: `${site.url}/${locale}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: locale === "tr" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}`]),
        ),
      },
    })),
    ...locales.map((locale) => ({
      url: `${site.url}/${locale}/gizlilik`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site.url}/${l}/gizlilik`]),
        ),
      },
    })),
  ];
}
