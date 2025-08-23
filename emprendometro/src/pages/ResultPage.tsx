import { useContext, useEffect, useMemo, useState } from "react";
import { TestContext } from "../context/TestContext";
import ResultChart from "../components/ResultChart";
import { levelLabel, dimensionLabels, calcScores } from "../utils/score";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLastResult, insertResult, fromJson } from "../services/results";
import type { ScoreByDimension } from "../utils/score";

type LocationState =
  | { from: "completed"; scores: ScoreByDimension[] }
  | undefined;

export default function ResultPage() {
  const { state, dispatch } = useContext(TestContext);
  const { user, hasTestCompleted, setHasTestCompleted } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const incoming = location.state as LocationState;

  const [displayScores, setDisplayScores] = useState<ScoreByDimension[] | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");

  // 1) Primera visita tras completar: guardar UNA VEZ y mostrar esos scores
  useEffect(() => {
    if (!user) return;

    const saveIfFromCompleted = async () => {
      if (incoming?.from === "completed" && incoming.scores && !hasTestCompleted) {
        setDisplayScores(incoming.scores);
        setStatus("saving");
        const { error } = await insertResult(user.id, incoming.scores);
        if (error) {
          console.error(error);
          setStatus("error");
        } else {
          setHasTestCompleted(true); // a partir de ahora no podrá re-hacer el test
          setStatus("ok");
          // Limpia el state de navegación para evitar re-guardar al volver atrás/adelante
          navigate("/result", { replace: true });
        }
      }
    };

    saveIfFromCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, incoming, hasTestCompleted]);

  // 2) Cualquier otra visita (incluye refresh): leer de DB y mostrar
  useEffect(() => {
    if (!user) return;
    if (incoming?.from === "completed" && !hasTestCompleted) return; // ya se maneja arriba

    (async () => {
      const { data, error } = await getLastResult(user.id);
      if (error) {
        console.error(error);
        return;
      }
      if (!data) {
        // sin resultado → no debería estar aquí
        navigate("/test", { replace: true });
        return;
      }
      setDisplayScores(fromJson(data.scores as any));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hasTestCompleted]);

  // Fallback: si por alguna razón no hay incoming y aún no cargó DB, calculo local (solo visual)
  const total = useMemo(() => {
    const arr = displayScores ?? calcScores(state.answers);
    return arr.reduce((a, s) => a + s.value, 0);
  }, [displayScores, state.answers]);

  if (!user) return null;

  const scores = displayScores ?? calcScores(state.answers);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Resultados del Emprendómetro</h1>
      <p className="text-gray-600 mb-4">Puntaje total: <b>{total}/160</b></p>

      <ResultChart data={scores} />

      <div className="mt-4">
        {status === "saving" && <p className="text-sm text-gray-500">Guardando tu resultado…</p>}
        {status === "ok" && <p className="text-sm text-green-700">Resultado guardado ✅</p>}
        {status === "error" && (
          <p className="text-sm text-red-700">No pudimos guardar el resultado (intenta más tarde).</p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {scores.map((s) => (
          <div key={s.dimension} className="border rounded-xl p-4 flex justify-between items-center">
            <span>{dimensionLabels[s.dimension]}</span>
            <span className="font-semibold">{s.value}/20 — {levelLabel(s.value)}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          onClick={() => dispatch({ type: "RESET" })}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Volver al inicio
        </Link>

        {/* botón de rehacer (placeholder) */}
        <button
          className="px-6 py-2 rounded-xl border text-gray-500 cursor-not-allowed"
          title="Próximamente: podrás rehacer el test desde aquí"
          disabled
        >
          Rehacer test (próximamente)
        </button>
      </div>
    </div>
  );
}
