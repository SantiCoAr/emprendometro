// src/components/FeedbackView.tsx
import React, { useMemo } from "react";
import type { ScoreByDimension } from "../utils/score";
import { getColor, dimensionLabels } from "../utils/score";
import RadarScores from "./RadarScores";
import Donut from "./Donut";

type FeedbackJSON = {
  headline: string;
  summary: string;
  strengths: { dimension: string; score: number; insight: string }[];
  improvements: {
    dimension: string;
    score: number;
    insight: string;
    quick_habits: string[];
  }[];
  action_plan: { next_7_days: string[]; next_30_days: string[] };
  recommended_role: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{children}</h3>
  );
}

function Pill({
  label,
  color,
}: {
  label: string;
  color: string; // hex
}) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {label}
    </span>
  );
}

/** Devuelve la etiqueta amigable para una dimensión.
 *  Si la clave no existe en dimensionLabels (por venir de la IA), devuelve el string tal cual. */
const labelOf = (d: string) =>
  dimensionLabels[d as keyof typeof dimensionLabels] ?? d;

export default function FeedbackView({
  data,
  scores,
}: {
  data: FeedbackJSON;
  scores: ScoreByDimension[];
}) {
  const total = useMemo(
    () => scores.reduce((a, s) => a + s.value, 0),
    [scores]
  );
  const percent = (total / (20 * scores.length)) * 100;

  return (
    <div className="mt-8">
      {/* Header con headline */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="shrink-0 p-3 rounded-xl bg-indigo-600 text-white">
            {/* icono */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {data.headline}
            </h2>
            <p className="mt-1 text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>

      {/* Radar + Donut + KPIs */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="col-span-3 rounded-2xl border p-4 bg-white">
          <SectionTitle>Mapa de tu perfil</SectionTitle>
          <RadarScores data={scores} />
          <div className="mt-2 flex flex-wrap gap-2">
            {scores.map((s) => (
              <Pill
                key={s.dimension}
                label={`${labelOf(s.dimension)} ${s.value}/20`}
                color={getColor(s.value)}
              />
            ))}
          </div>
        </div>

        <div className="col-span-2 rounded-2xl border p-4 bg-white">
          <SectionTitle>Tu KPI general</SectionTitle>
          <div className="flex items-center justify-center">
            <Donut value={percent} label="Índice global" color="#0ea5a4" />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Total: <b>{total}</b> / {scores.length * 20}
          </p>
          <div className="mt-3 text-center">
            <span className="text-xs uppercase text-gray-500">
              Rol recomendado:
            </span>
            <div className="text-base font-semibold text-gray-800 mt-1">
              {data.recommended_role}
            </div>
          </div>
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fortalezas */}
        <div className="rounded-2xl border p-5 bg-white">
          <SectionTitle>Fortalezas</SectionTitle>
          <div className="space-y-3">
            {data.strengths.map((st, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
              >
                <div className="shrink-0 text-emerald-600 mt-1">
                  {/* check icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Pill
                      label={`${labelOf(st.dimension)} ${st.score}/20`}
                      color={getColor(st.score)}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{st.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Áreas de mejora */}
        <div className="rounded-2xl border p-5 bg-white">
          <SectionTitle>Áreas de mejora</SectionTitle>
          <div className="space-y-3">
            {data.improvements.map((imp, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-amber-50 border border-amber-100"
              >
                <div className="flex items-center gap-2">
                  <div className="shrink-0 text-amber-600">
                    {/* warning icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.592c.75 1.336-.213 2.992-1.743 2.992H3.482c-1.53 0-2.493-1.656-1.743-2.992L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z" />
                    </svg>
                  </div>
                  <Pill
                    label={`${labelOf(imp.dimension)} ${imp.score}/20`}
                    color={getColor(imp.score)}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-700">{imp.insight}</p>

                {/* Quick habits como chips */}
                {imp.quick_habits?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imp.quick_habits.map((h, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-white border border-amber-200 text-amber-700"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan de acción */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-5 bg-white">
          <SectionTitle>Próximos 7 días</SectionTitle>
          <ul className="mt-2 space-y-2">
            {data.action_plan.next_7_days.map((t, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="mt-1 text-indigo-500">•</span>
                <span className="text-sm text-gray-800">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border p-5 bg-white">
          <SectionTitle>Próximos 30 días</SectionTitle>
          <ul className="mt-2 space-y-2">
            {data.action_plan.next_30_days.map((t, i) => (
              <li key={i} className="flex gap-2 items-start">
                <span className="mt-1 text-emerald-600">•</span>
                <span className="text-sm text-gray-800">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}




