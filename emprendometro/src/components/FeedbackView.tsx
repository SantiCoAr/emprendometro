// src/components/FeedbackView.tsx
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { ScoreByDimension } from "../utils/score";

/** Tipado del feedback que devuelve la IA */
type Feedback = {
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

const dimensionColors: Record<string, string> = {
  curiosidad: "#FBBF24",  // amber-400
  resiliencia: "#F59E0B",  // amber-500
  comercial: "#047857",    // emerald-700
  estrategia: "#22C55E",   // green-500
  liderazgo: "#EF4444",    // red-500
  autonomia: "#F87171",    // red-400
  propósito: "#10B981",    // emerald-500
  proposito: "#10B981",    // por si llega sin tilde
  emocional: "#F59E0B",
};

function colorFor(d: string) {
  return dimensionColors[d.toLowerCase()] ?? "#64748B"; // slate-500 fallback
}

/** Mini barra horizontal para “Mapa de perfil” */
function MiniBar({ label, value, color }: { label: string; value: number; color: string }) {
  const pct = Math.round((value / 20) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-sm text-slate-600">{label}</div>
      <div className="flex-1 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-10 text-right text-xs text-slate-500">{value}/20</div>
    </div>
  );
}

/** Chip con color para dimensión */
function DimChip({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="px-2 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {text}
    </span>
  );
}

/** Card contenedor */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm p-5 ${className}`}>
      {children}
    </div>
  );
}

export default function FeedbackView({
  data,
  scores,
}: {
  data: Feedback;
  scores: ScoreByDimension[]; // << lo pasamos desde ResultPage
}) {
  const total = scores.reduce((a, s) => a + s.value, 0);
  const globalPct = Math.round((total / 160) * 100);

  return (
    <div className="mt-10 space-y-8">

      {/* HERO: Rol recomendado */}
      <Card className="flex items-center gap-4">
        <LightBulbIcon className="w-8 h-8 text-emerald-600" />
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Rol recomendado</p>
          <h3 className="text-lg font-semibold text-slate-800">{data.recommended_role}</h3>
          <p className="text-sm text-slate-600 mt-1">{data.headline}</p>
        </div>
      </Card>

      {/* KPI + Mapa de perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Donut KPI */}
        <Card className="flex items-center justify-center">
          <div className="w-40">
            <CircularProgressbar
              value={globalPct}
              text={`${globalPct}%`}
              styles={buildStyles({
                textSize: "20px",
                pathColor: "#2563EB",
                textColor: "#1F2937",
                trailColor: "#E5E7EB",
              })}
            />
            <p className="mt-3 text-center text-xs text-slate-500">Índice global</p>
          </div>
        </Card>

        {/* Resumen */}
        <Card className="md:col-span-2">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Resumen del perfil</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
        </Card>
      </div>

      {/* Mapa de perfil */}
      <Card>
        <h4 className="text-sm font-semibold text-slate-700 mb-4">Mapa de perfil</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {scores.map((s) => (
            <MiniBar
              key={s.dimension}
              label={s.dimension.charAt(0).toUpperCase() + s.dimension.slice(1)}
              value={s.value}
              color={colorFor(s.dimension)}
            />
          ))}
        </div>
      </Card>

      {/* Fortalezas */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
          <h4 className="text-sm font-semibold text-slate-700">Fortalezas</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.strengths.map((st, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4 bg-slate-50/40">
              <div className="flex items-center gap-2 mb-2">
                <DimChip text={st.dimension} color={colorFor(st.dimension)} />
                <span className="text-xs text-slate-500">{st.score}/20</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{st.insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Áreas de mejora */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
          <h4 className="text-sm font-semibold text-slate-700">Áreas de mejora</h4>
        </div>

        <div className="space-y-4">
          {data.improvements.map((imp, i) => (
            <div key={i} className="rounded-xl border border-slate-100 p-4">
              <div className="flex items-center gap-2 mb-1">
                <DimChip text={imp.dimension} color={colorFor(imp.dimension)} />
                <span className="text-xs text-slate-500">{imp.score}/20</span>
              </div>
              <p className="text-sm text-slate-700 mb-2">{imp.insight}</p>
              {imp.quick_habits?.length ? (
                <ul className="text-sm text-slate-600 list-disc pl-6 space-y-1">
                  {imp.quick_habits.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      {/* Plan de acción */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <BoltIcon className="w-5 h-5 text-blue-600" />
          <h4 className="text-sm font-semibold text-slate-700">Plan de acción</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
              Próximos 7 días
            </p>
            <ul className="text-sm text-slate-700 list-disc pl-6 space-y-1">
              {data.action_plan.next_7_days.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">
              Próximos 30 días
            </p>
            <ul className="text-sm text-slate-700 list-disc pl-6 space-y-1">
              {data.action_plan.next_30_days.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

