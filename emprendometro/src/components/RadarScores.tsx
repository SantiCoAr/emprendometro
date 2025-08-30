// src/components/RadarScores.tsx
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { ScoreByDimension } from "../utils/score";
import { dimensionLabels } from "../utils/score";

const labelOf = (d: string) =>
  dimensionLabels[d as keyof typeof dimensionLabels] ?? d;

export default function RadarScores({ data }: { data: ScoreByDimension[] }) {
  const rad = data.map((d) => ({
    name: labelOf(d.dimension),
    value: d.value,
  }));

  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <RadarChart data={rad}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

