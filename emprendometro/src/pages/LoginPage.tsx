import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await signInWithEmail(email.trim());
    if (error) setError(error);
    else setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-xl p-6">
        <h1 className="text-xl font-bold mb-4">Ingresá para hacer el test</h1>

        {sent ? (
          <p className="text-sm">
            ✅ Te enviamos un enlace mágico a <b>{email}</b>. Revisa tu correo y
            hacé clic para entrar. Luego volverás a esta página.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm">Email</span>
              <input
                type="email"
                required
                className="mt-1 w-full border rounded-lg px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </label>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              Enviarme enlace mágico
            </button>
          </form>
        )}

        <div className="mt-4 text-sm">
          <Link to="/" className="text-blue-600">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
