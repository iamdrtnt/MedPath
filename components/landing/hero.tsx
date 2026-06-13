"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathDivergenceDiagram } from "./path-divergence-diagram";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Ambient background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-brand-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 lg:mx-0"
            >
              <Sparkles size={14} />
              <span>پلتفرم تصمیم‌گیری شغلی برای پزشکان</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
            >
              کدام مسیر حرفه‌ای برای شما{" "}
              <span className="text-brand-600">مناسب‌تر</span> است؟
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-500 sm:text-lg lg:mx-0"
            >
              در کمتر از ۲ دقیقه، مسیرهای شغلی مناسب خود را کشف کنید و آینده
              حرفه‌ای خود را شفاف‌تر ببینید.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <Button asChild size="lg" className="group w-full sm:w-auto">
                <Link href="/assessment">
                  شروع ارزیابی رایگان
                  <ArrowLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-1"
                  />
                </Link>
              </Button>
              <p className="text-sm text-slate-400">بدون نیاز به ثبت‌نام &middot; حدود ۲ دقیقه</p>
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl border border-slate-100 bg-surface-card p-6 shadow-soft-lg sm:p-10">
              <PathDivergenceDiagram />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
