import { useState } from "react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { requestOutOfStockProductFetching } from "../../services/StockRequestFetching";

const RequestStockButton = ({ productId, productStatus }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const isLoggedIn = auth?.success;

  // ❌ No mostrar si no está logeado
  if (!isLoggedIn) return null;

  // ❌ No mostrar si el producto NO está sin stock
  if (productStatus !== "sin_stock") return null;

  const handleRequest = async () => {
    if (loading) return;

    setLoading(true);

    const res = await requestOutOfStockProductFetching(productId);

    if (!res.success) {
      toast.error(res.message || "No se pudo enviar la solicitud");
      setLoading(false);
      return;
    }

    toast.success("Solicitud enviada al administrador 📨");
    setLoading(false);
  };

  return (
    <button
      onClick={handleRequest}
      disabled={loading}
      className={`w-full mt-6 p-3 rounded-full text-lg font-bold transition
        ${loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-yellow-500 hover:bg-yellow-400 cursor-pointer"}
      `}
    >
      {loading ? "Enviando solicitud..." : "Solicitar este perfume"}
    </button>
  );
};

export default RequestStockButton;
