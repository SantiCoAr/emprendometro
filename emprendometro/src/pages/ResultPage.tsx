// src/pages/ResultPage.tsx
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TestContext } from "../context/TestContext";
import { useAuth } from "../context/AuthContext";
import ResultChart from "../components/ResultChart";
import FeedbackView from "../components/FeedbackView";
import { calcScores } from "../utils/score";
import type { ScoreByDimension } from "../utils/score";
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

    // Inserto si vengo de “Finalizar”
    if (incoming?.from === "completed" && incoming.scores && !savedOnce.current) {
      savedOnce.current = true;
      setDisplayScores(incoming.scores);
      (async () => {
        setStatus("saving");
        const { error } = await insertResult(user.id, incoming.scores);
        setStatus(error ? "error" : "ok");
        navigate("/result", { replace: true }); // Evita reinsertar al refrescar
      })();
      return;
    }

    // Refresh/visita normal
    (async () => {
      const { data, error } = await getLastResult(user.id);
      if (error) { console.error(error); return; }
      if (!data) { navigate("/test", { replace: true }); return; }
      lastResultIdRef.current = data.id;
      setDisplayScores(fromJson(data.scores as any));
      setFeedback(safeParseJson(data.feedback));
    })();
  }, [user, incoming, navigate]);

  // Generar feedback si no existe
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
          if (resp.status === 429) {
            setFeedbackStatus("error");
            setFeedback(`QUOTA: ${payload?.detail || payload?.error || "Quota exceeded"}`);
            return;
          }
          setFeedbackStatus("error");
          setFeedback(payload?.detail || payload?.error || "Unknown error");
          return;
        }

        const { feedback: fb } = await resp.json();
        setFeedback(fb);

        const { error: upErr } = await updateResultFeedback(lastResultIdRef.current!, fb);
        if (upErr) {
          console.error("updateResultFeedback error:", upErr);
          setFeedbackStatus("error");
        } else {
          setFeedbackStatus("ok");
        }
      } catch (e) {
        console.error(e);
        setFeedbackStatus("error");
      }
    })();
  }, [user, displayScores, feedback]);

  const scores = displayScores ?? calcScores(state.answers);

  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-5xl">
        {/* Título nuevo */}
        <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">Tus resultados</h1>

        {/* Gráfico centrado */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <ResultChart data={scores} />
          </div>
        </div>

        {/* Estado de guardado (discreto) */}
        <div className="mt-2 text-center">
          {status === "saving" && <p className="text-xs text-gray-500">Guardando tu resultado…</p>}
          {status === "ok" && <p className="text-xs text-green-700">Resultado guardado ✅</p>}
          {status === "error" && <p className="text-xs text-red-700">No pudimos guardar el resultado.</p>}
        </div>

        {/* ==== FEEDBACK === */}
        <div className="mt-10">
          {feedbackStatus === "loading" && (
            <p className="text-sm text-gray-500 text-center">Generando tu feedback personalizado…</p>
          )}

          {feedback && typeof feedback === "string" && feedback.startsWith("QUOTA") && (
            <div className="mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 text-center">
              <b>Sin créditos de IA</b>. Tus resultados están guardados correctamente.
              Cuando recarguemos crédito podrás reintentar.
            </div>
          )}

          {feedback && typeof feedback !== "string" && (
            <FeedbackView data={feedback}  />
          )}

          {feedbackStatus === "error" &&
            (!feedback || !String(feedback).startsWith("QUOTA")) && (
            <p className="text-sm text-red-700 text-center">
              No pudimos generar el feedback ahora. Inténtalo más tarde.
              {feedback ? <> Detalle: {String(feedback)}</> : null}
            </p>
          )}
        </div>

        {/* Botón único */}
        <div className="mt-10 flex justify-center">
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


