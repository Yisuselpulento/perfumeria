import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCart from "../hooks/useCart";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // 🔥 el webhook ya confirmó el pago
    toast.success("Pago realizado con éxito 🎉");
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="mb-6">Tu pago fue procesado correctamente.</p>
      <button
        onClick={() => navigate("/orders")}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Ver mis pedidos
      </button>
    </div>
  );
};

export default CheckoutSuccess;
