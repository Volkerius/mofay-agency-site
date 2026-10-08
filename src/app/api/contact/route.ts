import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  locale?: string;
  website?: string; // bot tuzağı
};

// Kaba istek sınırlama — aynı IP dakikada 5 mesaj
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Haritanın sınırsız büyümesini engelle
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time > WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 },
    );
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Tuzağa düşen bot: başarı döndür ama hiçbir şey yapma
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim().slice(0, 120);
  const email = (data.email ?? "").trim().slice(0, 180);
  const message = (data.message ?? "").trim().slice(0, 5000);
  const company = (data.company ?? "").trim().slice(0, 160);
  const service = (data.service ?? "").trim().slice(0, 80);
  const budget = (data.budget ?? "").trim().slice(0, 80);

  const valid =
    name.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) &&
    message.length >= 20;

  if (!valid) {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 422 },
    );
  }

  const subject = `Yeni teklif talebi — ${name}${company ? ` (${company})` : ""}`;
  const lines = [
    `Ad: ${name}`,
    `E-posta: ${email}`,
    company && `Şirket: ${company}`,
    service && `Hizmet: ${service}`,
    budget && `Bütçe: ${budget}`,
    `Dil: ${data.locale ?? "-"}`,
    "",
    message,
  ].filter(Boolean) as string[];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  // API anahtarı yoksa mesajı kaybetme — sunucu loguna yaz
  if (!apiKey) {
    console.info("[iletisim] E-posta sağlayıcısı yapılandırılmamış.\n" + lines.join("\n"));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${from}>`,
        to: [to],
        reply_to: email,
        subject,
        html: `<pre style="font:14px/1.6 ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(
          lines.join("\n"),
        )}</pre>`,
      }),
    });

    if (!response.ok) {
      console.error("[iletisim] Resend hatası:", await response.text());
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[iletisim] Gönderim istisnası:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
