import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { ScoreByDimension } from "../utils/score";

type Feedback = {
  headline: string;
  summary: string;
  strengths: { dimension: string; score: number; insight: string }[];
  improvements: { dimension: string; score: number; insight: string; quick_habits: string[] }[];
  action_plan: { next_7_days: string[]; next_30_days: string[] };
  recommended_role: string;
};

function gaugeColor(score: number) {
  if (score >= 17) return "#16A34A";       // verde
  if (score >= 10) return "#F59E0B";       // amarillo
  return "#DC2626";                        // rojo
}

function CircleStat({
  label,
  score,
  text,
}: {
  label: string;
  score: number;
  text: string;
}) {
  const pct = Math.round((score / 20) * 100);
  const color = gaugeColor(score);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex items-start gap-4">
      <div className="w-16 h-16">
        <CircularProgressbar
          value={pct}
          text={`${score}/20`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#0F172A",
            trailColor: "#E5E7EB",
            textSize: "24px",
          })}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline justify-between">
          <h5 className="font-semibold text-slate-800">{label}</h5>
        </div>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm p-5 ${className}`}>
      {children}
    </div>
  );
}

export default function FeedbackView({
  data,
}: {
  data: Feedback;
}) {
  // 1) Rol recomendado (hero con gradiente)
  const Hero = (
    <div className="rounded-2xl p-6 text-white bg-gradient-to-r from-indigo-600 to-teal-500 shadow-md text-center">
      <p className="text-xs uppercase tracking-wider opacity-90">Rol recomendado</p>
      <h3 className="text-2xl font-bold mt-1">{data.recommended_role}</h3>
      {/* Subtítulo corto (headline) */}
      <p className="mt-2 text-sm opacity-95">{data.headline}</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {Hero}

      {/* 2) Resumen del perfil */}
      <Card>
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Resumen del perfil</h4>
        <p className="text-sm text-slate-600 leading-relaxed text-center">
          {data.summary}
        </p>
      </Card>

      {/* 3) Fortalezas */}
      {data.strengths?.length > 0 && (
        <div>
          <h4 className="text-base font-semibold text-slate-800 mb-3 text-center">Fortalezas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.strengths.map((st, i) => (
              <CircleStat
                key={i}
                label={st.dimension}
                score={st.score}
                text={st.insight}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4) Áreas de mejora */}
      {data.improvements?.length > 0 && (
        <div>
          <h4 className="text-base font-semibold text-slate-800 mb-3 text-center">Áreas de mejora</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.improvements.map((imp, i) => (
              <CircleStat
                key={i}
                label={imp.dimension}
                score={imp.score}
                text={imp.insight}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5) Plan de acción (sin cambios visuales grandes) */}
      <Card>
        <h4 className="text-base font-semibold text-slate-800 mb-3 text-center">Plan de acción</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 text-center md:text-left">
              Próximos 7 días
            </p>
            <ul className="text-sm text-slate-700 list-disc pl-6 space-y-1">
              {data.action_plan.next_7_days.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 mb-2 text-center md:text-left">
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
