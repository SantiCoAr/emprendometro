// src/services/results.ts
// ✅ importa SIEMPRE desde el cliente central
import { supabase } from "../lib/supabaseClient";
import type { ScoreByDimension } from "../utils/score";

export type ResultRow = {
  id: string;
  created_at: string;
  scores: Record<string, number>;
  total: number;
  feedback: any | null; // jsonb en DB
};

export function scoresToJson(scores: ScoreByDimension[]): Record<string, number> {
  return Object.fromEntries(scores.map((s) => [s.dimension, s.value]));
}

export function fromJson(json: any): ScoreByDimension[] {
  if (!json) return [];
  return Object.entries(json).map(([dimension, value]) => ({
    dimension: dimension as ScoreByDimension["dimension"],
    value: Number(value),
  }));
}

export async function insertResult(userId: string, scores: ScoreByDimension[]) {
  const payload = {
    user_id: userId,
    scores: scoresToJson(scores),
    total: scores.reduce((a, s) => a + s.value, 0),
  };
  return await supabase.from("results").insert(payload);
}

export async function getLastResult(userId: string) {
  const { data, error } = await supabase
    .from("results")
    .select("id, created_at, scores, total, feedback") // <-- IMPORTANTE
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return { data: (data as ResultRow) ?? null, error };
}

export async function updateResultFeedback(resultId: string, feedback: any) {
  return await supabase
    .from("results")
    .update({ feedback })
    .eq("id", resultId)
    .select("id, feedback")
    .single();
}
