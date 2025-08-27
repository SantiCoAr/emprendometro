// src/config.ts
// Reemplaza el dominio por el tuyo (tu-dominio.vercel.app)
const PROD_ORIGIN = "https://emprendometro.vercel.app";

export const API_BASE = import.meta.env.DEV ? PROD_ORIGIN : "";
