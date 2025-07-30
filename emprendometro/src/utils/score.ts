import { questions } from "../data/questions";

export type Dimension =
  | "curiosidad"
  | "resiliencia"
  | "comercial"
  | "estrategia"
  | "liderazgo"
  | "autonomia"
  | "proposito"
  | "emocional";

export const dimensionLabels: Record<Dimension, string> = {
  curiosidad: "Curiosidad",
  resiliencia: "Resiliencia",
  comercial: "Comercial",
  estrategia: "Estrategia",
  liderazgo: "Liderazgo",
  autonomia: "Autonomía",
  proposito: "Propósito",
  emocional: "Emocional"
};

export interface ScoreByDimension {
  dimension: Dimension;
  value: number; // 5–20
}

export function calcScores(
  answers: Record<string, number>
): ScoreByDimension[] {
  const acc: Record<Dimension, number> = {
    curiosidad: 0,
    resiliencia: 0,
    comercial: 0,
    estrategia: 0,
    liderazgo: 0,
    autonomia: 0,
    proposito: 0,
    emocional: 0
  };

  questions.forEach((q) => {
    const val = answers[q.id] ?? 0;
    acc[q.dimension] += val;
  });

  return Object.entries(acc).map(([dim, val]) => ({
    dimension: dim as Dimension,
    value: val
  }));
}

export function getColor(v: number) {
  if (v >= 17) return "#15803d";      // verde oscuro
  if (v >= 13) return "#4ade80";      // verde claro
  if (v >= 9)  return "#fde047";      // amarillo
  return "#f87171";                   // rojo
}

export function levelLabel(v: number) {
  if (v >= 17) return "Muy alto";
  if (v >= 13) return "Alto";
  if (v >= 9)  return "Medio";
  return "Bajo";
}
