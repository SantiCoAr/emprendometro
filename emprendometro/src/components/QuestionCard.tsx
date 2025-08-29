import { memo, useMemo } from "react";

type Props = {
  q: any;
  qid: string;                   // <<-- nuevo
  selected?: number | null;
  onSelect: (value: number) => void;
};

function fromArrayLike(arr: any[]) {
  if (!arr?.length) return [];
  if (typeof arr[0] === "string") {
    return (arr as string[]).slice(0, 4).map((t, i) => ({
      label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
      value: i + 1,
    }));
  }
  return (arr as any[]).slice(0, 4).map((o, i) => {
    const txt = o?.text ?? o?.label ?? o?.name ?? o?.value ?? "";
    const val = o?.value != null ? Number(o.value) : i + 1;
    return {
      label: `${String.fromCharCode(65 + i)}) ${String(txt)}`.trim(),
      value: val,
    };
  });
}

function normalizeOptions(q: any) {
  const arrayKeys = [
    "options",
    "choices",
    "answers",
    "respuestas",
    "alternatives",
    "alternativas",
    "opciones",
  ];
  for (const k of arrayKeys) {
    const v = q?.[k];
    if (Array.isArray(v) && v.length) {
      const out = fromArrayLike(v);
      if (out.length) return out;
    }
  }

  if (q?.choices && !Array.isArray(q.choices) && typeof q.choices === "object") {
    const obj = q.choices as Record<string, any>;
    const A = obj.A ?? obj.a;
    const B = obj.B ?? obj.b;
    const C = obj.C ?? obj.c;
    const D = obj.D ?? obj.d;
    if (A || B || C || D) {
      return [A, B, C, D].map((t, i) => ({
        label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
        value: i + 1,
      }));
    }
  }

  {
    const A = q?.A ?? q?.a;
    const B = q?.B ?? q?.b;
    const C = q?.C ?? q?.c;
    const D = q?.D ?? q?.d;
    if (A || B || C || D) {
      return [A, B, C, D].map((t, i) => ({
        label: `${String.fromCharCode(65 + i)}) ${t ?? ""}`.trim(),
        value: i + 1,
      }));
    }
  }

  const entries = Object.entries(q ?? {});
  const candidateRegex = /^(op|opt|option|resp|respuesta|ans|alt|opcion)[ _-]?(1|2|3|4)$/i;
  const numbered = entries
    .filter(([k, v]) => typeof v === "string" && candidateRegex.test(k))
    .sort(([ka], [kb]) => {
      const na = Number(ka.match(/\d/)?.[0] ?? 0);
      const nb = Number(kb.match(/\d/)?.[0] ?? 0);
      return na - nb;
    })
    .slice(0, 4);

  if (numbered.length >= 2) {
    return numbered.map(([_, t], i) => ({
      label: `${String.fromCharCode(65 + i)}) ${String(t)}`.trim(),
      value: i + 1,
    }));
  }

  const ignore = new Set(["id", "text", "question", "title", "dimension", "dim", "category", "group", "weight"]);
  const strings = entries
    .filter(([k, v]) => typeof v === "string" && !ignore.has(k))
    .slice(0, 4);

  if (strings.length >= 2) {
    return strings.map(([_, t], i) => ({
      label: `${String.fromCharCode(65 + i)}) ${String(t)}`.trim(),
      value: i + 1,
    }));
  }

  console.log("[QuestionCard] No pude detectar opciones en la pregunta:", q);
  return [
    { label: "A) ", value: 1 },
    { label: "B) ", value: 2 },
    { label: "C) ", value: 3 },
    { label: "D) ", value: 4 },
  ];
}

export default memo(function QuestionCard({ q, qid, selected, onSelect }: Props) {
  const opts = useMemo(() => normalizeOptions(q), [q]);

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">{q?.text ?? q?.question ?? q?.title}</h2>
      <div className="space-y-3">
        {opts.map((opt) => (
          <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={qid}                     // <<-- ahora el grupo SIEMPRE es único
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

