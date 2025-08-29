// api/generate-feedback.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  try {
    const { scores } = req.body as { scores: Record<string, number> };
    if (!scores || typeof scores !== "object") {
      return res.status(400).json({ error: "Missing 'scores' payload" });
    }

    const system = `
Eres un mentor de emprendimiento. Tienes un perfil de 8 dimensiones (curiosidad, resiliencia, comercial, estrategia, liderazgo, autonomía, propósito, emocional).
Devuelve SOLO JSON válido con la forma:
{
  "headline": string,
  "summary": string,
  "strengths": [{ "dimension": string, "score": number, "insight": string }],
  "improvements": [{ "dimension": string, "score": number, "insight": string, "quick_habits": [string, string] }],
  "action_plan": { "next_7_days": [string, string, string], "next_30_days": [string, string, string] },
  "recommended_role": string
}`.trim();

    const user = `
Resultados (0-20 por dimensión):
${JSON.stringify(scores, null, 2)}

Instrucciones:
- 2-3 fortalezas con insight concreto.
- 2 áreas de mejora con hábitos accionables.
- Plan de acción: 3 tareas (7 días) y 3 (30 días).
- recommended_role: "CEO Comercial", "CTO/Product", "Ops/COO", u otro.
- Tono: mentor experto, directo, en español.
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    });

    const text = completion.choices?.[0]?.message?.content || "{}";
    const json = JSON.parse(text); // gracias a response_format es JSON válido

    return res.status(200).json({ feedback: json });
  } catch (e: any) {
    const status = e?.status ?? e?.response?.status ?? 500;
    const code =
      e?.error?.type ||
      e?.code ||
      e?.response?.data?.error?.code ||
      e?.response?.data?.error?.type ||
      "unknown";

    const detail =
      e?.message ||
      e?.response?.data?.error?.message ||
      "Unknown error";

    console.error("generate-feedback error:", { status, code, detail });
    return res.status(status).json({ error: "OpenAI error", code, detail });
  }
}


