// src/components/RadarScores.tsx
import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";
import type { ScoreByDimension } from "../utils/score";
import { dimensionLabels, getColor } from "../utils/score";

type Props = { data: ScoreByDimension[] };

export default function RadarScores({ data }: Props) {
  // Normalizamos a 0..1 para que el radar sea proporcional
  const ds = data.map((d) => ({
    name: dimensionLabels[d.dimension],
    value: d.value / 20, // 0..1
    raw: d.value,
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={ds} outerRadius="70%">
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
          <Radar
            dataKey="value"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
