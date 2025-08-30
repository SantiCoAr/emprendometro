// src/components/Donut.tsx
import React from "react";

type DonutProps = {
  /** 0..100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string; // tailwind-compatible hex (we use inline style)
  label?: string;
};

export default function Donut({
  value,
  size = 120,
  strokeWidth = 12,
  color = "#16a34a", // verde
  label = "Total",
}: DonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="-mt-24 text-center rotate-90">
        <div className="text-2xl font-bold">{Math.round(value)}%</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}
