# Mofay — Software Agency Website

**Live:** [mofay.co](https://mofay.co)

Bilingual (Turkish / English) website for Mofay, a software agency in İzmir that builds web sites, business automation, mobile apps and AI solutions. Dark theme, smooth scrolling and an animated canvas hero.

## Features

- **TR / EN routing:** middleware sends visitors to `/tr` or `/en` based on their browser language; all copy lives in typed dictionaries
- **Sections:** hero, services, portfolio, stats, process, tech stack, testimonials, FAQ and contact
- **Contact form:** API route that emails new leads through Resend, plus a WhatsApp shortcut
- **SEO:** per-locale metadata, dynamic Open Graph images, JSON-LD, `sitemap.ts` and `robots.ts`
- **Single source of truth:** brand name, contact details and social links all come from `src/lib/site.ts`

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Vercel Analytics

## Running locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. The contact form works without `RESEND_API_KEY`; messages are then only logged on the server.

## Structure

```
src/
  app/[locale]/   localized pages and layout
  app/api/        contact form endpoint
  app/og/         Open Graph image generation
  components/     sections, layout, UI and providers
  i18n/           tr.ts and en.ts dictionaries
  lib/site.ts     brand and contact settings
  middleware.ts   locale detection and redirect
```
