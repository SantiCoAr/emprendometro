// src/components/QuestionCard.tsx
import { memo } from "react";

type Question = {
  id: string | number;
  text: string;
  // Podés adaptar esta interfaz a tu estructura real
  options: { label: string; value: number }[]; // value: 1..4
};

export default memo(function QuestionCard({
  q,
  selected,
  onSelect,
}: {
  q: Question;
  selected?: number | null;
  onSelect: (value: number) => void;
}) {
  // name único por pregunta evita “arrastre” del radio
  const groupName = `q-${q.id}`;

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">{q.text}</h2>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name={groupName}
              value={opt.value}
              checked={selected === opt.value}      // ← controlado
              onChange={() => onSelect(Number(opt.value))} // ← num explícito
              className="h-4 w-4"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
});
