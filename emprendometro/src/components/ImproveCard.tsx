// src/components/ImproveCard.tsx
import Donut from "./Donut";
import { dimensionLabels } from "../utils/score";

type Improvement = {
  dimension: string;
  score: number;           // 0..20
  insight: string;
  quick_habits?: string[]; // opcional
};

export default function ImproveCard({ item }: { item: Improvement }) {
  const label =
    dimensionLabels[item.dimension as keyof typeof dimensionLabels] ||
    item.dimension;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white/80 shadow-sm p-4">
      <Donut value={item.score} size={56} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-800">{label}</span>
          <span
            className={`text-xs rounded-full px-2 py-0.5 ${
              item.score >= 17
                ? "bg-green-100 text-green-700"
                : item.score >= 10
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.score}/20
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-600">{item.insight}</p>

        {item.quick_habits && item.quick_habits.length > 0 && (
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
            {item.quick_habits.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

