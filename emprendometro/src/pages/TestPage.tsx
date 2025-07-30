// src/pages/TestPage.tsx
import { useContext } from "react";
import { TestContext } from "../context/TestContext";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const { state, dispatch } = useContext(TestContext);
  const navigate = useNavigate();

  const q = questions[state.index];
  const selected = state.answers[q.id];

  const handleNext = () => {
    if (state.index === questions.length - 1) {
      navigate("/result");
    } else {
      dispatch({ type: "NEXT" });
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-4">
      <ProgressBar current={state.index + 1} total={questions.length} />
      <QuestionCard
        q={q}
        selected={selected}
        onSelect={(v) => dispatch({ type: "ANSWER", id: q.id, value: v })}
      />
      <div className="flex justify-between max-w-xl mx-auto mt-6">
        <button
          onClick={() => dispatch({ type: "PREV" })}
          disabled={state.index === 0}
          className="px-4 py-2 rounded-lg bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={selected == null}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
        >
          {state.index === questions.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
