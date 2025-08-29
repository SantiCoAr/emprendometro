// src/components/FeedbackView.tsx
type Feedback = {
  headline?: string;
  summary?: string;
  strengths?: { dimension: string; score: number; insight: string }[];
  improvements?: { dimension: string; score: number; insight: string; quick_habits?: string[] }[];
  action_plan?: { next_7_days?: string[]; next_30_days?: string[] };
  recommended_role?: string;
} | null;

function toArray<T>(v: T[] | undefined | null): T[] {
  return Array.isArray(v) ? v : [];
}

export default function FeedbackView({ data }: { data: any }) {
  // si por algún motivo llega string, intentamos parsear
  let fb: Feedback = data;
  if (typeof data === "string") {
    try { fb = JSON.parse(data); } catch { fb = null; }
  }

  if (!fb) return null;

  const strengths = toArray(fb.strengths);
  const improvements = toArray(fb.improvements);
  const plan7 = toArray(fb.action_plan?.next_7_days);
  const plan30 = toArray(fb.action_plan?.next_30_days);

  return (
    <div className="mt-8 space-y-5">
      {fb.headline && <h2 className="text-xl font-semibold">{fb.headline}</h2>}
      {fb.summary && <p className="text-gray-700">{fb.summary}</p>}

      <div>
        <h3 className="text-lg font-semibold mb-2">Fortalezas</h3>
        {strengths.length === 0 ? (
          <p className="text-gray-500">—</p>
        ) : (
          <ul className="list-disc ml-6 space-y-1">
            {strengths.map((s, i) => (
              <li key={i}><b>{s.dimension}</b> ({s.score}/20): {s.insight}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Áreas de mejora</h3>
        {improvements.length === 0 ? (
          <p className="text-gray-500">—</p>
        ) : (
          <ul className="list-disc ml-6 space-y-2">
            {improvements.map((s, i) => (
              <li key={i}>
                <div><b>{s.dimension}</b> ({s.score}/20): {s.insight}</div>
                {toArray(s.quick_habits).length > 0 && (
                  <ul className="list-[square] ml-6 mt-1">
                    {toArray(s.quick_habits).map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Plan de acción</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold">Próximos 7 días</h4>
            {plan7.length === 0 ? <p className="text-gray-500">—</p> :
              <ul className="list-disc ml-6">{plan7.map((t, i) => <li key={i}>{t}</li>)}</ul>}
          </div>
          <div>
            <h4 className="font-semibold">Próximos 30 días</h4>
            {plan30.length === 0 ? <p className="text-gray-500">—</p> :
              <ul className="list-disc ml-6">{plan30.map((t, i) => <li key={i}>{t}</li>)}</ul>}
          </div>
        </div>
      </div>

      {fb.recommended_role && (
        <div>
          <h3 className="text-lg font-semibold">Rol recomendado</h3>
          <p>{fb.recommended_role}</p>
        </div>
      )}
    </div>
  );
}

