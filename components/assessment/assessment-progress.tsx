"use client";

import { Progress } from "@/components/ui/progress";

interface AssessmentProgressProps {
  stepIndex: number;
  totalSteps: number;
}

export function AssessmentProgress({ stepIndex, totalSteps }: AssessmentProgressProps) {
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
        <span>
          سؤال {stepIndex + 1} از {totalSteps}
        </span>
        <span className="tabular-nums">{Math.round(progress)}٪</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
