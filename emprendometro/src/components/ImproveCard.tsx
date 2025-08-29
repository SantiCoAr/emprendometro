import { Wrench } from "lucide-react";
import { useState } from "react";
import type { Improvement } from "../types/feedback";
import { dimensionLabels } from "../utils/score";

export default function ImproveCard({ item }: { item: Improvement }) {
  const [done, setDone] = useState<boolean[]>(
    item.quick_habits?.map(() => false) ?? []
  );

  const toggle = (i: number) =>
    setDone(prev => prev.map((v, idx) => (idx === i ? !v : v)));

  const progress = done.length ? (done.filter(Boolean).length / done.length) * 100 : 0;

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center gap-2 mb-1">
        <Wrench className="text-amber-600" />
        <div className="text-sm text-gray-500">
          {dimensionLabels[item.dimension as keyof typeof dimensionLabels]} · {item.score}/20
        </div>
      </div>
      <p className="text-gray-800 mb-3">{item.insight}</p>

      {item.quick_habits?.length > 0 && (
        <>
          <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <div
              className="h-2 bg-amber-400 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ul className="space-y-2">
            {item.quick_habits.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={done[i]}
                  onChange={() => toggle(i)}
                  className="mt-1"
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
