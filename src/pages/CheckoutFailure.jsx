import { useNavigate } from "react-router-dom";

const CheckoutFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Pago no completado ❌</h1>
      <p className="mb-6">
        El pago fue cancelado o falló. Puedes intentar nuevamente.
      </p>
      <button
        onClick={() => navigate("/checkout")}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Volver al checkout
      </button>
    </div>
  );
};

export default CheckoutFailure;
