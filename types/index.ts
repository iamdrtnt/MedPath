// ============================================================
// MedPath Data Model
// ============================================================

/**
 * Raw answers collected from the assessment wizard.
 * Each key corresponds to one question in the flow.
 */
export interface AssessmentAnswers {
  /** Q1: Current career stage */
  careerStage: CareerStage | null;
  /** Q2: Primary professional goal */
  primaryGoal: PrimaryGoal | null;
  /** Q3: Comfort with a 5-7 year timeline to reach the goal */
  timelineComfort: TimelineComfort | null;
  /** Q4: Likelihood of leaving Iran */
  emigrationLikelihood: EmigrationLikelihood | null;
  /** Q5: Risk tolerance, 1 (low) to 10 (high) */
  riskTolerance: number | null;
  /** Q6: Preferred self-image in 10 years */
  futureSelfImage: FutureSelfImage | null;
}

export type CareerStage = "intern" | "gp_in_service" | "gp_post_service" | "resident";

export type PrimaryGoal =
  | "high_income"
  | "emigration"
  | "work_life_balance"
  | "academic_status"
  | "own_business";

export type TimelineComfort = "not_comfortable" | "somewhat_comfortable" | "fully_comfortable";

export type EmigrationLikelihood = "near_zero" | "maybe" | "high" | "main_goal";

export type FutureSelfImage =
  | "recognized_specialist"
  | "living_abroad"
  | "very_high_income"
  | "time_for_life"
  | "business_owner";

/**
 * The four possible career archetypes the scoring engine can output.
 */
export type ArchetypeId =
  | "future_specialist"
  | "global_physician"
  | "entrepreneur_doctor"
  | "lifestyle_doctor";

/**
 * Static definition of an archetype (copy, styling, suggested paths).
 */
export interface CareerArchetype {
  id: ArchetypeId;
  title: string;
  shortLabel: string;
  description: string;
  color: string;
  icon: string; // lucide icon name, resolved in UI layer
  suggestedPaths: CareerPathSuggestion[];
}

export interface CareerPathSuggestion {
  title: string;
  description: string;
}

/**
 * Full result of an assessment run, ready for display & storage.
 */
export interface AssessmentResult {
  id: string;
  answers: AssessmentAnswers;
  archetypeId: ArchetypeId;
  /** 0-100 confidence score from the scoring engine */
  confidenceScore: number;
  /** Score breakdown per archetype, useful for debugging & future ML */
  scoreBreakdown: Record<ArchetypeId, number>;
  createdAt: string; // ISO timestamp
}

/**
 * Lead captured after the assessment result is shown.
 */
export interface Lead {
  id: string;
  phone: string;
  email?: string;
  assessmentResultId?: string;
  createdAt: string; // ISO timestamp
}

/**
 * Combined analytics record stored locally (and later in Supabase).
 */
export interface AnalyticsRecord {
  result: AssessmentResult;
  lead?: Lead;
}
