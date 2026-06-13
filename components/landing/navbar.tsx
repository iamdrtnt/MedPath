"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
            <Compass size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-ink">MedPath</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button asChild size="sm">
            <Link href="/assessment">شروع ارزیابی</Link>
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
