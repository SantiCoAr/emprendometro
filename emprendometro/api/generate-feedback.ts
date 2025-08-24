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
    const { scores, userEmail } = req.body as {
      scores: Record<string, number>;
      userEmail?: string;
    };

    if (!scores || typeof scores !== "object") {
      return res.status(400).json({ error: "Missing 'scores' payload" });
    }

    const system = `
Eres un mentor de emprendimiento. Tienes un perfil de 8 dimensiones (curiosidad, resiliencia, comercial, estrategia, liderazgo, autonomía, propósito, emocional).
Tu objetivo: generar un feedback breve, claro y accionable, en tono profesional y positivo.
Devuelve SOLO JSON válido con esta forma:
{
  "headline": string,
  "summary": string,
  "strengths": [{ "dimension": string, "score": number, "insight": string }],
  "improvements": [{ "dimension": string, "score": number, "insight": string, "quick_habits": [string, string] }],
  "action_plan": { "next_7_days": [string, string, string], "next_30_days": [string, string, string] },
  "recommended_role": string
}
    `.trim();

    const user = `
Resultados del usuario (0-20 por dimensión):
${JSON.stringify(scores, null, 2)}

Instrucciones:
- Elige 2-3 fortalezas con insight concreto.
- Elige 2 áreas de mejora con hábitos accionables.
- Plan de acción: 3 tareas para 7 días y 3 para 30 días (precisas y medibles).
- recommended_role: "CEO Comercial", "CTO/Product", "Ops/COO", u otro, según el perfil.
- Tono: mentor experto, directo, sin jerga innecesaria. En español.
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    let json: any = null;
    try {
      json = JSON.parse(text);
    } catch {
      const m = text.match(/\{[\s\S]*\}$/);
      if (m) json = JSON.parse(m[0]);
    }
    if (!json) {
      return res.status(502).json({ error: "LLM returned non-JSON", raw: text });
    }

    return res.status(200).json({ feedback: json });
  } catch (e: any) {
    console.error("generate-feedback error:", e);
    return res.status(500).json({ error: "Internal error", detail: e?.message });
  }
}
