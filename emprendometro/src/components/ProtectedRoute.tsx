import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: React.ReactNode;
  requireCompleted?: boolean; // /result
  forbidCompleted?: boolean;  // /test
};

const ProtectedRoute: React.FC<Props> = ({ children, requireCompleted, forbidCompleted }) => {
  const { user, loading, hasTestCompleted } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  const cameFromCompleted = (location.state as any)?.from === "completed";
  const cameFromRetake    = (location.state as any)?.from === "retake";

  if (requireCompleted && !hasTestCompleted && !cameFromCompleted) {
    return <Navigate to="/test" replace />;
  }
  if (forbidCompleted && hasTestCompleted && !cameFromRetake) {
    return <Navigate to="/result" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;


