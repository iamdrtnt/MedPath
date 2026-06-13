# MedPath

پلتفرم تصمیم‌گیری شغلی برای پزشکان ایرانی — نسخه MVP

MedPath به پزشکان کمک می‌کند قبل از گرفتن تصمیم‌های بزرگ حرفه‌ای (رزیدنتی،
مهاجرت، کسب‌وکار شخصی و ...) با پاسخ به چند سؤال کوتاه، نمایه شغلی خود را
کشف کنند و مسیرهای پیشنهادی متناسب با اهداف خود را ببینند.

## تکنولوژی‌ها

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui** primitives (Radix UI based)
- **Framer Motion** برای انیمیشن
- **Lucide Icons**
- فونت **Vazirmatn** از طریق `next/font/google`

## شروع به کار

```bash
npm install
npm run dev
```

سپس آدرس [http://localhost:3000](http://localhost:3000) را در مرورگر باز کنید.

## ساختار پروژه

```
app/
  page.tsx              # صفحه اصلی (لندینگ)
  assessment/page.tsx   # ویزارد ارزیابی چند مرحله‌ای
  result/page.tsx       # صفحه نتیجه + لید کپچر
  layout.tsx            # layout اصلی + فونت Vazirmatn + RTL
  globals.css

components/
  ui/                   # کامپوننت‌های پایه (Button, Card, Progress, Slider, ...)
  landing/              # بخش‌های صفحه اصلی (Hero, Problem, How it works, ...)
  assessment/           # کامپوننت‌های ویزارد ارزیابی
  result/               # کامپوننت‌های صفحه نتیجه

data/
  questions.ts          # تعریف سؤالات ارزیابی
  archetypes.ts         # تعریف ۴ نمایه شغلی و مسیرهای پیشنهادی

lib/
  scoring-engine.ts     # موتور امتیازدهی rule-based (بدون AI)
  storage.ts            # لایه ذخیره‌سازی محلی (localStorage)، آماده برای Supabase
  use-assessment.ts     # هوک مدیریت state ویزارد
  utils.ts

types/
  index.ts              # تایپ‌های اصلی: AssessmentAnswers, CareerArchetype, AssessmentResult, Lead
```

## موتور امتیازدهی (Scoring Engine)

موتور امتیازدهی در `lib/scoring-engine.ts` کاملاً rule-based است (بدون AI).
هر پاسخ امتیازی به یک یا چند نمایه شغلی (archetype) اختصاص می‌دهد و نمایه
با بالاترین امتیاز به‌عنوان نتیجه نهایی انتخاب می‌شود. برای افزودن سؤال یا
نمایه جدید:

1. در `types/index.ts` تایپ پاسخ یا `ArchetypeId` جدید را اضافه کنید.
2. در `data/questions.ts` سؤال جدید را تعریف کنید.
3. در `data/archetypes.ts` محتوای نمایه جدید را تعریف کنید.
4. در `lib/scoring-engine.ts` یک قانون امتیازدهی جدید به آرایه `RULES` اضافه کنید.

## ذخیره‌سازی و آمادگی برای Supabase

در حال حاضر نتایج ارزیابی و اطلاعات لیدها در `localStorage` مرورگر ذخیره
می‌شوند (`lib/storage.ts`). ساختار داده‌ها دقیقاً با تایپ‌های
`AssessmentResult` و `Lead` مطابقت دارد، بنابراین برای مهاجرت به Supabase
کافی است:

1. جدول‌های `assessment_results` و `leads` را با همان ساختار بسازید.
2. توابع `saveAssessmentResult`, `getLastAssessmentResult`, `saveLead` و
   `getAllLeads` را با کوئری‌های Supabase جایگزین کنید (signature توابع
   بدون تغییر باقی می‌ماند).

## نکات طراحی

- رنگ اصلی برند: `#2563EB`
- پس‌زمینه: `#FFFFFF` / کارت‌ها: `#F8FAFC`
- متن: `#0F172A`
- المان امضادار (Signature element): نمودار «انشعاب مسیر» (Path Divergence
  Diagram) که در هرو صفحه اصلی نمایش داده می‌شود — یک نقطه تصمیم که به چهار
  مسیر شغلی متفاوت منشعب می‌شود، در راستای مفهوم اصلی محصول: «قبل از انتخاب،
  آینده را ببین».
