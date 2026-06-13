"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, RotateCcw } from "lucide-react";
import { AssessmentResult } from "@/types";
import { ARCHETYPES } from "@/data/archetypes";
import { getLastAssessmentResult } from "@/lib/storage";
import { ArchetypeReveal } from "@/components/result/archetype-reveal";
import { SuggestedPaths } from "@/components/result/suggested-paths";
import { LeadCapture } from "@/components/result/lead-capture";
import { Button } from "@/components/ui/button";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getLastAssessmentResult();
    if (!stored) {
      router.replace("/assessment");
      return;
    }
    setResult(stored);
    setLoading(false);
  }, [router]);

  if (loading || !result) {
    return <main className="min-h-screen bg-white" />;
  }

  const archetype = ARCHETYPES[result.archetypeId];

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
              <Compass size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-ink">MedPath</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            نتیجه ارزیابی شما
          </h1>
        </motion.div>

        <ArchetypeReveal archetype={archetype} confidenceScore={result.confidenceScore} />

        <SuggestedPaths archetype={archetype} />

        <div className="mt-8">
          <LeadCapture assessmentResultId={result.id} />
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="ghost" size="sm">
            <Link href="/assessment" className="flex items-center gap-2">
              <RotateCcw size={14} />
              انجام دوباره ارزیابی
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
