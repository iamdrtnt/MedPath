"use client";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface SliderQuestionViewProps {
  title: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  value: number | null;
  onChange: (value: number) => void;
}

export function SliderQuestionView({
  title,
  min,
  max,
  minLabel,
  maxLabel,
  value,
  onChange,
}: SliderQuestionViewProps) {
  const current = value ?? Math.round((min + max) / 2);

  return (
    <div className="w-full">
      <h2 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl">{title}</h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="mb-8 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-2xl font-extrabold text-white shadow-glow tabular-nums">
            {current}
          </span>
        </div>

        <Slider
          min={min}
          max={max}
          step={1}
          value={[current]}
          onValueChange={(vals) => onChange(vals[0])}
          dir="rtl"
        />

        <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-400">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </motion.div>
    </div>
  );
}
