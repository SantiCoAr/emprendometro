import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL!;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY!;

console.log("ENV URL:", (import.meta.env.VITE_SUPABASE_URL || "").slice(0, 30));
console.log("ENV KEY:", (import.meta.env.VITE_SUPABASE_ANON_KEY || "").slice(0, 15), "…");

export const supabase = createClient(url, key);
