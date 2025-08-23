import { supabase } from "../lib/supabaseClient";
import type { ScoreByDimension } from "../utils/score";
import { dimensionLabels } from "../utils/score";

type Dimension = keyof typeof dimensionLabels;
type ScoresJson = Partial<Record<Dimension, number>>;

function toJson(scores: ScoreByDimension[]): ScoresJson {
  return Object.fromEntries(scores.map(s => [s.dimension, s.value])) as ScoresJson;
}

export function fromJson(obj: ScoresJson): ScoreByDimension[] {
  const dims = Object.keys(dimensionLabels) as Dimension[];
  return dims.map((d) => ({ dimension: d, value: Number(obj?.[d] ?? 0) }));
}

export async function insertResult(userId: string, scores: ScoreByDimension[]) {
  const total = scores.reduce((a, s) => a + s.value, 0);
  const payload = { user_id: userId, scores: toJson(scores), total };

  return await supabase
    .from("results")
    .insert(payload)
    .select("id, created_at, scores, total")
    .single();
}

export async function getLastResult(userId: string) {
  // si en futuro permitimos múltiples intentos, aquí ordenaríamos por created_at desc
  return await supabase
    .from("results")
    .select("id, created_at, scores, total")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle();
}

