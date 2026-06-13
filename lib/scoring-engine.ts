import {
  ArchetypeId,
  AssessmentAnswers,
  AssessmentResult,
} from "@/types";

/**
 * ============================================================
 * Career Archetype Scoring Engine
 * ============================================================
 *
 * A simple, transparent, rule-based point system.
 * Each answer awards points to one or more archetypes.
 * The archetype with the highest total score wins.
 *
 * Designed to be easily extended: add new rules to RULES,
 * or add new archetypes to the ArchetypeId union + RULES.
 */

type ScoreMap = Record<ArchetypeId, number>;

const EMPTY_SCORES: ScoreMap = {
  future_specialist: 0,
  global_physician: 0,
  entrepreneur_doctor: 0,
  lifestyle_doctor: 0,
};

/** A single scoring rule: given the answers, return points to add per archetype. */
type ScoringRule = (answers: AssessmentAnswers) => Partial<ScoreMap>;

const RULES: ScoringRule[] = [
  // --- Q1: Career stage ---
  // Residents lean toward deeper specialization; interns/GPs are more open.
  (a) => {
    switch (a.careerStage) {
      case "resident":
        return { future_specialist: 2 };
      case "gp_post_service":
        return { entrepreneur_doctor: 1, global_physician: 1 };
      case "gp_in_service":
        return { lifestyle_doctor: 1 };
      case "intern":
        return { future_specialist: 1 };
      default:
        return {};
    }
  },

  // --- Q2: Primary professional goal ---
  // The strongest single signal in the assessment.
  (a) => {
    switch (a.primaryGoal) {
      case "high_income":
        return { entrepreneur_doctor: 2, future_specialist: 1 };
      case "emigration":
        return { global_physician: 4 };
      case "work_life_balance":
        return { lifestyle_doctor: 4 };
      case "academic_status":
        return { future_specialist: 4 };
      case "own_business":
        return { entrepreneur_doctor: 4 };
      default:
        return {};
    }
  },

  // --- Q3: Comfort with a 5-7 year timeline ---
  // Long-horizon comfort favors specialist/global tracks (residency, exams abroad).
  // Discomfort favors faster, more immediate paths (lifestyle, entrepreneurship).
  (a) => {
    switch (a.timelineComfort) {
      case "fully_comfortable":
        return { future_specialist: 2, global_physician: 2 };
      case "somewhat_comfortable":
        return { entrepreneur_doctor: 1 };
      case "not_comfortable":
        return { lifestyle_doctor: 2, entrepreneur_doctor: 1 };
      default:
        return {};
    }
  },

  // --- Q4: Likelihood of leaving Iran ---
  // Direct, strong signal toward the Global Physician archetype.
  (a) => {
    switch (a.emigrationLikelihood) {
      case "main_goal":
        return { global_physician: 4 };
      case "high":
        return { global_physician: 3 };
      case "maybe":
        return { global_physician: 1 };
      case "near_zero":
        return { future_specialist: 1, lifestyle_doctor: 1, entrepreneur_doctor: 1 };
      default:
        return {};
    }
  },

  // --- Q5: Risk tolerance (1-10) ---
  // High risk tolerance favors entrepreneurship and bold migration paths.
  // Low risk tolerance favors stable, structured paths (specialist, lifestyle).
  (a) => {
    if (a.riskTolerance === null) return {};
    if (a.riskTolerance >= 8) {
      return { entrepreneur_doctor: 3, global_physician: 1 };
    }
    if (a.riskTolerance >= 5) {
      return { entrepreneur_doctor: 1, global_physician: 1 };
    }
    return { future_specialist: 1, lifestyle_doctor: 1 };
  },

  // --- Q6: Preferred self-image in 10 years ---
  // Strong identity-level signal, weighted heavily.
  (a) => {
    switch (a.futureSelfImage) {
      case "recognized_specialist":
        return { future_specialist: 4 };
      case "living_abroad":
        return { global_physician: 4 };
      case "very_high_income":
        return { entrepreneur_doctor: 2, future_specialist: 1 };
      case "time_for_life":
        return { lifestyle_doctor: 4 };
      case "business_owner":
        return { entrepreneur_doctor: 4 };
      default:
        return {};
    }
  },
];

/** Maximum theoretical score, used to normalize confidence. */
const MAX_POSSIBLE_SCORE = 19; // sum of the highest weight any single rule can give one archetype across all 6 rules

/**
 * Run all scoring rules against the answers and return the cumulative
 * score map for every archetype.
 */
export function computeScores(answers: AssessmentAnswers): ScoreMap {
  const totals: ScoreMap = { ...EMPTY_SCORES };

  for (const rule of RULES) {
    const partial = rule(answers);
    for (const key of Object.keys(partial) as ArchetypeId[]) {
      totals[key] += partial[key] ?? 0;
    }
  }

  return totals;
}

/**
 * Pick the winning archetype (highest score). Ties are broken by a fixed
 * priority order to keep results deterministic.
 */
const TIE_BREAK_ORDER: ArchetypeId[] = [
  "global_physician",
  "future_specialist",
  "entrepreneur_doctor",
  "lifestyle_doctor",
];

export function pickArchetype(scores: ScoreMap): ArchetypeId {
  let winner: ArchetypeId = TIE_BREAK_ORDER[0];
  let best = -Infinity;

  for (const id of TIE_BREAK_ORDER) {
    if (scores[id] > best) {
      best = scores[id];
      winner = id;
    }
  }

  return winner;
}

/**
 * Convert the winning score into a 0-100 "confidence" percentage.
 * Confidence reflects how strongly the answers pointed toward the
 * winning archetype relative to the theoretical maximum, with a floor
 * so results never look discouragingly low.
 */
export function computeConfidence(scores: ScoreMap, winner: ArchetypeId): number {
  const winningScore = scores[winner];
  const raw = (winningScore / MAX_POSSIBLE_SCORE) * 100;
  const floored = Math.max(raw, 38); // never show below 38%
  const capped = Math.min(floored, 96); // never claim full certainty
  return Math.round(capped);
}

/**
 * Run the full scoring pipeline and produce an AssessmentResult
 * (minus persistence fields like id/createdAt, which are added by the caller).
 */
export function runScoringEngine(
  answers: AssessmentAnswers
): Omit<AssessmentResult, "id" | "createdAt"> {
  const scoreBreakdown = computeScores(answers);
  const archetypeId = pickArchetype(scoreBreakdown);
  const confidenceScore = computeConfidence(scoreBreakdown, archetypeId);

  return {
    answers,
    archetypeId,
    confidenceScore,
    scoreBreakdown,
  };
}
