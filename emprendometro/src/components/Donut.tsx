// src/components/Donut.tsx
import React from "react";

// Mapea puntaje -> color
function scoreColor(v: number) {
  if (v >= 17) return "#16a34a"; // verde
  if (v >= 10) return "#facc15"; // amarillo
  return "#ef4444";             // rojo
}

type DonutProps = {
  value: number;         // 0..20
  size?: number;         // diámetro en px
  stroke?: number;       // grosor del anillo
  showText?: boolean;    // mostrar "x/20" dentro
};

export default function Donut({
  value,
  size = 56,        // tamaño pequeño por defecto
  stroke = 6,       // grosor del borde
  showText = true,
}: DonutProps) {
  const pct = Math.max(0, Math.min(100, (value / 20) * 100));
  const radius = 16;                // radio del círculo de base (SVG viewBox 36x36)
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference;

  const px = `${size}px`;
  const color = scoreColor(value);

  return (
    <div style={{ width: px, height: px }} className="relative shrink-0">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        {/* Fondo */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#e5e7eb"     // gris claro
          strokeWidth={stroke}
        />
        {/* Progreso */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          transform="rotate(-90 18 18)" // comienzo en la parte superior
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-slate-700">
            {value}/20
          </span>
        </div>
      )}
    </div>
  );
}
