// src/components/QuestionCard.tsx
import type { Question } from "../data/questions";

interface Props {
  q: Question;
  selected?: number;
  onSelect: (value: number) => void;
}

const QuestionCard: React.FC<Props> = ({ q, selected, onSelect }) => (
  <div className="p-6 bg-white rounded-2xl shadow max-w-xl mx-auto">
    <h2 className="text-xl font-semibold mb-4">{q.text}</h2>
    {q.options.map((o) => (
      <label key={o.label} className="flex items-center gap-2 py-1">
        <input
          type="radio"
          name={q.id}
          value={o.value}
          checked={selected === o.value}
          onChange={() => onSelect(o.value)}
        />
        <span>{o.label}) {o.text}</span>
      </label>
    ))}
  </div>
);

export default QuestionCard;
