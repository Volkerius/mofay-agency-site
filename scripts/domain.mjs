#!/usr/bin/env node
/**
 * Domain müsaitlik kontrolü — WHOIS/RDAP üzerinden, kesin sonuç.
 *
 * Kullanım:
 *   node scripts/domain.mjs lentra
 *   node scripts/domain.mjs lentra nimbra kandra
 *   node scripts/domain.mjs lentra --tld com,net,co,dev,io
 *
 * Not: DNS ile kontrol etmek YANILTIR — kayıtlı ama DNS'i ayarlanmamış
 * domainler "boş" görünür. Bu araç registry'nin kendisine sorar.
 */

const args = process.argv.slice(2);
const tldFlag = args.findIndex((a) => a === "--tld" || a === "-t");

let tlds = ["com", "net", "co", "dev", "io"];
if (tldFlag !== -1) {
  tlds = (args[tldFlag + 1] ?? "").split(",").map((t) => t.replace(/^\./, "").trim()).filter(Boolean);
  args.splice(tldFlag, 2);
}

const names = args.map((n) => n.toLowerCase().replace(/\.[a-z.]+$/, "").trim()).filter(Boolean);

if (names.length === 0) {
  console.log("Kullanım: node scripts/domain.mjs <isim> [isim2 ...] [--tld com,dev]");
  process.exit(1);
}

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const GREY = "\x1b[90m";
const BOLD = "\x1b[1m";
const OFF = "\x1b[0m";

/** rdap.org bootstrap sunucusu doğru registry'ye yönlendirir, her TLD'de çalışır. */
async function check(domain) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: { accept: "application/rdap+json" },
      redirect: "follow",
      signal: controller.signal,
    });

    if (res.status === 404) return { state: "free" };
    if (res.status === 200) {
      const data = await res.json().catch(() => ({}));
      const reg = (data.events ?? []).find((e) => e.eventAction === "registration");
      const exp = (data.events ?? []).find((e) => e.eventAction === "expiration");
      return {
        state: "taken",
        since: reg?.eventDate?.slice(0, 10),
        until: exp?.eventDate?.slice(0, 10),
      };
    }
    return { state: "unknown", note: `HTTP ${res.status}` };
  } catch (err) {
    return { state: "unknown", note: err.name === "AbortError" ? "zaman aşımı" : err.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(
  names.flatMap((name) =>
    tlds.map(async (tld) => {
      const domain = `${name}.${tld}`;
      return { name, domain, ...(await check(domain)) };
    }),
  ),
);

for (const name of names) {
  const rows = results.filter((r) => r.name === name);
  const freeCount = rows.filter((r) => r.state === "free").length;

  console.log(`\n${BOLD}${name}${OFF} ${GREY}— ${freeCount}/${rows.length} boş${OFF}`);

  for (const r of rows) {
    if (r.state === "free") {
      console.log(`  ${GREEN}● BOŞ ${OFF} ${r.domain}`);
    } else if (r.state === "taken") {
      const detail = r.since ? `${GREY}kayıt ${r.since}${r.until ? `, bitiş ${r.until}` : ""}${OFF}` : "";
      console.log(`  ${RED}○ dolu${OFF} ${GREY}${r.domain}${OFF} ${detail}`);
    } else {
      console.log(`  ${GREY}? bilinmiyor ${r.domain} (${r.note})${OFF}`);
    }
  }
}

console.log();
