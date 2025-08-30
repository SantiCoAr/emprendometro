import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const hideBrand = location.pathname === "/result";

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Oculta el brand en /result */}
        <div className="flex items-center gap-3">
          {!hideBrand && (
            <Link to="/" className="text-sm font-semibold text-blue-600 hover:underline">
              Emprendómetro
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user?.email && (
            <span className="text-sm text-slate-600">{user.email}</span>
          )}
          <button
            onClick={signOut}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}

