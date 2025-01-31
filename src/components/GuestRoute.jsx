import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const { auth } = useAuth()

  if (auth?.success) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />; 
};

export default GuestRoute;