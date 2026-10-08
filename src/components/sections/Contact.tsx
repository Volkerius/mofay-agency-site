"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageCircle,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3.5 text-[0.92rem] text-fg placeholder:text-fg-dim/70 transition-colors duration-300 focus:border-brand-violet/60 focus:bg-white/[0.045] focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.8rem] font-medium text-fg-muted">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-brand-pink">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </label>
  );
}

export function Contact({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const f = t.contact.form;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Doğrulama — sunucu tarafında da tekrar ediliyor
    const next: Errors = {};
    if (!data.name?.trim()) next.name = f.required;
    if (!data.email?.trim()) next.email = f.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email))
      next.email = f.invalidEmail;
    if (!data.message?.trim()) next.message = f.required;
    else if (data.message.trim().length < 20) next.message = f.tooShort;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="iletisim" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(124,92,255,0.5), transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Sol sütun — başlık ve doğrudan kanallar */}
          <div className="lg:col-span-5">
            <SectionHeading
              label={t.contact.label}
              title={t.contact.title}
              description={t.contact.description}
            />

            <div className="mt-9 space-y-3">
              <Reveal delay={1}>
                <a
                  href={whatsappLink(t.contact.direct.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:bg-brand-emerald/[0.05]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/15 text-brand-emerald ring-1 ring-brand-emerald/25">
                    <MessageCircle size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">
                      {t.contact.direct.whatsapp}
                    </span>
                    <span className="block truncate text-[0.78rem] text-fg-dim">
                      {site.phone}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-fg-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>

              <Reveal delay={2}>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-violet/40 hover:bg-brand-violet/[0.05]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-violet/15 text-brand-violet ring-1 ring-brand-violet/25">
                    <Mail size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-fg">
                      {t.contact.direct.email}
                    </span>
                    <span className="block truncate text-[0.78rem] text-fg-dim">
                      {site.email}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-fg-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>

              <Reveal delay={3}>
                <p className="flex items-center gap-2 pt-1 pl-1 text-[0.78rem] text-fg-dim">
                  <Clock3 size={13} />
                  {t.contact.direct.responseTime}
                </p>
              </Reveal>
            </div>
          </div>

          {/* Sağ sütun — form */}
          <div className="lg:col-span-7">
            <Reveal direction="left" delay={1}>
              <div className="surface-card relative overflow-hidden rounded-3xl p-6 sm:p-9">
                {status === "success" ? (
                    <div
                      key="success"
                      className="pop-in flex min-h-[26rem] flex-col items-center justify-center text-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-emerald/15 text-brand-emerald ring-1 ring-brand-emerald/30">
                        <CheckCircle2 size={30} strokeWidth={1.8} />
                      </span>
                      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                        {f.successTitle}
                      </h3>
                      <p className="mt-3 max-w-sm text-[0.9rem] leading-relaxed text-fg-muted">
                        {f.successBody}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-7 rounded-full border border-white/[0.12] px-5 py-2.5 text-sm text-fg-muted transition-colors hover:border-white/25 hover:text-fg"
                      >
                        {f.reset}
                      </button>
                    </div>
                  ) : (
                    <form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-4"
                    >
                      {/* Bot tuzağı — insanlar görmez, botlar doldurur */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={f.name} error={errors.name}>
                          <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder={f.namePlaceholder}
                            className={cn(
                              fieldClass,
                              errors.name && "border-brand-pink/50",
                            )}
                          />
                        </Field>

                        <Field label={f.email} error={errors.email}>
                          <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder={f.emailPlaceholder}
                            className={cn(
                              fieldClass,
                              errors.email && "border-brand-pink/50",
                            )}
                          />
                        </Field>
                      </div>

                      <Field label={f.company}>
                        <input
                          type="text"
                          name="company"
                          autoComplete="organization"
                          placeholder={f.companyPlaceholder}
                          className={fieldClass}
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={f.service}>
                          <select
                            name="service"
                            defaultValue=""
                            className={cn(fieldClass, "appearance-none bg-ink-850")}
                          >
                            <option value="" disabled>
                              {f.servicePlaceholder}
                            </option>
                            {f.serviceOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>

                        <Field label={f.budget}>
                          <select
                            name="budget"
                            defaultValue=""
                            className={cn(fieldClass, "appearance-none bg-ink-850")}
                          >
                            <option value="" disabled>
                              {f.budgetPlaceholder}
                            </option>
                            {f.budgetOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <Field label={f.message} error={errors.message}>
                        <textarea
                          name="message"
                          rows={5}
                          placeholder={f.messagePlaceholder}
                          className={cn(
                            fieldClass,
                            "resize-y",
                            errors.message && "border-brand-pink/50",
                          )}
                        />
                      </Field>

                      {status === "error" && (
                        <div className="flex items-start gap-2.5 rounded-xl border border-brand-pink/30 bg-brand-pink/[0.07] p-4 text-[0.83rem]">
                          <AlertCircle
                            size={16}
                            className="mt-0.5 shrink-0 text-brand-pink"
                          />
                          <span className="text-fg-muted">
                            <strong className="font-medium text-fg">
                              {f.errorTitle}
                            </strong>{" "}
                            {f.errorBody}{" "}
                            <a
                              href={`mailto:${site.email}`}
                              className="text-brand-cyan underline underline-offset-2"
                            >
                              {site.email}
                            </a>
                          </span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-brand-violet via-brand-indigo to-brand-cyan px-6 py-4 text-[0.95rem] font-medium text-white shadow-[0_10px_40px_-12px_rgba(124,92,255,0.8)] transition-all duration-300 hover:shadow-[0_16px_50px_-10px_rgba(124,92,255,0.95)] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            {f.submitting}
                          </>
                        ) : (
                          <>
                            {f.submit}
                            <ArrowUpRight
                              size={17}
                              strokeWidth={2.2}
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </>
                        )}
                      </button>
                    </form>
                  )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
