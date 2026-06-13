import { ArchetypeId, CareerArchetype } from "@/types";

export const ARCHETYPES: Record<ArchetypeId, CareerArchetype> = {
  future_specialist: {
    id: "future_specialist",
    title: "متخصص آینده",
    shortLabel: "Future Specialist",
    description:
      "شما به دنبال جایگاه علمی، تخصص عمیق و شناخته‌شدن در حوزه‌ی کاری خود هستید. مسیر رزیدنتی و تخصص‌های پرتقاضا می‌تواند آینده‌ای را برایتان بسازد که هم از نظر علمی و هم از نظر مالی رضایت‌بخش باشد.",
    color: "#7C3AED",
    icon: "GraduationCap",
    suggestedPaths: [
      {
        title: "چشم‌پزشکی",
        description: "یکی از پرتقاضاترین و پردرآمدترین تخصص‌های بالینی با تعادل خوب کار و زندگی.",
      },
      {
        title: "پوست، مو و زیبایی",
        description: "تخصصی با رشد سریع بازار، درآمد بالا و امکان فعالیت در کلینیک‌های خصوصی.",
      },
      {
        title: "رادیولوژی",
        description: "تخصصی تکنولوژی‌محور با امکانات گزارش‌دهی از راه دور و فرصت‌های بین‌المللی.",
      },
    ],
  },
  global_physician: {
    id: "global_physician",
    title: "پزشک جهانی",
    shortLabel: "Global Physician",
    description:
      "اولویت اصلی شما ساختن یک زندگی و حرفه در خارج از کشور است. مسیرهای مهاجرت تخصصی برای پزشکان می‌توانند شما را به سمت سیستم‌های سلامت با ثبات‌تر و درآمد ارزی هدایت کنند.",
    color: "#0EA5E9",
    icon: "Globe2",
    suggestedPaths: [
      {
        title: "مهاجرت آلمان (Approbation)",
        description: "مسیر شناخته‌شده برای فعالیت پزشکی در آلمان با نیاز به یادگیری زبان آلمانی.",
      },
      {
        title: "مهاجرت کانادا (NDEB / MCCQE)",
        description: "مسیر بلندمدت اما با کیفیت زندگی بالا و امکان اقامت دائم برای خانواده.",
      },
      {
        title: "رزیدنتی داخل کشور + مهاجرت بعدی",
        description: "ابتدا کسب تخصص در ایران، سپس استفاده از آن برای مسیرهای مهاجرتی تخصصی‌تر.",
      },
    ],
  },
  entrepreneur_doctor: {
    id: "entrepreneur_doctor",
    title: "پزشک کارآفرین",
    shortLabel: "Entrepreneur Doctor",
    description:
      "شما تمایل دارید کنترل حرفه‌ای خود را در دست بگیرید و فراتر از کار بالینی، یک کسب‌وکار یا برند شخصی بسازید. ریسک‌پذیری شما زمینه‌ای مناسب برای مسیرهای کارآفرینانه فراهم می‌کند.",
    color: "#F59E0B",
    icon: "Rocket",
    suggestedPaths: [
      {
        title: "تأسیس کلینیک تخصصی",
        description: "راه‌اندازی یا مشارکت در کلینیک با تمرکز بر یک حوزه‌ی پردرآمد و رو به رشد.",
      },
      {
        title: "برند شخصی و محتوا در حوزه سلامت",
        description: "ساخت اعتبار حرفه‌ای از طریق تولید محتوا و در نهایت تبدیل آن به محصول یا خدمات.",
      },
      {
        title: "استارتاپ سلامت (HealthTech)",
        description: "ورود به فضای کسب‌وکارهای فناوری سلامت با دانش بالینی به‌عنوان مزیت رقابتی.",
      },
    ],
  },
  lifestyle_doctor: {
    id: "lifestyle_doctor",
    title: "پزشک متعادل",
    shortLabel: "Lifestyle Doctor",
    description:
      "تعادل بین کار و زندگی برای شما در اولویت است. مسیرهایی که زمان کافی برای زندگی شخصی، خانواده و آرامش ذهنی فراهم کنند، می‌توانند رضایت بلندمدت بیشتری نسبت به درآمد یا جایگاه صرف ایجاد کنند.",
    color: "#10B981",
    icon: "HeartHandshake",
    suggestedPaths: [
      {
        title: "پزشکی خانواده",
        description: "ساعات کاری منظم‌تر، ارتباط پایدار با بیماران و کمتر بودن فشار اورژانسی.",
      },
      {
        title: "طب کار",
        description: "فعالیت در محیط‌های سازمانی با برنامه‌ی کاری ثابت و بدون شیفت‌های شبانه.",
      },
      {
        title: "فعالیت‌های غیرکلینیکی",
        description: "نقش‌هایی در آموزش، مشاوره سلامت یا شرکت‌های دارویی با استرس بالینی کمتر.",
      },
    ],
  },
};

export const ARCHETYPE_LIST = Object.values(ARCHETYPES);
