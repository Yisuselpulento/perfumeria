import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner/Spinner";

const UnverifiedRoute = () => {
  const { auth, loading  } = useAuth();

   if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="3em" /> 
      </div>
    );
  }
  if (!auth?.user?._id) return <Navigate to="/login" replace />; 
  if (auth?.user?.isVerified) return <Navigate to="/profile" replace />; 

  return <Outlet />;
};

export default UnverifiedRoute;