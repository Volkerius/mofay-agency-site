import type { Dictionary } from "./tr";

export const en: Dictionary = {
  meta: {
    title: "Mofay | Software, Automation & Mobile App Studio",
    description:
      "Software agency in İzmir, Turkey — working worldwide. Corporate websites, e-commerce, automation, mobile apps and AI. 7 years of experience, 65+ projects.",
    keywords:
      "software agency, web development, e-commerce development, business automation, bot development, mobile app development, AI solutions, RPA, custom software",
  },

  nav: {
    services: "Services",
    work: "Work",
    process: "Process",
    tech: "Stack",
    faq: "FAQ",
    contact: "Contact",
    cta: "Start a project",
  },

  hero: {
    badge: "Taking on new projects",
    line1Start: "Let",
    rotating: ["software", "automation", "AI", "a bot"],
    line1End: "do the work.",
    line2: "You focus on growth.",
    description:
      "From corporate sites and online stores to bots that run your operations overnight and AI assistants that never clock out — we turn ideas into working products. Design, code, launch and support under one roof.",
    primaryCta: "Book a free discovery call",
    secondaryCta: "See our work",
    scroll: "Scroll",
    highlights: [
      { value: "48 hours", label: "to a proposal" },
      { value: "100%", label: "source code is yours" },
      { value: "3 months", label: "free support" },
    ],
  },

  marquee: {
    label: "Technologies we use",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "React Native",
      "Flutter",
      "Docker",
      "AWS",
      "OpenAI",
      "Claude",
      "n8n",
      "Selenium",
      "Stripe",
      "Shopify",
    ],
  },

  services: {
    label: "Services",
    title: "Tell us the problem.\nWe come back with a product.",
    description:
      "We specialise in four areas. Most projects need two or three of them at once — that is exactly why getting all of it from one team matters.",
    items: [
      {
        slug: "web",
        icon: "globe",
        title: "Websites & E-Commerce",
        tagline: "Built to sell, not just to exist",
        description:
          "Corporate sites, landing pages and fully custom e-commerce systems. Fast to load, easy to find on Google, flawless on mobile.",
        bullets: [
          "Corporate & marketing websites",
          "Custom e-commerce with payment integration",
          "Admin panel so you manage your own content",
          "Technical SEO and performance work",
        ],
      },
      {
        slug: "otomasyon",
        icon: "workflow",
        title: "Automation & Bots",
        tagline: "Hand the repetitive work to software",
        description:
          "We automate the manual work that eats your hours. Data collection, reporting, system-to-system transfers, WhatsApp and Telegram bots.",
        bullets: [
          "Business process automation (RPA)",
          "Web scraping and automated reporting",
          "WhatsApp / Telegram / Discord bots",
          "System integrations and API bridges",
        ],
      },
      {
        slug: "uygulama",
        icon: "smartphone",
        title: "Mobile & Desktop Apps",
        tagline: "Solutions that live in the pocket",
        description:
          "Mobile apps shipped to iOS and Android from a single codebase, plus Windows desktop software tailored to your operation.",
        bullets: [
          "iOS & Android app development",
          "Windows desktop software",
          "App Store & Google Play submission",
          "Offline mode and background sync",
        ],
      },
      {
        slug: "yapay-zeka",
        icon: "sparkles",
        title: "AI Solutions",
        tagline: "A teammate that never gets tired",
        description:
          "Chatbots that speak from your own data, document analysis, smart search and AI assistants embedded into your workflows.",
        bullets: [
          "Chatbots trained on your own data (RAG)",
          "Document / invoice / contract analysis",
          "AI-assisted customer support",
          "AI integrated into your existing software",
        ],
      },
    ],
  },

  work: {
    label: "Work",
    title: "Less talking.\nHere is what we shipped.",
    description:
      "None of these are concepts: every one is a product we built ourselves, live right now. Download them, try them — then ask for the same quality on your own project.",
    viewApp: "View on App Store",
    viewSite: "Visit site",
    swipeHint: "Swipe to explore",
    items: [
      {
        slug: "eczanio",
        type: "web",
        client: "Live Product · Automation",
        title: "Eczanio",
        description:
          "Invoice automation for pharmacies: drop the e-invoice XML — Eczanio reads it, tracks your discount and agreement targets, and pushes everything to Botanik EOS automatically.",
        result: "Live — in beta with invited pharmacies",
        tags: ["Windows", "Automation", "GDPR-ready"],
        accent: "cyan",
        image: "/projects/eczanio.jpg",
        href: "https://eczanio.com",
      },
      {
        slug: "motionmenu",
        type: "web",
        client: "Live Product · Web Platform",
        title: "MotionMenü",
        description:
          "Animated 3D digital menus for restaurants: QR menus, appetite-driving product videos and smart analytics in one platform.",
        result: "Live — motionmenu.food",
        tags: ["3D Menus", "QR", "Analytics"],
        accent: "emerald",
        image: "/projects/motionmenu.jpg",
        href: "https://motionmenu.food",
      },
      {
        slug: "aytemiz",
        type: "client",
        client: "Corporate Work · Energy",
        title: "Aytemiz",
        description:
          "Corporate software work for Aytemiz, one of the leading fuel distribution brands in Turkey.",
        result: "Corporate reference",
        tags: ["Corporate", "Software"],
        accent: "cyan",
        image: "/projects/aytemiz-logo.svg",
        href: "",
      },
      {
        slug: "guardiva",
        type: "app",
        client: "App Store · Utilities",
        title: "Guardiva",
        description:
          "Your last line of defense against scam texts: filters spam SMS smartly, on device, without touching your privacy.",
        result: "Live on the App Store · 5.0★",
        tags: ["iOS", "SMS Filter", "Privacy"],
        accent: "violet",
        image: "/projects/guardiva-icon.png",
        href: "https://apps.apple.com/app/guardiva-spam-sms-blocker/id6759835099",
      },
      {
        slug: "clero",
        type: "app",
        client: "App Store · Finance",
        title: "Clero",
        description:
          "A calm finance assistant that tracks money owed to you, your debts and recurring subscriptions in one place.",
        result: "Live on the App Store",
        tags: ["iOS", "Finance", "Subscriptions"],
        accent: "amber",
        image: "/projects/clero-icon.png",
        href: "https://apps.apple.com/app/clero-debt-sub-tracker/id6762064447",
      },
      {
        slug: "airu",
        type: "app",
        client: "App Store · Health",
        title: "Airu",
        description:
          "A personal sleep companion with scientifically designed soundscapes and haptic breathing guidance.",
        result: "Live on the App Store",
        tags: ["iOS", "Sleep", "Sound Design"],
        accent: "violet",
        image: "/projects/airu-icon.png",
        href: "https://apps.apple.com/app/airu-white-noise-sleep/id6761316226",
      },
      {
        slug: "zensip",
        type: "app",
        client: "App Store · Food & Drink",
        title: "ZenSip",
        description:
          "Your personal guide to mindful, alcohol-free drinks: answer a few questions and get a daily drink plan built around your goals.",
        result: "Live on the App Store",
        tags: ["iOS", "Wellness"],
        accent: "emerald",
        image: "/projects/zensip-icon.png",
        href: "https://apps.apple.com/app/zensip/id6782908040",
      },
      {
        slug: "veylo",
        type: "app",
        client: "App Store · Social",
        title: "Veylo",
        description:
          "Fashion is no longer one-way: share your outfit, get style feedback and discover looks with the community.",
        result: "Live on the App Store",
        tags: ["iOS", "Fashion", "Community"],
        accent: "pink",
        image: "/projects/veylo-icon.png",
        href: "https://apps.apple.com/app/veylo-stil-ve-moda/id6760236860",
      },
      {
        slug: "surprise-widget",
        type: "app",
        client: "App Store · Lifestyle",
        title: "Surprise Widget",
        description:
          "Send surprise cards that appear straight on your loved one's home-screen widget — no notifications, no app to open.",
        result: "Live on the App Store",
        tags: ["iOS", "WidgetKit"],
        accent: "cyan",
        image: "/projects/surprise-widget-icon.png",
        href: "https://apps.apple.com/app/surprise-widget/id6762283345",
      },
      {
        slug: "ggd",
        type: "client",
        client: "Corporate Work · NGO",
        title: "Genç Girişimciler Derneği",
        description:
          "Software and technology support for the digital side of the Young Entrepreneurs Association.",
        result: "Corporate reference",
        tags: ["NGO", "Digital"],
        accent: "violet",
        image: "",
        href: "",
      },
      {
        slug: "ilkerkara",
        type: "web",
        client: "Client Project · Website",
        title: "ilkerkara.net",
        description:
          "Personal brand site for author and speaker Ilker Kara: his story, his book and contact under one roof.",
        result: "Live — ilkerkara.net",
        tags: ["Website", "Personal Brand"],
        accent: "pink",
        image: "/projects/ilkerkara.jpg",
        href: "https://ilkerkara.net",
      },
    ],
  },

  process: {
    label: "How We Work",
    title: "No surprises.\nYou always know where things stand.",
    description:
      "Uncertainty is what kills software projects. We split the work into four clear steps, and every step ends with something you can actually look at.",
    steps: [
      {
        number: "01",
        title: "Discovery & Analysis",
        duration: "2–4 days",
        description:
          "We talk about the problem you want solved, not the feature list you arrived with. It ends with a clear proposal: scope, timeline, price.",
        deliverable: "Scope document + fixed-price proposal",
      },
      {
        number: "02",
        title: "Design & Prototype",
        duration: "1–2 weeks",
        description:
          "Before a line of code, we design the interface and turn it into a clickable prototype. This is the cheapest moment to change your mind.",
        deliverable: "Clickable prototype + approved design",
      },
      {
        number: "03",
        title: "Development",
        duration: "2–8 weeks",
        description:
          "You see a working build every two weeks. No months of silence — you watch the progress with your own eyes.",
        deliverable: "Live demos every two weeks",
      },
      {
        number: "04",
        title: "Launch & Support",
        duration: "Ongoing",
        description:
          "We ship it, train your team and stay reachable afterwards. The entire source code belongs to you.",
        deliverable: "Live product + training + maintenance",
      },
    ],
  },

  stats: {
    label: "By the numbers",
    title: "Results, not promises.",
    items: [
      { value: 65, suffix: "+", label: "Projects delivered" },
      { value: 30, suffix: "+", label: "Happy clients" },
      { value: 7, suffix: " yrs", label: "Industry experience" },
      { value: 98, suffix: "%", label: "On-time delivery" },
    ],
  },

  tech: {
    label: "Stack",
    title: "Technology chosen for\nthe project, not the trend.",
    description:
      "We do not hit every nail with the same hammer. Below is what we use day to day — which of it fits your project is something we decide together on the call.",
    groups: [
      {
        title: "Web & Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Astro"],
      },
      {
        title: "Backend & Data",
        items: ["Node.js", "Python", "PostgreSQL", "Redis", "Supabase"],
      },
      {
        title: "Mobile & Desktop",
        items: ["React Native", "Flutter", "Electron", "Swift", "Kotlin"],
      },
      {
        title: "Automation & AI",
        items: ["OpenAI", "Claude", "LangChain", "n8n", "Selenium"],
      },
      {
        title: "Infrastructure",
        items: ["Docker", "AWS", "Vercel", "Cloudflare", "GitHub Actions"],
      },
    ],
  },

  testimonials: {
    label: "Testimonials",
    title: "What the teams\nwe work with say",
    items: [
      {
        quote:
          "Invoice entry was my least favourite job at the pharmacy. Now I just drop the XML — Eczanio handles the discount and agreement tracking, and the Botanik transfer happens by itself. End-of-month overtime is gone.",
        author: "Caner K.",
        role: "Pharmacy Owner",
      },
      {
        quote:
          "We used to type production and shift data into Excel by hand. Since the automation went in, the reports are ready by morning — I deal with production now, not data entry.",
        author: "Burak Ç.",
        role: "Factory Production Supervisor",
      },
    ],
  },

  faq: {
    label: "FAQ",
    title: "Questions you might have",
    description: "If your question is not here, write to us — we reply the same day.",
    items: [
      {
        question: "How long does a project take?",
        answer:
          "A marketing site is usually 1–2 weeks, an e-commerce build or custom dashboard 4–8 weeks, a full mobile app 8–12 weeks. After the discovery call we give you a committed date, not an estimate.",
      },
      {
        question: "How does pricing work?",
        answer:
          "Fixed price per project, not hourly. Once scope is agreed the number does not move — no surprise invoices unless you expand the scope yourself. Payment is split into milestones.",
      },
      {
        question: "Do I own the source code?",
        answer:
          "Yes, all of it. The repository, server access and every account is transferred to your name. You are never locked in — you could continue with another team tomorrow.",
      },
      {
        question: "Is there support after launch?",
        answer:
          "Every project includes 3 months of free bug fixing. After that we offer monthly maintenance plans, but they are optional. For anything critical you can reach us regardless of how much time has passed.",
      },
      {
        question: "Will you take over an unfinished project?",
        answer:
          "We will. First we review the existing code and give you an honest call: continue or rewrite? Whichever is genuinely better for you is what we will tell you.",
      },
      {
        question: "Where are you located? Do you only serve İzmir?",
        answer:
          "We are based in İzmir, Turkey. We meet in person around İzmir and work remotely with clients across Turkey and abroad — most projects run fully online anyway.",
      },
      {
        question: "Do you work with clients abroad?",
        answer:
          "Yes. We work remotely, communicate in English and take meetings across time zones. Payment can be handled through international methods.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Let's talk about your project.",
    description:
      "Fill in the form or message us directly on WhatsApp. We reply within 48 hours with scope and pricing — the call is free and there is no obligation to continue.",
    form: {
      name: "Your name",
      namePlaceholder: "Full name",
      email: "Email",
      emailPlaceholder: "you@company.com",
      company: "Company (optional)",
      companyPlaceholder: "Company name",
      service: "What is it about?",
      servicePlaceholder: "Select a service",
      serviceOptions: [
        "Website / E-commerce",
        "Automation / Bot",
        "Mobile / Desktop app",
        "AI solution",
        "Not sure yet",
      ],
      budget: "Budget range",
      budgetPlaceholder: "Select a range",
      budgetOptions: [
        "Under $1,000",
        "$1,000 – $3,000",
        "$3,000 – $8,000",
        "Over $8,000",
        "Not decided yet",
      ],
      message: "About your project",
      messagePlaceholder:
        "Describe what you want to build in a few sentences. What problem are you trying to solve?",
      submit: "Request a proposal",
      submitting: "Sending...",
      successTitle: "Your message reached us.",
      successBody:
        "We will get back to you within 48 hours at the latest. If it is urgent, message us on WhatsApp.",
      errorTitle: "Message could not be sent.",
      errorBody: "Please try again or email us directly:",
      reset: "Send another message",
      required: "This field is required",
      invalidEmail: "Enter a valid email address",
      tooShort: "Could you give us a bit more detail? (at least 20 characters)",
    },
    direct: {
      whatsapp: "Message on WhatsApp",
      whatsappMessage:
        "Hi, I found you through your website. I'd like to talk about a project.",
      email: "Send an email",
      responseTime: "Average response time: 4 hours",
    },
  },

  footer: {
    tagline:
      "A team that builds software from idea to launch. Web, automation, mobile and AI.",
    navTitle: "Menu",
    servicesTitle: "Services",
    contactTitle: "Contact",
    socialTitle: "Social",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    ctaTitle: "Got a project in mind?",
    ctaDescription:
      "Talking costs nothing. Describe the idea and we will tell you how long it takes and what it costs.",
    ctaButton: "Tell us about it",
  },

  common: {
    langSwitch: "TR — Türkçe",
    menu: "Menu",
    close: "Close",
  },
};
