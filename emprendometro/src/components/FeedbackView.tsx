import type { FeedbackPayload } from "../types/feedback";
import type { ScoreByDimension } from "../utils/score";
import PersonaChip from "./PersonaChip";
import RadarProfile from "./RadarProfile";
import PillBars from "./PillBars";
import StrengthCard from "./StrengthCard";
import ImproveCard from "./ImproveCard";
import ActionTimeline from "./ActionTimeline";

export default function FeedbackView({
  data,
  scores,
}: {
  data: FeedbackPayload;
  scores: ScoreByDimension[];
}) {
  if (!data) return null;

  return (
    <section className="mt-10 space-y-8">
      {/* HERO */}
      <div className="bg-white border rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl md:text-2xl font-semibold">
            {data.headline}
          </h2>
          <PersonaChip role={data.recommended_role} />
        </div>
        {data.summary && (
          <p className="mt-2 text-gray-700 leading-relaxed">{data.summary}</p>
        )}
      </div>

      {/* MATRIZ: Radar + Pill Bars */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RadarProfile data={scores} />
        <PillBars data={scores} />
      </div>

      {/* FORTALEZAS */}
      {data.strengths?.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Fortalezas</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.strengths.map((s, i) => (
              <StrengthCard key={i} item={s} />
            ))}
          </div>
        </div>
      )}

      {/* ÁREAS DE MEJORA */}
      {data.improvements?.length > 0 && (
        <div>
          <h3 className="font-semibold text-lg mb-3">Áreas de mejora</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {data.improvements.map((it, i) => (
              <ImproveCard key={i} item={it} />
            ))}
          </div>
        </div>
      )}

      {/* PLAN DE ACCIÓN */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Plan de acción</h3>
        <ActionTimeline
          next7={data.action_plan?.next_7_days ?? []}
          next30={data.action_plan?.next_30_days ?? []}
        />
      </div>
    </section>
  );
}


