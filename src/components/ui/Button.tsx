"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * İmleç yaklaştıkça hafifçe ona doğru çekilen buton.
 *
 * Framer Motion olmadan: konum doğrudan transform'a yazılıyor, yumuşaklığı
 * CSS transition veriyor. Dokunmatikte mousemove gelmediği için etki yok.
 * Işık huzmesi de CSS değişkeniyle (--gx/--gy) imleci takip ediyor.
 */

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-brand-violet via-brand-indigo to-brand-cyan text-white shadow-[0_10px_40px_-12px_rgba(124,92,255,0.75)] hover:shadow-[0_16px_50px_-10px_rgba(124,92,255,0.9)]",
  secondary:
    "surface-glass text-fg hover:border-white/20 hover:bg-white/[0.06]",
  ghost: "text-fg-muted hover:text-fg",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  icon,
  external,
  ...rest
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"button">, "ref">) {
  const ref = useRef<HTMLElement>(null);
  const strength = variant === "primary" ? 0.3 : 0.18;

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    el.style.setProperty("--gx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--gy", `${event.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-tight select-none",
    "transition-[transform,color,background-color,border-color,box-shadow] duration-200 ease-out",
    variants[variant],
    className,
  );

  const inner = (
    <>
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.35), transparent 65%)",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            {icon}
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    const isExternal = external ?? /^https?:|^mailto:|^tel:/.test(href);
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={rest.onClick as React.MouseEventHandler | undefined}
        tabIndex={rest.tabIndex}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={classes}
      {...rest}
    >
      {inner}
    </button>
  );
}
