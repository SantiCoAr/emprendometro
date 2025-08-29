// src/components/QuestionCard.tsx
import { memo } from "react";

type AnyQuestion = {
  id: string | number;
  text: string;
  // Cualquiera de estos formatos puede venir en tu dataset:
  options?: { label: string; value: number }[]; // [{label, value:1..4}]
  choices?: { A?: string; B?: string; C?: string; D?: string; a?: string; b?: string; c?: string; d?: string };
  A?: string; B?: string; C?: string; D?: string;
  a?: string; b?: string; c?: string; d?: string;
};

export default memo(function QuestionCard({
  q,
  selected,
  onSelect,
}: {
  q: AnyQuestion;
  selected?: number | null;
  onSelect: (value: number) => void;
}) {
  // 1) Normalizamos las opciones desde distintos formatos
  const normalized =
    Array.isArray(q.options) && q.options.length
      ? q.options.map((o, i) => ({
          label: o.label ?? `${String.fromCharCode(65 + i)})`,
          value: Number(o.value ?? i + 1),
        }))
      : (() => {
          const src: Record<string, string | undefined> = {
            A: (q as any).A ?? (q as any).a ?? (q as any).choices?.A ?? (q as any).choices?.a,
            B: (q as any).B ?? (q as any).b ?? (q as any).choices?.B ?? (q as any).choices?.b,
            C: (q as any).C ?? (q as any).c ?? (q as any).choices?.C ?? (q as any).choices?.c,
            D: (q as any).D ?? (q as any).d ?? (q as any).choices?.D ?? (q as any).choices?.d,
          };
          const texts = [src.A, src.B, src.C, src.D];
          return texts.map((t, i) => ({
            label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(), // "A) texto…"
            value: i + 1, // 1..4
          }));
        })();

  // 2) name único por pregunta (evita que se arrastre la selección)
  const groupName = `q-${q.id}`;

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">{q.text}</h2>

      <div className="space-y-3">
        {normalized.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={groupName}
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onSelect(Number(opt.value))}
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});

