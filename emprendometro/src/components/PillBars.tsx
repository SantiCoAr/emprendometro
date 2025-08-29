import type { ScoreByDimension } from "../utils/score";
import { dimensionLabels, getColor, levelLabel } from "../utils/score";

export default function PillBars({ data }: { data: ScoreByDimension[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {data.map((s) => {
        const color = getColor(s.value);
        return (
          <div key={s.dimension} className="border rounded-xl p-3 bg-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                {dimensionLabels[s.dimension as keyof typeof dimensionLabels]}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {s.value}/20 · {levelLabel(s.value)}
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full transition-all"
                style={{ width: `${(s.value / 20) * 100}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
