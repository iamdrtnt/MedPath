"use client";

import { useCallback, useState } from "react";
import { AssessmentAnswers } from "@/types";
import { QUESTIONS, TOTAL_STEPS } from "@/data/questions";
import { runScoringEngine } from "@/lib/scoring-engine";
import { saveAssessmentResult } from "@/lib/storage";

const INITIAL_ANSWERS: AssessmentAnswers = {
  careerStage: null,
  primaryGoal: null,
  timelineComfort: null,
  emigrationLikelihood: null,
  riskTolerance: null,
  futureSelfImage: null,
};

export function useAssessment() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(INITIAL_ANSWERS);

  const currentQuestion = QUESTIONS[stepIndex];
  const isLastStep = stepIndex === TOTAL_STEPS - 1;
  const progress = ((stepIndex + 1) / TOTAL_STEPS) * 100;

  const setAnswer = useCallback(
    <K extends keyof AssessmentAnswers>(key: K, value: AssessmentAnswers[K]) => {
      setAnswers((prev) => ({ ...prev, [key]: value }) as AssessmentAnswers);
    },
    []
  );

  const goNext = useCallback(() => {
    setStepIndex((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;
  const canProceed = currentAnswer !== null && currentAnswer !== undefined;

  const finish = useCallback(() => {
    const scored = runScoringEngine(answers);
    const result = saveAssessmentResult(scored);
    return result;
  }, [answers]);

  return {
    stepIndex,
    totalSteps: TOTAL_STEPS,
    currentQuestion,
    answers,
    setAnswer,
    goNext,
    goBack,
    isLastStep,
    progress,
    canProceed,
    finish,
  };
}
