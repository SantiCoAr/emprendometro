import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // si falla el import, esta función ni siquiera se ejecuta
  return res.status(200).json({
    imported: !!OpenAI,
    node: process.version
  });
}
