"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AssessmentProgress } from "@/components/assessment/assessment-progress";
import { ChoiceQuestionView } from "@/components/assessment/choice-question";
import { SliderQuestionView } from "@/components/assessment/slider-question";
import { AnalyzingLoader } from "@/components/assessment/analyzing-loader";
import { useAssessment } from "@/lib/use-assessment";

export default function AssessmentPage() {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const {
    stepIndex,
    totalSteps,
    currentQuestion,
    answers,
    setAnswer,
    goNext,
    goBack,
    isLastStep,
    canProceed,
    finish,
  } = useAssessment();

  const handleNext = () => {
    if (!canProceed) return;

    if (isLastStep) {
      setIsFinishing(true);
      // Simulate a short analysis delay for perceived value
      setTimeout(() => {
        finish();
        router.push("/result");
      }, 1800);
      return;
    }

    goNext();
  };

  if (isFinishing) {
    return (
      <main className="min-h-screen bg-white">
        <AnalyzingLoader />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-ink"
            aria-label="بازگشت به صفحه اصلی"
          >
            <X size={20} />
          </Link>
          <span className="text-sm font-bold text-ink">MedPath</span>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <AssessmentProgress stepIndex={stepIndex} totalSteps={totalSteps} />

        {/* Question content */}
        <div className="flex flex-1 items-center py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {currentQuestion?.type === "choice" && (
                <ChoiceQuestionView
                  title={currentQuestion.title}
                  options={currentQuestion.options}
                  value={answers[currentQuestion.id] as unknown as never}
                  onChange={(value) => setAnswer(currentQuestion.id, value as never)}
                />
              )}

              {currentQuestion?.type === "slider" && (
                <SliderQuestionView
                  title={currentQuestion.title}
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  minLabel={currentQuestion.minLabel}
                  maxLabel={currentQuestion.maxLabel}
                  value={answers[currentQuestion.id] as unknown as number | null}
                  onChange={(value) => setAnswer(currentQuestion.id, value as never)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={stepIndex === 0}
            className="shrink-0"
            aria-label="سؤال قبلی"
          >
            <ArrowRight size={18} />
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed}
            className="group flex-1"
          >
            {isLastStep ? "مشاهده نتیجه" : "ادامه"}
            <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </main>
  );
}
