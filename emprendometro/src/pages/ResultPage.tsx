import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { TestContext } from "../context/TestContext";
import ResultChart from "../components/ResultChart";
import { levelLabel, dimensionLabels, calcScores } from "../utils/score";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getLastResult,
  insertResult,
  fromJson,
  updateResultFeedback,
} from "../services/results";
import type { ScoreByDimension } from "../utils/score";
import FeedbackView from "../components/FeedbackView";

type LocationState = { from: "completed"; scores: ScoreByDimension[] } | undefined;

export default function ResultPage() {
  const { state, dispatch } = useContext(TestContext);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state as LocationState;

  const [displayScores, setDisplayScores] = useState<ScoreByDimension[] | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [feedback, setFeedback] = useState<any>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const savedOnce = useRef(false);
  const lastResultIdRef = useRef<string | null>(null);

  // 1) Inserción del resultado si vengo de "Finalizar".
  useEffect(() => {
    if (!user) return;

    if (incoming?.from === "completed" && incoming.scores && !savedOnce.current) {
      savedOnce.current = true;
      setDisplayScores(incoming.scores);

      (async () => {
        setStatus("saving");
        const { error } = await insertResult(user.id, incoming.scores);
        if (error) setStatus("error"); else setStatus("ok");
        // Limpio el state para evitar re-insertar al refrescar
        navigate("/result", { replace: true });
      })();

      return; // No sigo al fetch en este render
    }

    // 2) Visita normal o refresh → leer último resultado desde DB (incluye feedback si existe)
    (async () => {
      const { data, error } = await getLastResult(user.id);
      if (error) { console.error(error); return; }
      if (!data) { navigate("/test", { replace: true }); return; }

      lastResultIdRef.current = data.id;
      setDisplayScores(fromJson(data.scores as any));
      setFeedback(data.feedback ?? null);
    })();
  }, [user, incoming, navigate]);

  // 3) Si tengo scores y no tengo feedback, lo genero (una sola vez) y lo guardo en DB
  useEffect(() => {
    const canGenerate = !!user && !!displayScores && !feedback && !!lastResultIdRef.current;
    if (!canGenerate) return;

    (async () => {
      try {
        setFeedbackStatus("loading");
        const scoresObj = Object.fromEntries(displayScores!.map(s => [s.dimension, s.value]));

        const resp = await fetch("/api/generate-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scores: scoresObj, userEmail: user!.email }),
        });

        const json = await resp.json();
        if (!resp.ok) throw new Error(json?.error || "LLM error");

        setFeedback(json.feedback);
        await updateResultFeedback(lastResultIdRef.current!, json.feedback);
        setFeedbackStatus("ok");
      } catch (e) {
        console.error(e);
        setFeedbackStatus("error");
      }
    })();
  }, [user, displayScores, feedback]);

  const scores = displayScores ?? calcScores(state.answers);
  const total = useMemo(() => scores.reduce((a, s) => a + s.value, 0), [scores]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Resultados del Emprendómetro</h1>
      <p className="text-gray-600 mb-4">Puntaje total: <b>{total}/160</b></p>

      <ResultChart data={scores} />

      <div className="mt-4">
        {status === "saving" && <p className="text-sm text-gray-500">Guardando tu resultado…</p>}
        {status === "ok" && <p className="text-sm text-green-700">Resultado guardado ✅</p>}
        {status === "error" && <p className="text-sm text-red-700">No pudimos guardar el resultado.</p>}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {scores.map((s) => (
          <div key={s.dimension} className="border rounded-xl p-4 flex justify-between items-center">
            <span>{dimensionLabels[s.dimension]}</span>
            <span className="font-semibold">{s.value}/20 — {levelLabel(s.value)}</span>
          </div>
        ))}
      </div>

      {/* Feedback IA */}
      <div className="mt-8">
        {feedbackStatus === "loading" && (
          <p className="text-sm text-gray-500">Generando tu feedback personalizado…</p>
        )}
        {feedback && <FeedbackView data={feedback} />}
        {feedbackStatus === "error" && (
          <p className="text-sm text-red-700">No pudimos generar el feedback ahora. Intentalo más tarde.</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          onClick={() => dispatch({ type: "RESET" })}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Volver al inicio
        </Link>

        <button
          onClick={() => {
            dispatch({ type: "RESET" });
            navigate("/test", { state: { from: "retake" } });
          }}
          className="px-6 py-2 rounded-xl border hover:bg-gray-50"
        >
          Rehacer test
        </button>
      </div>
    </div>
  );
}
