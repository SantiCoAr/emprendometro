import { CheckCircle2 } from "lucide-react";
import type { Strength } from "../types/feedback";
import { dimensionLabels } from "../utils/score";

export default function StrengthCard({ item }: { item: Strength }) {
  return (
    <div className="rounded-xl border bg-white p-4 flex gap-3">
      <CheckCircle2 className="text-emerald-600 shrink-0" />
      <div>
        <div className="text-sm text-gray-500">
          {dimensionLabels[item.dimension as keyof typeof dimensionLabels]} · {item.score}/20
        </div>
        <div className="text-gray-800">{item.insight}</div>
      </div>
    </div>
  );
}
