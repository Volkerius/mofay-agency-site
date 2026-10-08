import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Kaydırınca açılan sarmalayıcı — TAMAMEN CSS, JavaScript yok.
 *
 * Önceden Framer Motion'ın whileInView'ı kullanılıyordu. Sorun: framer
 * öğeyi sunucu HTML'ine `opacity: 0` ile basıyor ve ancak hidrasyon
 * bittikten sonra görünür yapıyor. Masaüstünde fark edilmez, telefonda
 * 15 saniye boyunca sayfanın yarısı siyah kalıyordu.
 *
 * Artık animasyon CSS scroll-timeline ile yapılıyor: ilk karede çalışır,
 * JS beklemez. Destek yoksa animasyon olmaz, içerik anında görünür.
 */

type Direction = "up" | "left" | "right" | "none";

const classes: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-l",
  right: "reveal-r",
  none: "reveal-f",
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  /** Kademelendirme sırası (0, 1, 2...) — saniye değil, sıra numarası. */
  delay?: number;
  as?: "div" | "span" | "li" | "section";
}) {
  return (
    <Tag
      className={cn(classes[direction], className)}
      style={{ "--d": delay } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Harf harf, alttan maskeden çıkarak açılan başlık.
 * "\n" satır sonu olarak yorumlanır.
 *
 * Erişilebilirlik: harflere bölünmüş hâli aria-hidden; ekran okuyucu
 * sr-only kopyadan bütün cümleyi okur (yoksa harf harf heceler).
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  /** Kademelendirme başlangıcı — sonraki harfler bunun üstüne biner. */
  delay?: number;
  /** Bölüm başlıkları h2 olmalı; varsayılan span sadece süsleme metni için. */
  as?: "span" | "h2" | "h3";
}) {
  const lines = text.split("\n");
  let harfSirasi = Math.round(delay * 6);

  return (
    <Tag className={cn("block", className)}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>

      <span aria-hidden className="block">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="line-mask">
            {line.split(" ").map((word, wordIndex, words) => (
              <span key={wordIndex} className="inline-block whitespace-pre">
                {Array.from(word).map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className="reveal-char inline-block"
                    style={{ "--i": harfSirasi++ } as CSSProperties}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
