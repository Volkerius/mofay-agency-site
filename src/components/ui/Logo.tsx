import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Marka işareti — gradyan zemin üzerinde geometrik "M" monogramı.
 * currentColor kullanmıyor; gradyan marka kimliğinin parçası.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="mofay-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#7C5CFF" />
          <stop offset="55%" stopColor="#5B6CFF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#mofay-grad)" />
      <rect
        width="39"
        height="39"
        x="0.5"
        y="0.5"
        rx="10.5"
        stroke="#fff"
        strokeOpacity="0.22"
      />
      {/* M harfi */}
      <path
        d="M11.5 28.5V12l8.5 9.5L28.5 12v16.5"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText && (
        <span className="font-display text-[1.05rem] font-bold tracking-tight text-fg">
          {site.name}
        </span>
      )}
    </span>
  );
}
