import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
}) {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
}