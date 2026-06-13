"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="bg-surface-card py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl"
        >
          آینده‌ی حرفه‌ای خود را امروز روشن کنید
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500 sm:text-lg"
        >
          قبل از اینکه چند سال از عمرت را صرف یک مسیر کنی، آینده آن را ببین.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Button asChild size="lg" className="group">
            <Link href="/assessment">
              شروع ارزیابی رایگان
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
