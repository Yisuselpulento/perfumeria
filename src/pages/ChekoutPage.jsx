import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { toCLP } from "../helpers/toClp";
import { createOrderWithPayment } from "../services/CheckoutFetching.js";
import ShippingForm from "../components/Checkout/ShippingForm.jsx";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth.jsx";
import { getAddressesFetching } from "../services/AddressFetching.js";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const { auth } = useAuth();
  const navigate = useNavigate();

  // 📍 Dirección por defecto
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await getAddressesFetching();
      if (res?.success) {
        const def = res.addresses.find(a => a.isDefault);
        setDefaultAddress(def || null);
      }
    };
    fetchAddresses();
  }, []);

  // 💳 Checkout Mercado Pago
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!auth?.success) {
      navigate("/login");
      return;
    }

    if (!shipping) {
      toast.error("Completa los datos de envío");
      return;
    }

    if (!cartItems.length) {
      toast.error("El carrito está vacío");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          variant: { _id: item.variant._id },
          quantity: item.quantity,
        })),
        shippingAddress: shipping,
      };

      const response = await createOrderWithPayment(orderData);

      if (!response?.success || !response?.checkout_url) {
        throw new Error(response?.message || "No se pudo iniciar el pago");
      }

      // 🔥 Redirección a Mercado Pago
      window.location.href = response.checkout_url;

    } catch (error) {
      toast.error(error.message || "Error al iniciar el pago");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCheckout}
      className="max-w-md mx-auto mt-10 p-4 rounded backdrop-blur-lg border border-white/20 shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>

      <ul className="mb-4">
        {cartItems.map(item => (
          <li
            key={item.id + item.variant._id}
            className="flex justify-between mb-2"
          >
            <span>
              {item.name} ({item.variant.volume}ml) x {item.quantity}
            </span>
            <span>{toCLP(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="font-bold mb-4">
        Total: {toCLP(cartTotal)}
      </div>

      <ShippingForm
        defaultAddress={defaultAddress}
        onChange={setShipping}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 w-full cursor-pointer mt-4 disabled:opacity-60"
      >
        {loading ? "Cargando..." : "Pagar"}
      </button>
    </form>
  );
};

export default CheckoutPage;
