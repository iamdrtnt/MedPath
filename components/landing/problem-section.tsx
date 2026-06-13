"use client";

import { motion } from "framer-motion";
import { Stethoscope, Globe2, Home, Sparkles as Zap, Briefcase, Compass } from "lucide-react";

const OPTIONS = [
  { label: "رزیدنتی", icon: Stethoscope },
  { label: "مهاجرت", icon: Globe2 },
  { label: "پزشکی خانواده", icon: Home },
  { label: "زیبایی", icon: Zap },
  { label: "کسب‌وکار شخصی", icon: Briefcase },
  { label: "مسیرهای غیرکلینیکی", icon: Compass },
];

export function ProblemSection() {
  return (
    <section className="bg-surface-card py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl"
          >
            بسیاری از پزشکان نمی‌دانند قدم بعدی چیست
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg"
          >
            پزشکان جوان معمولاً بین گزینه‌های مختلفی مردد هستند و اغلب بدون
            تصویر واضحی از آینده تصمیم می‌گیرند.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {OPTIONS.map((opt, i) => (
            <motion.div
              key={opt.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-soft transition-transform duration-200 hover:-translate-y-1 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <opt.icon size={20} strokeWidth={2.25} />
              </div>
              <span className="text-sm font-semibold text-ink sm:text-base">{opt.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
