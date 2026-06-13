"use client";

import { motion } from "framer-motion";
import { CareerArchetype } from "@/types";

interface SuggestedPathsProps {
  archetype: CareerArchetype;
}

export function SuggestedPaths({ archetype }: SuggestedPathsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-ink sm:text-xl">۳ مسیر پیشنهادی برتر</h3>

      <div className="mt-4 space-y-3">
        {archetype.suggestedPaths.map((path, i) => (
          <motion.div
            key={path.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-soft"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
              style={{ backgroundColor: archetype.color }}
            >
              {i + 1}
            </div>
            <div>
              <h4 className="text-base font-bold text-ink">{path.title}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-500">{path.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
