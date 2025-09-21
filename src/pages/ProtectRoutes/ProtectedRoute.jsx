import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import Spinner from "../../components/Spinner/Spinner";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { auth, loading } = useContext(AuthContext);

  const isAdmin = auth?.user?.isAdmin;

 if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="3em" /> 
      </div>
    );
  }

  if (!auth?.success) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;