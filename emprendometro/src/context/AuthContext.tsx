import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  hasTestCompleted: boolean;
  setHasTestCompleted: (v: boolean) => void; // para actualizar tras guardar
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signInWithEmail: async () => ({}),
  signOut: async () => {},
  hasTestCompleted: false,
  setHasTestCompleted: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasTestCompleted, setHasTestCompleted] = useState(false);

  // Carga inicial + suscripción a cambios de sesión
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);

      if (data.session?.user) {
        const { data: row } = await supabase
          .from("results")
          .select("id")
          .eq("user_id", data.session.user.id)
          .limit(1)
          .maybeSingle(); // no lanza error si no hay fila
        if (!cancelled) setHasTestCompleted(!!row);
      } else {
        setHasTestCompleted(false);
      }
    };

    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      setLoading(false);

      if (!newSession?.user) {
        setHasTestCompleted(false);
        return;
      }
      // Re-chequear bandera al cambiar usuario/sesión
      (async () => {
        const { data: row } = await supabase
          .from("results")
          .select("id")
          .eq("user_id", newSession.user!.id)
          .limit(1)
          .maybeSingle();
        setHasTestCompleted(!!row);
      })();
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    return { error: error?.message };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        signInWithEmail,
        signOut,
        hasTestCompleted,
        setHasTestCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
