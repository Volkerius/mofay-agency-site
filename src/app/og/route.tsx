import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { isLocale, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Sosyal medyada paylaşıldığında görünen önizleme görseli.
 *
 * Edge runtime + gömülü fontlar: varsayılan font Türkçe'nin ı/ş/ğ/İ
 * harflerini içermiyor (Latin Extended-A) — kendi fontumuzu gömmezsek
 * "Yazılım" kelimesi görselde ▯▯ kutu olarak çıkar.
 */
export const runtime = "edge";

const size = { width: 1200, height: 630 };

const soraExtraBold = fetch(
  new URL("./Sora-ExtraBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const interRegular = fetch(
  new URL("./Inter-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("locale") ?? defaultLocale;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getDictionary(locale);

  const [sora, inter] = await Promise.all([soraExtraBold, interRegular]);

  const mottoLine1 =
    locale === "tr" ? "İşi yazılım yapsın." : "Let software do the work.";
  const mottoLine2 =
    locale === "tr" ? "Siz büyütmeye bakın." : "You focus on growth.";

  const services = t.services.items.map((service) => service.title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050609",
          padding: 72,
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        {/* Arka plan ışıkları */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(124,92,255,0.55), rgba(5,6,9,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(34,211,238,0.4), rgba(5,6,9,0) 65%)",
            display: "flex",
          }}
        />

        {/* Marka */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #7C5CFF, #22D3EE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
              <path
                d="M11.5 28.5V12l8.5 9.5L28.5 12v16.5"
                stroke="#fff"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 34,
              fontFamily: "Sora",
              color: "#EEF0F6",
              letterSpacing: -0.5,
              display: "flex",
            }}
          >
            {site.name}
          </div>
        </div>

        {/* Motto */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div
            style={{
              fontSize: 76,
              fontFamily: "Sora",
              color: "#EEF0F6",
              lineHeight: 1.12,
              letterSpacing: -2.8,
              display: "flex",
            }}
          >
            {mottoLine1}
          </div>
          <div
            style={{
              fontSize: 76,
              fontFamily: "Sora",
              lineHeight: 1.12,
              letterSpacing: -2.8,
              display: "flex",
              color: "#9AA1B8",
            }}
          >
            {mottoLine2}
          </div>
        </div>

        {/* Hizmet etiketleri */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {services.map((label) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(238,240,246,0.14)",
                borderRadius: 999,
                padding: "10px 22px",
                fontSize: 21,
                color: "#9AA1B8",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: sora, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
