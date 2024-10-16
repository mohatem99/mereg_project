import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGuard({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  if (!token || !user) return <Navigate to="/auth/login" replace />;

  return children;
}

export default AuthGuard;
