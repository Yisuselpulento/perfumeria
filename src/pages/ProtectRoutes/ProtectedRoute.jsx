import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { auth, loading } = useContext(AuthContext);

  const isAdmin = auth?.user?.isAdmin;

  if (loading) return <div>Loading...</div>;

  if (!auth?.success) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;