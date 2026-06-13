"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChoiceOption } from "@/data/questions";

interface ChoiceQuestionViewProps<T extends string> {
  title: string;
  options: ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

export function ChoiceQuestionView<T extends string>({
  title,
  options,
  value,
  onChange,
}: ChoiceQuestionViewProps<T>) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl">{title}</h2>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option, i) => {
          const selected = value === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-right text-base font-semibold transition-all duration-150",
                selected
                  ? "border-brand-600 bg-brand-50 text-brand-700 shadow-glow"
                  : "border-slate-100 bg-white text-ink hover:border-brand-200 hover:bg-brand-50/40"
              )}
            >
              <span>{option.label}</span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  selected ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 text-transparent"
                )}
              >
                <Check size={14} strokeWidth={3} />
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
