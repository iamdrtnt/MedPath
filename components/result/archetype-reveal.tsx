"use client";

import { motion } from "framer-motion";
import { GraduationCap, Globe2, Rocket, HeartHandshake, LucideIcon } from "lucide-react";
import { CareerArchetype } from "@/types";
import { Progress } from "@/components/ui/progress";

const ICON_MAP: Record<string, LucideIcon> = {
  GraduationCap,
  Globe2,
  Rocket,
  HeartHandshake,
};

interface ArchetypeRevealProps {
  archetype: CareerArchetype;
  confidenceScore: number;
}

export function ArchetypeReveal({ archetype, confidenceScore }: ArchetypeRevealProps) {
  const Icon = ICON_MAP[archetype.icon] ?? GraduationCap;

  return (
    <div className="rounded-3xl border border-slate-100 bg-surface-card p-6 shadow-soft-lg sm:p-10">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl shadow-glow"
          style={{ backgroundColor: archetype.color }}
        >
          <Icon size={36} strokeWidth={2} className="text-white" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-xs font-bold uppercase tracking-widest text-slate-400"
        >
          {archetype.shortLabel}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
        >
          {archetype.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base"
        >
          {archetype.description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mt-8 rounded-2xl border border-slate-100 bg-white p-5"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">تحلیل اولیه</span>
          <span className="text-sm font-bold tabular-nums" style={{ color: archetype.color }}>
            {confidenceScore}٪
          </span>
        </div>
        <Progress value={confidenceScore} indicatorColor={archetype.color} />
        <p className="mt-3 text-xs leading-6 text-slate-400">
          این درصد نشان می‌دهد پاسخ‌های شما تا چه میزان با ویژگی‌های این نمایه
          شغلی همخوانی دارد. این یک تحلیل اولیه است و با تکمیل نسخه کامل
          MedPath دقیق‌تر خواهد شد.
        </p>
      </motion.div>
    </div>
  );
}
