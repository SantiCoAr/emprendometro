// src/services/results.ts
import { supabase } from "../lib/supabaseClient";
import type { ScoreByDimension } from "../utils/score";

export type ResultRow = {
  id: string;
  created_at: string;
  user_id: string;
  scores: any;     // jsonb (Record<string, number>)
  total: number;
  feedback: any | null; // jsonb (objeto) o null
};

// Orden canónico para reconstruir arrays desde JSON
const ORDER = [
  "curiosidad",
  "resiliencia",
  "comercial",
  "estrategia",
  "liderazgo",
  "autonomia",
  "proposito",
  "emocional",
] as const;

// util: de array → objeto para guardar
function toJsonFromScores(scores: ScoreByDimension[]): Record<string, number> {
  const o: Record<string, number> = {};
  for (const s of scores) o[s.dimension] = s.value;
  return o;
}

// util: de objeto (jsonb) → array ordenado para mostrar
export function fromJson(obj: Record<string, number>): ScoreByDimension[] {
  return ORDER.map((k) => ({
    dimension: k as ScoreByDimension["dimension"],
    value: Number(obj?.[k] ?? 0),
  }));
}

export async function insertResult(userId: string, scores: ScoreByDimension[]) {
  const payload = {
    user_id: userId,
    scores: toJsonFromScores(scores),     // ← guarda jsonb
    total: scores.reduce((a, s) => a + s.value, 0),
    feedback: null as any,                 // aún no generado
  };

  return supabase
    .from("results")
    .insert(payload)
    .select("id")
    .single();
}

export async function getLastResult(userId: string) {
  // incluye feedback para no re-generar si ya existe
  return supabase
    .from("results")
    .select("id, created_at, user_id, scores, total, feedback")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
}

export async function updateResultFeedback(id: string, feedback: any) {
  // guarda objeto directamente en jsonb
  return supabase
    .from("results")
    .update({ feedback })
    .eq("id", id)
    .select("id")
    .single();
}
