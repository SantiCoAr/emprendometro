import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.OPENAI_API_KEY || "";
  return res.status(200).json({
    hasKey: Boolean(key),
    keyPrefix: key ? key.slice(0, 4) + "..." : null,
    node: process.version
  });
}
