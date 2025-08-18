import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="px-6 py-3 border-b flex items-center justify-between">
      <Link to="/" className="font-semibold">Emprendómetro</Link>
      <div className="text-sm">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={signOut}
              className="px-3 py-1 rounded-lg border hover:bg-gray-50"
            >
              Salir
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-3 py-1 rounded-lg border hover:bg-gray-50">Ingresar</Link>
        )}
      </div>
    </header>
  );
}
