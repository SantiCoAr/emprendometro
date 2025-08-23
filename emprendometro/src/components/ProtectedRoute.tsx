import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  requireCompleted?: boolean; // ej: /result
  forbidCompleted?: boolean;  // ej: /test
};

const ProtectedRoute: React.FC<Props> = ({ children, requireCompleted, forbidCompleted }) => {
  const { user, loading, hasTestCompleted } = useAuth();
  const location = useLocation();

  if (loading) return null; // o un spinner

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Si vengo de finalizar el test, dejo pasar a /result aunque aún no esté guardado
  const cameFromCompleted = (location.state as any)?.from === "completed";

  if (requireCompleted && !hasTestCompleted && !cameFromCompleted) {
    return <Navigate to="/test" replace />;
  }

  if (forbidCompleted && hasTestCompleted) {
    return <Navigate to="/result" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

