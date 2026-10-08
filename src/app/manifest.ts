import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * /manifest.webmanifest — Android "ana ekrana ekle", Chrome kurulum istemi
 * ve arama sonuçlarında site kimliği için. Next.js bu dosyadan üretip
 * <link rel="manifest"> etiketini kendisi basıyor.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description:
      "İzmir merkezli yazılım ajansı: web sitesi, otomasyon, mobil uygulama ve yapay zekâ.",
    start_url: "/tr",
    display: "standalone",
    background_color: "#050609",
    theme_color: "#050609",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
