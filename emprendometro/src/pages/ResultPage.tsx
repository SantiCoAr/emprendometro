// src/pages/ResultPage.tsx
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TestContext } from "../context/TestContext";
import { useAuth } from "../context/AuthContext";
import ResultChart from "../components/ResultChart";
import FeedbackView from "../components/FeedbackView";
import { levelLabel, dimensionLabels, calcScores, type ScoreByDimension } from "../utils/score";
import {
  getLastResult,
  insertResult,
  fromJson,
  updateResultFeedback,
} from "../services/results";

type LocationState = { from: "completed"; scores: ScoreByDimension[] } | undefined;

function safeParseJson(v: any) {
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return null; }
}

export default function ResultPage() {
  const { state, dispatch } = useContext(TestContext);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const incoming = location.state as LocationState;

  const [displayScores, setDisplayScores] = useState<ScoreByDimension[] | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");

  const [feedback, setFeedback] = useState<any>(null);
  const [feedbackStatus, setFeedbackStatus] =
    useState<"idle" | "loading" | "ok" | "error">("idle");

  const savedOnce = useRef(false);
  const lastResultIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;

    if (incoming?.from === "completed" && incoming.scores && !savedOnce.current) {
      savedOnce.current = true;
      setDisplayScores(incoming.scores);

      (async () => {
        setStatus("saving");
        const { error } = await insertResult(user.id, incoming.scores);
        setStatus(error ? "error" : "ok");
        navigate("/result", { replace: true });
      })();

      return;
    }

    (async () => {
      const { data, error } = await getLastResult(user.id);
      if (error) { console.error(error); return; }
      if (!data) { navigate("/test", { replace: true }); return; }

      lastResultIdRef.current = data.id;
      setDisplayScores(fromJson(data.scores as any));
      setFeedback(safeParseJson(data.feedback));
    })();
  }, [user, incoming, navigate]);

  useEffect(() => {
    const canGenerate = !!user && !!displayScores && !feedback && !!lastResultIdRef.current;
    if (!canGenerate) return;

    (async () => {
      try {
        setFeedbackStatus("loading");

        const scoresObj = Object.fromEntries(
          displayScores!.map((s) => [s.dimension, s.value])
        );

        const resp = await fetch("/api/generate-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scores: scoresObj, userEmail: user!.email }),
        });

        if (!resp.ok) {
          let payload: any = {};
          try { payload = await resp.json(); } catch {}
          setFeedbackStatus("error");
          setFeedback(payload?.detail || payload?.error || `HTTP ${resp.status}`);
          return;
        }

        const { feedback: fb } = await resp.json();
        setFeedback(fb);

        const { error: upErr } = await updateResultFeedback(lastResultIdRef.current!, fb);
        setFeedbackStatus(upErr ? "error" : "ok");
      } catch (e: any) {
        console.error(e);
        setFeedbackStatus("error");
      }
    })();
  }, [user, displayScores, feedback]);

  const scores = displayScores ?? calcScores(state.answers);
  const total = useMemo(() => scores.reduce((a, s) => a + s.value, 0), [scores]);

  return (
    <div className="px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mt-4 mb-2 text-center">
          Resultados del Emprendómetro
        </h1>
        <p className="text-center text-slate-600 mb-4">
          Puntaje total: <b>{total}/160</b>
        </p>

        {/* Card centrada para el chart */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-center">
          <ResultChart data={scores} />
        </div>

        <div className="mt-3 text-center">
          {status === "saving" && <p className="text-sm text-gray-500">Guardando tu resultado…</p>}
          {status === "ok" && <p className="text-sm text-green-700">Resultado guardado ✅</p>}
          {status === "error" && <p className="text-sm text-red-700">No pudimos guardar el resultado.</p>}
        </div>

        {/* Feedback IA en tarjetas */}
        <div className="mt-8">
          {feedbackStatus === "loading" && (
            <p className="text-sm text-gray-500 text-center">Generando tu feedback personalizado…</p>
          )}

          {feedback && typeof feedback !== "string" && (
            <FeedbackView data={feedback} scores={scores} />
          )}

          {feedbackStatus === "error" && typeof feedback === "string" && (
            <p className="text-sm text-red-700 text-center">
              No pudimos generar el feedback ahora. Detalle: {feedback}
            </p>
          )}
        </div>

        <div className="mt-10 mb-8 flex flex-wrap justify-center gap-3">
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
    </div>
  );
}
