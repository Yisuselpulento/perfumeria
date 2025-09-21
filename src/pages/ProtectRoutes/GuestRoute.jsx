import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";

const GuestRoute = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="3em" /> 
      </div>
    );
  }

  if (auth?.success) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;