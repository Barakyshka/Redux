import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const RequireAuth = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.id) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};
