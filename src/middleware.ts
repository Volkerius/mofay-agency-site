import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Dil önekli yönlendirme.
 * "/" ve öneksiz yollar, tarayıcı diline bakılarak /tr veya /en altına taşınır.
 */
/**
 * Accept-Language başlığını q değerleriyle birlikte çözer.
 *
 * Bulunamazsa VARSAYILAN DİLE (tr) düşer. Bu kritik: Googlebot çoğu taramada
 * Accept-Language göndermiyor. Eski kod "tr ile başlamıyorsa en" dediği için
 * mofay.co kökü Googlebot'u /en'e atıyordu — oysa hreflang x-default /tr'yi
 * gösteriyor. Türkiye'yi hedefleyen bir sitede kökün İngilizceye düşmesi
 * hem tutarsızlık hem de doğrudan sıralama kaybı.
 */
function pickLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const tercihler = header
    .split(",")
    .map((parca) => {
      const [etiket, ...parametreler] = parca.trim().split(";");
      const q = parametreler
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="))
        ?.slice(2);
      return {
        dil: etiket.toLowerCase().split("-")[0],
        agirlik: q === undefined ? 1 : (Number.parseFloat(q) || 0),
      };
    })
    .filter((t) => t.agirlik > 0)
    .sort((a, b) => b.agirlik - a.agirlik);

  for (const { dil } of tercihler) {
    const eslesen = locales.find((locale) => locale === dil);
    if (eslesen) return eslesen;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dilden bağımsız yollar — yönlendirilmemeli
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/og" ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  // Daha önce dil seçtiyse ona saygı duy, yoksa tarayıcı diline bak
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const detected =
    locales.find((l) => l === cookieLocale) ??
    pickLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${detected}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  // Yanıt isteğin diline göre değişiyor: ara bellekler tek sürümü herkese
  // servis etmesin.
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
