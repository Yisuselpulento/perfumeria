import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UnverifiedRoute = () => {
  const { auth, loading  } = useAuth();

  if (loading) return null;
  if (!auth?.user?._id) return <Navigate to="/login" replace />; 
  if (auth?.user?.isVerified) return <Navigate to="/profile" replace />; 

  return <Outlet />;
};

export default UnverifiedRoute;