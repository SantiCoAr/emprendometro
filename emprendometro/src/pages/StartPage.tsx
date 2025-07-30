// src/pages/StartPage.tsx
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">🧭 Emprendómetro</h1>
      <p className="max-w-md text-center">
        ¿Querés conocer tu nivel en sangre de perfil emprendedor?
      </p>
      <Link
        to="/test"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        Empezar test
      </Link>
    </div>
  );
}
