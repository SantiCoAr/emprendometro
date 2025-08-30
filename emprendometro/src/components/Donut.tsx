// src/components/Donut.tsx
import { PieChart, Pie, Cell } from "recharts";

export default function Donut({
  value, // 0..100
  label,
  color = "#0ea5a4",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const data = [
    { name: "done", value },
    { name: "rest", value: Math.max(0, 100 - value) },
  ];
  return (
    <div className="relative" style={{ width: 180, height: 180 }}>
      <PieChart width={180} height={180}>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          dataKey="value"
        >
          <Cell key="done" fill={color} />
          <Cell key="rest" fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {Math.round(value)}%
          </div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

