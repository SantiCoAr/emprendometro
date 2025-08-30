// src/components/FeedbackView.tsx
import StrengthCard from "./StrengthCard";
import ImproveCard from "./ImproveCard";
import { dimensionLabels } from "../utils/score";

type Feedback = {
  headline: string;
  summary: string;
  strengths: { dimension: string; score: number; insight: string }[];
  improvements: {
    dimension: string;
    score: number;
    insight: string;
    quick_habits?: string[];
  }[];
  action_plan?: {
    next_7_days?: string[];
    next_30_days?: string[];
  };
  recommended_role?: string;
};

export default function FeedbackView({ data }: { data: Feedback }) {
  const role = data.recommended_role || "—";
  const summary = data.summary || "";

  // Construyo “píldoras” de perfil (dimensión — score) sin repetir tablitas
  const pills =
    [...(data.strengths || []), ...(data.improvements || [])]
      // orden opcional por score desc
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

  return (
    <section className="mt-10 mx-auto max-w-4xl">
      {/* ROL RECOMENDADO */}
      <div className="rounded-xl p-5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-indigo-100 shadow-sm text-center">
        <div className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
          Rol recomendado
        </div>
        <div className="text-2xl font-bold text-slate-800 mt-1">{role}</div>
      </div>

      {/* RESUMEN */}
      {summary && (
        <p className="mt-6 text-slate-700 leading-relaxed text-center">
          {summary}
        </p>
      )}

      {/* PÍLDORAS DE PERFIL */}
      {pills.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {pills.map((p, idx) => {
            const label =
              dimensionLabels[p.dimension as keyof typeof dimensionLabels] ||
              p.dimension;
            const colorCls =
              p.score >= 17
                ? "bg-green-100 text-green-700"
                : p.score >= 10
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";
            return (
              <span
                key={`${p.dimension}-${idx}`}
                className={`text-xs px-2 py-1 rounded-full ${colorCls}`}
              >
                {label} {p.score}/20
              </span>
            );
          })}
        </div>
      )}

      {/* FORTALEZAS */}
      {data.strengths && data.strengths.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">
            Fortalezas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.strengths.map((s, i) => (
              <StrengthCard key={`${s.dimension}-${i}`} item={s} />
            ))}
          </div>
        </div>
      )}

      {/* ÁREAS DE MEJORA */}
      {data.improvements && data.improvements.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">
            Áreas de mejora
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.improvements.map((i, idx) => (
              <ImproveCard key={`${i.dimension}-${idx}`} item={i} />
            ))}
          </div>
        </div>
      )}

      {/* PLAN DE ACCIÓN */}
      {data.action_plan && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">
            Plan de acción
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 7 días */}
            <div className="rounded-xl border border-slate-200 p-4 bg-white/80 shadow-sm">
              <div className="text-sm font-semibold text-slate-700">
                Próximos 7 días
              </div>
              <ul className="mt-2 list-disc pl-5 text-slate-700 text-sm">
                {(data.action_plan.next_7_days || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            {/* 30 días */}
            <div className="rounded-xl border border-slate-200 p-4 bg-white/80 shadow-sm">
              <div className="text-sm font-semibold text-slate-700">
                Próximos 30 días
              </div>
              <ul className="mt-2 list-disc pl-5 text-slate-700 text-sm">
                {(data.action_plan.next_30_days || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
