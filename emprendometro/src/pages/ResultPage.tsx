// src/pages/ResultPage.tsx
import { useContext } from "react";
import { TestContext } from "../context/TestContext";
import { calcScores, levelLabel, dimensionLabels } from "../utils/score";
import ResultChart from "../components/ResultChart";
import { Link } from "react-router-dom";

export default function ResultPage() {
  const { state, dispatch } = useContext(TestContext);
  const scores = calcScores(state.answers);
  console.log("DEBUG scores:", scores);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Resultados del Emprendómetro</h1>
      <ResultChart data={scores} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {scores.map((s) => (
          <div
            key={s.dimension}
            className="border rounded-xl p-4 flex justify-between items-center"
          >
            <span>{dimensionLabels[s.dimension]}</span>
            <span className="font-semibold">
              {s.value}/20 — {levelLabel(s.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          onClick={() => dispatch({ type: "RESET" })}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

