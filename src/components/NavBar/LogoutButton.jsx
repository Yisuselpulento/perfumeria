import { toast } from "sonner";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner/Spinner";
import LogoutIcon from "../../icons/template/LogoutIcon";
import { logoutFetching } from "../../services/AuthFetching";

const LogoutButton = ({ toggleMenu }) => {
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const response = await logoutFetching();

    if (response.success) {
      setAuth({});
    } else {
      toast.error(
        <div className="text-red-800">{response.message}</div>
      );
    }

    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      {/* BOTÓN PRINCIPAL */}
      <button
        aria-label="cerrar sesión"
        disabled={loading}
        onClick={() => setShowConfirm((prev) => !prev)}
        className={`flex items-center gap-2 p-1 rounded-md w-[90px] justify-center
          ${loading ? "bg-primary/80" : "hover:bg-primary cursor-pointer hover:text-white"}`}
      >
        {loading ? (
          <Spinner size="1.3em" />
        ) : (
          <>
            <LogoutIcon />
            Salir
          </>
        )}
      </button>

      {/* DROPDOWN CONFIRMACIÓN */}
      {showConfirm && !loading && (
        <div className="absolute top-full mt-2 right-0 bg-stone-900 shadow-md rounded-md w-[140px] z-50">
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-t-md cursor-pointer"
          >
            Salir
          </button>

          <button
            onClick={() => setShowConfirm(false)}
            className="w-full px-3 py-2 text-sm text-gray-200 hover:bg-gray-100 rounded-b-md cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
