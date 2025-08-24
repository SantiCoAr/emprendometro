type Strength = { dimension: string; score: number; insight: string };
type Improvement = { dimension: string; score: number; insight: string; quick_habits: string[] };
type ActionPlan = { next_7_days: string[]; next_30_days: string[] };

type Feedback = {
  headline: string;
  summary: string;
  strengths: Strength[];
  improvements: Improvement[];
  action_plan: ActionPlan;
  recommended_role: string;
};

export default function FeedbackView({ data }: { data: Feedback }) {
  if (!data) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6">
      <div className="p-5 border rounded-xl">
        <h2 className="text-xl font-semibold">{data.headline}</h2>
        <p className="text-gray-700 mt-2">{data.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-5 border rounded-xl">
          <h3 className="font-semibold mb-2">Fortalezas</h3>
          <ul className="space-y-2">
            {data.strengths?.map((s, i) => (
              <li key={i} className="p-3 bg-green-50 rounded">
                <b>{s.dimension}</b> ({s.score}/20): {s.insight}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 border rounded-xl">
          <h3 className="font-semibold mb-2">Áreas de mejora</h3>
          <ul className="space-y-2">
            {data.improvements?.map((it, i) => (
              <li key={i} className="p-3 bg-yellow-50 rounded">
                <b>{it.dimension}</b> ({it.score}/20): {it.insight}
                {it.quick_habits?.length > 0 && (
                  <ul className="list-disc ml-6 mt-2">
                    {it.quick_habits.map((h, j) => <li key={j}>{h}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 border rounded-xl">
        <h3 className="font-semibold mb-2">Plan de acción</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium">Próximos 7 días</h4>
            <ul className="list-disc ml-6 mt-2">
              {data.action_plan?.next_7_days?.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Próximos 30 días</h4>
            <ul className="list-disc ml-6 mt-2">
              {data.action_plan?.next_30_days?.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-5 border rounded-xl">
        <h3 className="font-semibold">Rol recomendado</h3>
        <p className="text-gray-800 mt-1">{data.recommended_role}</p>
      </div>
    </div>
  );
}
