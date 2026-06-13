import { AssessmentResult, Lead } from "@/types";

/**
 * ============================================================
 * Storage Layer
 * ============================================================
 *
 * MVP implementation uses localStorage as a mock database.
 *
 * To migrate to Supabase later:
 *  1. Create `assessment_results` and `leads` tables matching
 *     the AssessmentResult / Lead interfaces.
 *  2. Replace the function bodies below with Supabase client
 *     calls (e.g. `supabase.from('assessment_results').insert(...)`).
 *  3. Keep the function signatures the same so calling code
 *     (the assessment flow, result page, lead form) needs no changes.
 */

const RESULTS_KEY = "medpath_assessment_results";
const LEADS_KEY = "medpath_leads";

function isBrowser() {
  return typeof window !== "undefined";
}

function readArray<T>(key: string): T[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (e.g. private mode) — fail silently for MVP.
  }
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ------------------------------------------------------------
// Assessment Results
// ------------------------------------------------------------

export function saveAssessmentResult(
  result: Omit<AssessmentResult, "id" | "createdAt">
): AssessmentResult {
  const fullResult: AssessmentResult = {
    ...result,
    id: generateId("result"),
    createdAt: new Date().toISOString(),
  };

  const existing = readArray<AssessmentResult>(RESULTS_KEY);
  writeArray(RESULTS_KEY, [...existing, fullResult]);

  // Also store the most recent result separately for quick retrieval
  // on the result page (avoids passing large objects via URL/query params).
  if (isBrowser()) {
    window.localStorage.setItem("medpath_last_result", JSON.stringify(fullResult));
  }

  return fullResult;
}

export function getLastAssessmentResult(): AssessmentResult | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem("medpath_last_result");
    if (!raw) return null;
    return JSON.parse(raw) as AssessmentResult;
  } catch {
    return null;
  }
}

export function getAllAssessmentResults(): AssessmentResult[] {
  return readArray<AssessmentResult>(RESULTS_KEY);
}

// ------------------------------------------------------------
// Leads
// ------------------------------------------------------------

export function saveLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const fullLead: Lead = {
    ...lead,
    id: generateId("lead"),
    createdAt: new Date().toISOString(),
  };

  const existing = readArray<Lead>(LEADS_KEY);
  writeArray(LEADS_KEY, [...existing, fullLead]);

  return fullLead;
}

export function getAllLeads(): Lead[] {
  return readArray<Lead>(LEADS_KEY);
}
