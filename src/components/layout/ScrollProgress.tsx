/**
 * Sayfanın en üstünde ilerleme çubuğu — tamamen CSS scroll-driven animation
 * (globals.css: .scroll-progress). Eskiden Framer Motion yay fiziğiyle
 * çalışıyordu; her kaydırma karesinde JS demekti. Artık sıfır JS: sunucu
 * bileşeni, destek olmayan tarayıcıda kendini gizler.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed inset-x-0 top-0 z-[100] h-[2px] bg-linear-to-r from-brand-violet via-brand-cyan to-brand-pink max-sm:!hidden"
    />
  );
}
