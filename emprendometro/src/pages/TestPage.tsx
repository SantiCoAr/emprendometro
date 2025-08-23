// src/pages/TestPage.tsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TestContext } from "../context/TestContext";
import { questions } from "../data/questions";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { calcScores } from "../utils/score";

export default function TestPage() {
  const { state, dispatch } = useContext(TestContext);
  const navigate = useNavigate();

  // Seguridad básica por si el índice se sale (no debería ocurrir)
  const isOutOfRange = state.index < 0 || state.index >= questions.length;
  const q = isOutOfRange ? questions[0] : questions[state.index];
  const selected = state.answers[q.id];
  const isLast = state.index === questions.length - 1;

  const handlePrev = () => {
    if (state.index > 0) {
      dispatch({ type: "PREV" });
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      dispatch({ type: "NEXT" });
      window.scrollTo(0, 0);
      return;
    }
    // Última pregunta → calculamos scores y vamos a /result
    const scores = calcScores(state.answers);
    navigate("/result", { state: { from: "completed", scores } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <ProgressBar current={state.index + 1} total={questions.length} />
          <p className="mt-2 text-sm text-gray-600">
            Pregunta {state.index + 1} de {questions.length}
          </p>
        </div>

        <QuestionCard
          q={q}
          selected={selected}
          onSelect={(v) => dispatch({ type: "ANSWER", id: q.id, value: v })}
        />

        <div className="flex justify-between max-w-xl mx-auto mt-6">
          <button
            onClick={handlePrev}
            disabled={state.index === 0}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={selected == null}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
          >
            {isLast ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
