import { useMemo, useState } from "react";

function Column({ title, items }: { title: string; items: string[] }) {
  const [done, setDone] = useState<boolean[]>(items.map(() => false));
  const progress = useMemo(
    () => (done.length ? (done.filter(Boolean).length / done.length) * 100 : 0),
    [done]
  );
  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{title}</h4>
        <div className="text-xs text-gray-500">{Math.round(progress)}%</div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
        <div
          className="h-2 bg-indigo-400 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={done[i]}
              onChange={() =>
                setDone(prev => prev.map((v, idx) => (idx === i ? !v : v)))
              }
              className="mt-1"
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ActionTimeline({
  next7,
  next30,
}: {
  next7: string[];
  next30: string[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Column title="Próximos 7 días" items={next7} />
      <Column title="Próximos 30 días" items={next30} />
    </div>
  );
}
