// src/pages/StartPage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StartPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
            🧭
          </span>
          Emprendómetro
        </h1>

        <p className="mt-3 text-slate-600">
          ¿Querés conocer tu nivel en sangre de perfil emprendedor?
        </p>

        <div className="mt-6">
          <Link
            to={user ? "/test" : "/login"}
            className="
              inline-flex items-center justify-center
              rounded-xl px-6 py-3
              font-semibold
              bg-blue-600
              !text-white visited:!text-white hover:!text-white focus:!text-white active:!text-white
              hover:bg-blue-700
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
              transition-colors
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            Empezar test
          </Link>
        </div>
      </div>
    </div>
  );
}


