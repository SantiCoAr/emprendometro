// src/components/FeedbackView.tsx
import React, { useMemo } from "react";
import type { ScoreByDimension } from "../utils/score";
import { getColor, dimensionLabels } from "../utils/score";
import RadarScores from "./RadarScores";
import Donut from "./Donut";
import {
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

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
  return <h3 className="text-lg font-semibold text-gray-800 mb-2">{children}</h3>;
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {label}
    </span>
  );
}

const labelOf = (d: string) =>
  dimensionLabels[d as keyof typeof dimensionLabels] ?? d;

function ProgressLine({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 20) * 100));
  const color = getColor(value);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-600">{label}</span>
        <span className="text-gray-600">{value}/20</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

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
    <div className="mt-8 space-y-6">
      {/* HEADER */}
      <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="shrink-0 p-3 rounded-xl bg-indigo-600 text-white">
            <LightBulbIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{data.headline}</h2>
            <p className="mt-1 text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>

      {/* KPI + Radar + Chips + Líneas por dimensión */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Donut */}
        <div className="rounded-2xl border p-5 bg-white flex flex-col items-center">
          <SectionTitle>Índice global</SectionTitle>
          <Donut value={percent} label="Global" color="#0ea5a4" />
          <p className="text-sm text-gray-500 mt-2">
            Total: <b>{total}</b> / {scores.length * 20}
          </p>
          <div className="mt-3 text-center">
            <div className="text-xs uppercase text-gray-500">
              Rol recomendado
            </div>
            <div className="text-base font-semibold text-gray-800 mt-1">
              {data.recommended_role}
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="rounded-2xl border p-5 bg-white lg:col-span-2">
          <SectionTitle>Mapa de tu perfil</SectionTitle>
          <RadarScores data={scores} />

          {/* chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {scores.map((s) => (
              <Pill
                key={s.dimension}
                label={`${labelOf(s.dimension)} ${s.value}/20`}
                color={getColor(s.value)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Líneas de progreso por dimensión */}
      <div className="rounded-2xl border p-5 bg-white">
        <SectionTitle>Detalle por dimensión</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          {scores.map((s) => (
            <ProgressLine
              key={s.dimension}
              label={labelOf(s.dimension)}
              value={s.value}
            />
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fortalezas */}
        <div className="rounded-2xl border p-5 bg-white">
          <SectionTitle>Fortalezas</SectionTitle>
          <div className="space-y-3">
            {data.strengths.map((st, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100"
              >
                <CheckCircleIcon className="h-5 w-5 text-emerald-600 mt-1" />
                <div className="flex-1">
                  <Pill
                    label={`${labelOf(st.dimension)} ${st.score}/20`}
                    color={getColor(st.score)}
                  />
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
                <div className="flex items-start gap-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <Pill
                      label={`${labelOf(imp.dimension)} ${imp.score}/20`}
                      color={getColor(imp.score)}
                    />
                    <p className="mt-1 text-sm text-gray-700">{imp.insight}</p>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan de acción */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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





