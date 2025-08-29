import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import type { ScoreByDimension } from "../utils/score";
import { dimensionLabels } from "../utils/score";

export default function RadarProfile({ data }: { data: ScoreByDimension[] }) {
  // Mapea al formato que espera Recharts
  const chartData = data.map(d => ({
    dimension: dimensionLabels[d.dimension as keyof typeof dimensionLabels],
    value: d.value,
  }));

  return (
    <div className="w-full h-72 bg-white rounded-xl border">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} outerRadius="75%">
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
          <Radar
            name="Perfil"
            dataKey="value"
            stroke="#2563eb"
            fill="#93c5fd"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
