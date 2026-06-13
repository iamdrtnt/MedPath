"use client";

import { motion } from "framer-motion";
import { ListChecks, Brain, Compass } from "lucide-react";

const STEPS = [
  {
    icon: ListChecks,
    title: "پاسخ به چند سؤال کوتاه",
    description: "در حدود ۲ دقیقه به چند سؤال درباره اهداف و شرایط فعلی خود پاسخ دهید.",
  },
  {
    icon: Brain,
    title: "تحلیل اهداف و ترجیحات حرفه‌ای",
    description: "موتور تحلیل MedPath پاسخ‌های شما را بررسی و الگوهای اصلی را شناسایی می‌کند.",
  },
  {
    icon: Compass,
    title: "دریافت مسیرهای پیشنهادی",
    description: "نمایه شغلی خود را ببینید و با مسیرهای پیشنهادی آشنا شوید.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl"
          >
            چطور کار می‌کند؟
          </motion.h2>
        </div>

        <div className="relative mt-14">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-7 right-0 left-0 hidden h-px bg-slate-200 lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
                  <step.icon size={24} strokeWidth={2.25} />
                </div>
                <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
