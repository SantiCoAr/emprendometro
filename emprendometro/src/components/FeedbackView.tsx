// src/components/FeedbackView.tsx
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  CheckCircle2,
  TriangleAlert,
  Target,
  ShieldCheck,
} from "lucide-react";
import { dimensionLabels, type Dimension, type ScoreByDimension } from "../utils/score";

type Strength = {
  dimension: Dimension | string;
  score: number;
  insight: string;
};

type Improvement = {
  dimension: Dimension | string;
  score: number;
  insight: string;
  quick_habits: string[];
};

export type IAFeedback = {
  headline: string;
  summary: string;
  strengths: Strength[];
  improvements: Improvement[];
  action_plan: {
    next_7_days: string[];
    next_30_days: string[];
  };
  recommended_role: string;
};

function colorForDimension(dim: Dimension | string) {
  const map: Record<string, string> = {
    curiosidad: "#FACC15",   // amarillo
    resiliencia: "#FACC15",
    comercial: "#16A34A",    // verde
    estrategia: "#16A34A",
    liderazgo: "#EF4444",    // rojo
    autonomia: "#22C55E",    // verde-agua
    propósito: "#15803D",    // verde oscuro
    emocional: "#F87171",    // rojo claro
  };
  return map[dim] ?? "#3B82F6"; // azul fallback
}

function Chip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-sm font-medium"
      style={{ backgroundColor: `${color}22`, color }}
    >
      {label}: {value}/20
    </div>
  );
}

export default function FeedbackView({
  data,
  scores,
}: {
  data: IAFeedback;
  scores: ScoreByDimension[];
}) {
  // total 0–160 → %
  const total = scores.reduce((a, s) => a + s.value, 0);
  const percentage = Math.round((total / 160) * 100);

  // Chips con cada dimensión
  const chips = scores.map((s) => {
    const label =
      dimensionLabels[(s.dimension as Dimension)] ?? (s.dimension as string);
    return (
      <Chip
        key={s.dimension}
        label={label}
        value={s.value}
        color={colorForDimension(s.dimension)}
      />
    );
  });

  // Gauge data
  const gaugeData = [{ name: "Índice", value: Math.max(1, percentage) }];

  return (
    <div className="mt-8 max-w-5xl mx-auto space-y-8">
      {/* Encabezado + Gauge */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="w-4 h-4" />
              <span>Rol recomendado:</span>
              <span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {data.recommended_role}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mt-2">
              {data.headline}
            </h2>
            <p className="text-slate-600 mt-2 leading-relaxed">
              {data.summary}
            </p>
          </div>

          <div className="w-full md:w-[200px] h-[180px] md:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={14}
                data={gaugeData}
                startAngle={90}
                endAngle={-270} // círculo completo
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  dataKey="value"
                  cornerRadius={8}
                  fill="#2563EB"
                  background
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="text-center -mt-6 text-sm">
              <span className="font-bold">{percentage}%</span>{" "}
              <span className="text-slate-500">Índice global</span>
            </div>
          </div>
        </div>

        {/* Chips de dimensiones */}
        <div className="mt-4 flex flex-wrap gap-2">{chips}</div>
      </div>

      {/* Fortalezas */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Fortalezas</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {data.strengths.map((s, idx) => {
            const lbl =
              dimensionLabels[(s.dimension as Dimension)] ??
              (s.dimension as string);
            const col = colorForDimension(s.dimension);
            return (
              <div
                key={idx}
                className="rounded-lg border p-4"
                style={{ borderColor: `${col}55` }}
              >
                <div className="text-sm font-semibold" style={{ color: col }}>
                  {lbl} — {s.score}/20
                </div>
                <p className="text-sm text-slate-600 mt-1">{s.insight}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Áreas de mejora */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <TriangleAlert className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold">Áreas de mejora</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {data.improvements.map((imp, idx) => {
            const lbl =
              dimensionLabels[(imp.dimension as Dimension)] ??
              (imp.dimension as string);
            const col = colorForDimension(imp.dimension);
            return (
              <div
                key={idx}
                className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${col}55` }}
              >
                <div className="text-sm font-semibold" style={{ color: col }}>
                  {lbl} — {imp.score}/20
                </div>
                <p className="text-sm text-slate-600">{imp.insight}</p>
                <div className="text-xs text-slate-500">Hábitos sugeridos:</div>
                <ul className="list-disc pl-5 text-sm text-slate-700">
                  {imp.quick_habits.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Plan de acción */}
      <section className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-sky-600" />
          <h3 className="text-lg font-semibold">Plan de acción</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Próximos 7 días
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {data.action_plan.next_7_days.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Próximos 30 días
            </h4>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {data.action_plan.next_30_days.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
