// src/components/QuestionCard.tsx
import { memo, useMemo } from "react";

type AnyQuestion = {
  id: string | number;
  text: string;
  // Posibles formas del dataset
  options?: Array<{ label?: string; value?: number } | string>;
  choices?: Array<string> | { A?: string; B?: string; C?: string; D?: string; a?: string; b?: string; c?: string; d?: string };
  answers?: string[];
  respuestas?: string[];

  // Claves sueltas
  A?: string; B?: string; C?: string; D?: string;
  a?: string; b?: string; c?: string; d?: string;

  // Cualquier otra cosa…
  [k: string]: unknown;
};

type Props = {
  q: AnyQuestion;
  selected?: number | null;
  onSelect: (value: number) => void;
};

function normalizeOptions(q: AnyQuestion) {
  // 1) options como array
  if (Array.isArray(q.options) && q.options.length) {
    if (typeof q.options[0] === "string") {
      const arr = q.options as string[];
      return arr.slice(0, 4).map((t, i) => ({
        label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
        value: i + 1,
      }));
    } else {
      const arr = q.options as Array<{ label?: string; value?: number }>;
      return arr.slice(0, 4).map((o, i) => ({
        label: (o.label ?? `${String.fromCharCode(65 + i)})`).toString(),
        value: Number(o.value ?? i + 1),
      }));
    }
  }

  // 2) choices como array de strings
  if (Array.isArray(q.choices) && (q.choices as string[]).length) {
    const arr = q.choices as string[];
    return arr.slice(0, 4).map((t, i) => ({
      label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
      value: i + 1,
    }));
  }

  // 3) choices como objeto con A/B/C/D (o minúsculas)
  if (typeof q.choices === "object" && q.choices != null && !Array.isArray(q.choices)) {
    const obj = q.choices as Record<string, unknown>;
    const A = (obj.A ?? obj.a) as string | undefined;
    const B = (obj.B ?? obj.b) as string | undefined;
    const C = (obj.C ?? obj.c) as string | undefined;
    const D = (obj.D ?? obj.d) as string | undefined;
    if (A || B || C || D) {
      return [A, B, C, D].map((t, i) => ({
        label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
        value: i + 1,
      }));
    }
  }

  // 4) answers / respuestas
  if (Array.isArray(q.answers) && q.answers.length) {
    return (q.answers as string[]).slice(0, 4).map((t, i) => ({
      label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
      value: i + 1,
    }));
  }
  if (Array.isArray(q.respuestas) && q.respuestas.length) {
    return (q.respuestas as string[]).slice(0, 4).map((t, i) => ({
      label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
      value: i + 1,
    }));
  }

  // 5) Claves sueltas A/B/C/D (o a/b/c/d)
  const fromLooseKeys = (() => {
    const A = (q.A ?? q.a) as string | undefined;
    const B = (q.B ?? q.b) as string | undefined;
    const C = (q.C ?? q.c) as string | undefined;
    const D = (q.D ?? q.d) as string | undefined;
    if (A || B || C || D) {
      return [A, B, C, D].map((t, i) => ({
        label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
        value: i + 1,
      }));
    }
    return null;
  })();
  if (fromLooseKeys) return fromLooseKeys;

  // 6) Último recurso: detectar 4 strings en el objeto (excluyendo metadatos)
  const ignore = new Set(["id", "text", "dimension", "dim", "category", "group", "weight"]);
  const stringEntries = Object.entries(q)
    .filter(([k, v]) => typeof v === "string" && !ignore.has(k))
    // orden amigable si hay A/B/C/D
    .sort(([ka], [kb]) => {
      const order = ["A", "B", "C", "D", "a", "b", "c", "d"];
      const ia = order.indexOf(ka);
      const ib = order.indexOf(kb);
      if (ia !== -1 && ib !== -1) return ia - ib;
      return ka.localeCompare(kb);
    })
    .slice(0, 4);

  if (stringEntries.length >= 2) {
    return stringEntries.map(([_, t], i) => ({
      label: `${String.fromCharCode(65 + i)}) ${String(t)}`.trim(),
      value: i + 1,
    }));
  }

  // Fallback final: placeholders (para evitar vacío)
  console.warn("No pude detectar opciones en la pregunta:", q);
  return [
    { label: "A) ", value: 1 },
    { label: "B) ", value: 2 },
    { label: "C) ", value: 3 },
    { label: "D) ", value: 4 },
  ];
}

export default memo(function QuestionCard({ q, selected, onSelect }: Props) {
  const opts = useMemo(() => normalizeOptions(q), [q]);

  const groupName = `q-${q.id}`;

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">{q.text}</h2>

      <div className="space-y-3">
        {opts.map((opt) => (
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


