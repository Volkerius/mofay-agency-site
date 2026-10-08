export const tr = {
  meta: {
    title: "Mofay | İzmir Yazılım, Otomasyon ve Mobil Uygulama Ajansı",
    description:
      "İzmir merkezli yazılım ajansı. Kurumsal web siteleri, e-ticaret, iş süreci otomasyonu, mobil uygulama ve yapay zekâ çözümleri. 7 yıllık deneyim, 65+ proje.",
    keywords:
      "yazılım ajansı, yazılım firması, web sitesi yaptırma, kurumsal web sitesi, e-ticaret sitesi kurma, otomasyon yazılımı, iş süreci otomasyonu, bot geliştirme, mobil uygulama yaptırma, yapay zeka çözümleri, RPA, özel yazılım geliştirme, izmir yazılım firması, izmir web tasarım, izmir mobil uygulama, izmir otomasyon",
  },

  nav: {
    services: "Hizmetler",
    work: "İşlerimiz",
    process: "Süreç",
    tech: "Teknoloji",
    faq: "S.S.S.",
    contact: "İletişim",
    cta: "Proje Başlat",
  },

  hero: {
    badge: "Yeni proje kontenjanı açık",
    line1Start: "İşi",
    rotating: ["yazılım", "otomasyon", "yapay zekâ", "bir bot"],
    line1End: "yapsın.",
    line2: "Siz büyütmeye bakın.",
    description:
      "Kurumsal web sitesinden e-ticarete, iş süreçlerinizi tek başına yürüten botlardan yapay zekâ destekli asistanlara kadar — fikri alır, çalışan ürüne çeviririz. Tasarım, kod, yayın ve destek tek elden.",
    primaryCta: "Ücretsiz keşif görüşmesi",
    secondaryCta: "İşlerimize göz at",
    scroll: "Kaydır",
    highlights: [
      { value: "48 saat", label: "içinde teklif" },
      { value: "%100", label: "kaynak kodu sizin" },
      { value: "3 ay", label: "ücretsiz destek" },
    ],
  },

  marquee: {
    label: "Kullandığımız teknolojiler",
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
    label: "Hizmetler",
    title: "Bir ihtiyaç söyleyin,\nçalışan bir ürünle dönelim.",
    description:
      "Dört ana alanda uzmanlaşıyoruz. Çoğu projede bunların ikisi ya da üçü birlikte çalışıyor — hepsini tek ekipten almanın farkı burada.",
    items: [
      {
        slug: "web",
        icon: "globe",
        title: "Web Sitesi & E-Ticaret",
        tagline: "Görünmek için değil, satmak için",
        description:
          "Kurumsal siteler, landing page'ler ve baştan sona özel e-ticaret sistemleri. Hızlı açılan, Google'da bulunan, mobilde kusursuz duran siteler.",
        bullets: [
          "Kurumsal & tanıtım siteleri",
          "Özel e-ticaret ve ödeme entegrasyonu",
          "Yönetim paneli ile kendi içeriğinizi yönetin",
          "Teknik SEO ve hız optimizasyonu",
        ],
      },
      {
        slug: "otomasyon",
        icon: "workflow",
        title: "Otomasyon & Bot",
        tagline: "Tekrar eden işi yazılıma devredin",
        description:
          "Elle yapılan, saatler yiyen işleri otomatikleştiriyoruz. Veri toplama, raporlama, sistemler arası aktarım, WhatsApp ve Telegram botları.",
        bullets: [
          "İş süreci otomasyonu (RPA)",
          "Veri kazıma ve otomatik raporlama",
          "WhatsApp / Telegram / Discord botları",
          "Sistemler arası entegrasyon ve API köprüleri",
        ],
      },
      {
        slug: "uygulama",
        icon: "smartphone",
        title: "Mobil & Masaüstü Uygulama",
        tagline: "Cebe ve masaüstüne inen çözümler",
        description:
          "iOS ve Android'de tek kod tabanıyla yayına çıkan mobil uygulamalar, işletmenize özel Windows masaüstü yazılımları.",
        bullets: [
          "iOS & Android uygulama geliştirme",
          "Windows masaüstü yazılımları",
          "App Store & Google Play yayın süreci",
          "Çevrimdışı çalışma ve senkronizasyon",
        ],
      },
      {
        slug: "yapay-zeka",
        icon: "sparkles",
        title: "Yapay Zekâ Çözümleri",
        tagline: "Ekibinize hiç yorulmayan bir eleman",
        description:
          "Kendi verinizle konuşan chatbotlar, belge analizi, akıllı arama ve iş akışlarınıza gömülü yapay zekâ asistanları.",
        bullets: [
          "Kendi verinizle çalışan chatbot (RAG)",
          "Belge / fatura / sözleşme analizi",
          "Yapay zekâ destekli müşteri desteği",
          "Mevcut yazılımınıza AI entegrasyonu",
        ],
      },
    ],
  },

  work: {
    label: "İşlerimiz",
    title: "Konuşmak yerine\nyaptıklarımızı gösterelim.",
    description:
      "Buradakilerin hiçbiri konsept değil: hepsi kendi geliştirdiğimiz, şu an yayında olan ürünler. İndirin, deneyin — aynı kaliteyi kendi projenizde isteyin.",
    viewApp: "App Store'da gör",
    viewSite: "Siteyi ziyaret et",
    swipeHint: "Kaydırarak gezin",
    items: [
      {
        slug: "eczanio",
        type: "web",
        client: "Canlı Ürün · Otomasyon",
        title: "Eczanio",
        description:
          "Eczaneler için fatura otomasyonu: e-fatura XML'ini bırakın — Eczanio okur, iskonto ve anlaşma hedefinizi takip eder, Botanik EOS'a otomatik aktarır.",
        result: "Canlı — davetli eczanelerle beta",
        tags: ["Windows", "Otomasyon", "KVKK Uyumlu"],
        accent: "cyan",
        image: "/projects/eczanio.jpg",
        href: "https://eczanio.com",
      },
      {
        slug: "motionmenu",
        type: "web",
        client: "Canlı Ürün · Web Platformu",
        title: "MotionMenü",
        description:
          "Restoranlar için hareketli 3B dijital menü: QR menü, iştah açan ürün videoları ve akıllı analiz araçları tek platformda.",
        result: "Canlı — motionmenu.food",
        tags: ["3B Menü", "QR", "Analitik"],
        accent: "emerald",
        image: "/projects/motionmenu.jpg",
        href: "https://motionmenu.food",
      },
      {
        slug: "aytemiz",
        type: "client",
        client: "Kurumsal İş · Enerji",
        title: "Aytemiz",
        description:
          "Türkiye'nin önde gelen akaryakıt markalarından Aytemiz için kurumsal yazılım çalışmaları yürüttük.",
        result: "Kurumsal referans",
        tags: ["Kurumsal", "Yazılım"],
        accent: "cyan",
        image: "/projects/aytemiz-logo.svg",
        href: "",
      },
      {
        slug: "guardiva",
        type: "app",
        client: "App Store · Araçlar",
        title: "Guardiva",
        description:
          "Dolandırıcılık mesajlarına karşı son savunma hattı: spam SMS'leri cihaz üzerinde, gizliliğe dokunmadan akıllıca filtreler.",
        result: "App Store'da yayında · 5.0★",
        tags: ["iOS", "SMS Filtresi", "Gizlilik"],
        accent: "violet",
        image: "/projects/guardiva-icon.png",
        href: "https://apps.apple.com/tr/app/guardiva-spam-sms-blocker/id6759835099",
      },
      {
        slug: "clero",
        type: "app",
        client: "App Store · Finans",
        title: "Clero",
        description:
          "Alacaklarınızı, borçlarınızı ve tekrarlayan abonelikleri tek yerde toplayan sade finans asistanı.",
        result: "App Store'da yayında",
        tags: ["iOS", "Finans", "Abonelik Takibi"],
        accent: "amber",
        image: "/projects/clero-icon.png",
        href: "https://apps.apple.com/tr/app/clero-debt-sub-tracker/id6762064447",
      },
      {
        slug: "airu",
        type: "app",
        client: "App Store · Sağlık",
        title: "Airu",
        description:
          "Bilimsel ses manzaraları ve dokunsal nefes rehberiyle uykuya dalmayı kolaylaştıran kişisel uyku yardımcısı.",
        result: "App Store'da yayında",
        tags: ["iOS", "Uyku", "Ses Tasarımı"],
        accent: "violet",
        image: "/projects/airu-icon.png",
        href: "https://apps.apple.com/tr/app/airu-white-noise-sleep/id6761316226",
      },
      {
        slug: "zensip",
        type: "app",
        client: "App Store · Yeme-İçme",
        title: "ZenSip",
        description:
          "Alkolsüz içecekler için kişisel rehber: birkaç soruyla hedeflerinize göre günlük içecek planı hazırlar.",
        result: "App Store'da yayında",
        tags: ["iOS", "Sağlıklı Yaşam"],
        accent: "emerald",
        image: "/projects/zensip-icon.png",
        href: "https://apps.apple.com/tr/app/zensip/id6782908040",
      },
      {
        slug: "veylo",
        type: "app",
        client: "App Store · Sosyal",
        title: "Veylo",
        description:
          "Moda artık tek yönlü değil: kombinini paylaş, stil geri bildirimi al, toplulukla birlikte keşfet.",
        result: "App Store'da yayında",
        tags: ["iOS", "Moda", "Topluluk"],
        accent: "pink",
        image: "/projects/veylo-icon.png",
        href: "https://apps.apple.com/tr/app/veylo-stil-ve-moda/id6760236860",
      },
      {
        slug: "surprise-widget",
        type: "app",
        client: "App Store · Yaşam",
        title: "Surprise Widget",
        description:
          "Sevdiklerinin ana ekranındaki widget'a anında düşen sürpriz kartlar gönder — bildirim yok, uygulama açmak yok.",
        result: "App Store'da yayında",
        tags: ["iOS", "WidgetKit"],
        accent: "cyan",
        image: "/projects/surprise-widget-icon.png",
        href: "https://apps.apple.com/tr/app/surprise-widget/id6762283345",
      },
      {
        slug: "ggd",
        type: "client",
        client: "Kurumsal İş · Dernek",
        title: "Genç Girişimciler Derneği",
        description:
          "Genç Girişimciler Derneği'nin dijital tarafında yazılım ve teknoloji desteği sağladık.",
        result: "Kurumsal referans",
        tags: ["Dernek", "Dijital"],
        accent: "violet",
        image: "",
        href: "",
      },
      {
        slug: "ilkerkara",
        type: "web",
        client: "Müşteri Projesi · Web Sitesi",
        title: "ilkerkara.net",
        description:
          "Yazar ve konuşmacı İlker Kara için kişisel marka sitesi: hikâyesi, kitabı ve iletişimi tek çatı altında.",
        result: "Canlı — ilkerkara.net",
        tags: ["Web Sitesi", "Kişisel Marka"],
        accent: "pink",
        image: "/projects/ilkerkara.jpg",
        href: "https://ilkerkara.net",
      },
    ],
  },

  process: {
    label: "Nasıl Çalışıyoruz",
    title: "Sürpriz yok.\nHer adımda ne olduğunu bilirsiniz.",
    description:
      "Yazılım projelerinin en büyük derdi belirsizlik. Biz süreci dört net adıma bölüyoruz ve her adımın sonunda elinizde görebileceğiniz bir çıktı oluyor.",
    steps: [
      {
        number: "01",
        title: "Keşif & Analiz",
        duration: "2–4 gün",
        description:
          "Ne istediğinizi değil, hangi problemi çözmek istediğinizi konuşuyoruz. Sonunda kapsam, süre ve fiyat net bir teklifle önünüzde oluyor.",
        deliverable: "Kapsam dokümanı + sabit fiyat teklifi",
      },
      {
        number: "02",
        title: "Tasarım & Prototip",
        duration: "1–2 hafta",
        description:
          "Tek satır kod yazmadan önce arayüzü tasarlayıp tıklanabilir prototipe çeviriyoruz. Değişiklik yapmanın en ucuz olduğu an burası.",
        deliverable: "Tıklanabilir prototip + onaylı tasarım",
      },
      {
        number: "03",
        title: "Geliştirme",
        duration: "2–8 hafta",
        description:
          "İki haftada bir çalışan bir sürüm görüyorsunuz. Aylarca karanlıkta beklemek yok; ilerlemeyi kendi gözünüzle takip ediyorsunuz.",
        deliverable: "İki haftalık canlı demolar",
      },
      {
        number: "04",
        title: "Yayın & Destek",
        duration: "Süresiz",
        description:
          "Yayına alıyor, ekibinize kullanmayı öğretiyor ve sonrasında da yanınızda kalıyoruz. Kaynak kodun tamamı sizin.",
        deliverable: "Canlı ürün + eğitim + bakım desteği",
      },
    ],
  },

  stats: {
    label: "Rakamlarla",
    title: "Söz değil, sonuç.",
    items: [
      { value: 65, suffix: "+", label: "Tamamlanan proje" },
      { value: 30, suffix: "+", label: "Mutlu müşteri" },
      { value: 7, suffix: " yıl", label: "Sektör deneyimi" },
      { value: 98, suffix: "%", label: "Zamanında teslim" },
    ],
  },

  tech: {
    label: "Teknoloji",
    title: "Modaya değil,\nprojeye uygun teknoloji.",
    description:
      "Her işi aynı çekiçle çakmıyoruz. Aşağıdakiler günlük kullandığımız araçlar — hangisinin sizin işinize uygun olduğunu keşif görüşmesinde birlikte belirliyoruz.",
    groups: [
      {
        title: "Web & Arayüz",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Astro"],
      },
      {
        title: "Sunucu & Veri",
        items: ["Node.js", "Python", "PostgreSQL", "Redis", "Supabase"],
      },
      {
        title: "Mobil & Masaüstü",
        items: ["React Native", "Flutter", "Electron", "Swift", "Kotlin"],
      },
      {
        title: "Otomasyon & Yapay Zekâ",
        items: ["OpenAI", "Claude", "LangChain", "n8n", "Selenium"],
      },
      {
        title: "Altyapı",
        items: ["Docker", "AWS", "Vercel", "Cloudflare", "GitHub Actions"],
      },
    ],
  },

  testimonials: {
    label: "Referanslar",
    title: "Birlikte çalıştığımız\nekipler ne diyor?",
    // Kullanıcı, adı geçen kişilerin metinleri onayladığını bildirdi (2026-08-22).
    items: [
      {
        quote:
          "Fatura girişi eczanede en sevmediğim işti. Artık XML'i bırakıyorum; iskonto ve anlaşma takibini Eczanio yapıyor, Botanik'e aktarım kendiliğinden oluyor. Ay sonu mesaisi diye bir şey kalmadı.",
        author: "Caner K.",
        role: "Eczane Sahibi",
      },
      {
        quote:
          "Üretim ve vardiya verilerini elle Excel'e giriyorduk. Kurulan otomasyondan sonra raporlar sabah hazır oluyor; ben artık veri toplamakla değil üretimle uğraşıyorum.",
        author: "Burak Ç.",
        role: "Fabrika Üretim Sorumlusu",
      },
    ],
  },

  faq: {
    label: "Sık Sorulanlar",
    title: "Aklınıza takılanlar",
    description: "Cevabını bulamadığınız bir şey varsa yazın, aynı gün dönüyoruz.",
    items: [
      {
        question: "Bir proje ne kadar sürer?",
        answer:
          "Tanıtım sitesi genelde 1–2 hafta, e-ticaret veya özel panel 4–8 hafta, kapsamlı bir mobil uygulama 8–12 hafta sürüyor. Keşif görüşmesinden sonra size tahmini değil, taahhüt edilen bir tarih veriyoruz.",
      },
      {
        question: "Fiyatlandırma nasıl çalışıyor?",
        answer:
          "Saatlik değil, proje bazlı sabit fiyat veriyoruz. Kapsam netleştikten sonra verdiğimiz rakam değişmez — kapsamı siz genişletmediğiniz sürece sürpriz fatura gelmez. Ödemeyi de aşamalara bölüyoruz.",
      },
      {
        question: "Proje bitince kaynak kodu bende mi olacak?",
        answer:
          "Evet, tamamı sizin. Kod deposu, sunucu erişimleri ve tüm hesaplar sizin adınıza devredilir. Bize bağımlı kalmanız gerekmez; isterseniz yarın başka bir ekiple devam edebilirsiniz.",
      },
      {
        question: "Teslimden sonra destek veriyor musunuz?",
        answer:
          "Her projede 3 ay ücretsiz hata giderme desteği var. Sonrası için aylık bakım paketleri sunuyoruz ama zorunlu değil. Kritik bir sorunda aradan ne kadar geçmiş olursa olsun bize ulaşabilirsiniz.",
      },
      {
        question: "Yarım kalmış bir projeyi devralır mısınız?",
        answer:
          "Alıyoruz. Önce mevcut kodu inceleyip dürüst bir değerlendirme yapıyoruz: devam mı etmeli, baştan mı yazmalı? Hangisi sizin lehinizeyse onu açıkça söylüyoruz.",
      },
      {
        question: "Nerede bulunuyorsunuz? Sadece İzmir'e mi hizmet veriyorsunuz?",
        answer:
          "Merkezimiz İzmir'de. İzmir içinde yüz yüze toplantı yapabiliyoruz; Türkiye'nin her yerine ve yurt dışına da uzaktan hizmet veriyoruz — projelerin çoğu zaten çevrim içi yürüyor.",
      },
      {
        question: "Yurt dışından proje alıyor musunuz?",
        answer:
          "Evet. Uzaktan çalışıyoruz, İngilizce yazışıyoruz ve farklı saat dilimlerinde toplantı yapabiliyoruz. Ödeme uluslararası yöntemlerle alınabiliyor.",
      },
    ],
  },

  contact: {
    label: "İletişim",
    title: "Projenizi konuşalım.",
    description:
      "Formu doldurun ya da doğrudan WhatsApp'tan yazın. 48 saat içinde kapsam ve fiyat teklifiyle dönüyoruz — görüşme ücretsiz, sonrasında devam etme zorunluluğu yok.",
    form: {
      name: "Adınız",
      namePlaceholder: "Ad Soyad",
      email: "E-posta",
      emailPlaceholder: "ornek@sirket.com",
      company: "Şirket (opsiyonel)",
      companyPlaceholder: "Şirket adı",
      service: "Hangi konuda?",
      servicePlaceholder: "Bir hizmet seçin",
      serviceOptions: [
        "Web sitesi / E-ticaret",
        "Otomasyon / Bot",
        "Mobil / Masaüstü uygulama",
        "Yapay zekâ çözümü",
        "Henüz emin değilim",
      ],
      budget: "Bütçe aralığı",
      budgetPlaceholder: "Bir aralık seçin",
      budgetOptions: [
        "25.000 ₺ altı",
        "25.000 – 75.000 ₺",
        "75.000 – 200.000 ₺",
        "200.000 ₺ üzeri",
        "Henüz belirlemedim",
      ],
      message: "Projeniz hakkında",
      messagePlaceholder:
        "Ne yapmak istediğinizi birkaç cümleyle anlatın. Çözmek istediğiniz problem nedir?",
      submit: "Teklif iste",
      submitting: "Gönderiliyor...",
      successTitle: "Mesajınız bize ulaştı.",
      successBody:
        "En geç 48 saat içinde dönüş yapacağız. Acil bir durumsa WhatsApp'tan yazabilirsiniz.",
      errorTitle: "Mesaj gönderilemedi.",
      errorBody: "Lütfen tekrar deneyin ya da doğrudan e-posta gönderin:",
      reset: "Yeni mesaj gönder",
      required: "Bu alan zorunlu",
      invalidEmail: "Geçerli bir e-posta adresi girin",
      tooShort: "Biraz daha detay verir misiniz? (en az 20 karakter)",
    },
    direct: {
      whatsapp: "WhatsApp'tan yaz",
      whatsappMessage:
        "Merhaba, web sitenizden yazıyorum. Bir proje hakkında konuşmak istiyorum.",
      email: "E-posta gönder",
      responseTime: "Ortalama yanıt süresi: 4 saat",
    },
  },

  footer: {
    tagline:
      "Fikirden yayına yazılım geliştiren bir ekip. Web, otomasyon, mobil ve yapay zekâ.",
    navTitle: "Menü",
    servicesTitle: "Hizmetler",
    contactTitle: "İletişim",
    socialTitle: "Sosyal",
    rights: "Tüm hakları saklıdır.",
    backToTop: "Yukarı dön",
    ctaTitle: "Bir projeniz mi var?",
    ctaDescription:
      "Konuşmak ücretsiz. Fikri anlatın; ne kadar süreceğini ve neye mal olacağını söyleyelim.",
    ctaButton: "Projeyi anlat",
  },

  common: {
    langSwitch: "EN — English",
    menu: "Menü",
    close: "Kapat",
  },
};

export type Dictionary = typeof tr;
