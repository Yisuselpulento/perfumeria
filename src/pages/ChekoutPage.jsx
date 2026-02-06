import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { toCLP } from "../helpers/toClp";
import { createOrderWithPayment } from "../services/CheckoutFetching.js";
import ShippingForm from "../components/Checkout/ShippingForm.jsx";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth.jsx";
import { getAddressesFetching } from "../services/AddressFetching.js";

// 📦 Costos
const SHIPPING_PRICE = 4500;
const FREE_SHIPPING_THRESHOLD = 40000; // 🔹 Envío gratis si subtotal >= 40k

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    country: "Chile",
  });
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [guestEmail, setGuestEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("shipping");

  // 📍 Dirección por defecto (solo usuarios logueados)
  useEffect(() => {
    if (!auth?.success) return;

    const fetchAddresses = async () => {
      const res = await getAddressesFetching();
      if (res?.success) {
        const def = res.addresses.find(a => a.isDefault);
        setDefaultAddress(def || null);
      }
    };

    fetchAddresses();
  }, [auth]);

  // 💳 Checkout Mercado Pago
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      toast.error("El carrito está vacío");
      return;
    }

    if (deliveryMethod === "shipping" && !shipping) {
      toast.error("Completa los datos de envío");
      return;
    }

    if (deliveryMethod === "pickup" && !shipping.phone) {
      toast.error("Ingresa un teléfono de contacto");
      return;
    }

    if (!auth?.success && !guestEmail) {
      toast.error("Ingresa tu email para continuar");
      return;
    }

    setLoading(true);

    try {
      // 🔹 Calculamos envío dinámico según subtotal
      const shippingCost =
        deliveryMethod === "shipping" && cartTotal < FREE_SHIPPING_THRESHOLD
          ? SHIPPING_PRICE
          : 0;

      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          variant: { _id: item.variant._id },
          quantity: item.quantity,
        })),
        email: auth?.user?.email || guestEmail,
        deliveryMethod,
        shippingAddress: shipping,
        shippingCost, // 🔹 enviamos el costo calculado
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

  // 🔹 Calculamos envío dinámico para mostrar en la UI
  const shippingCost = 
    deliveryMethod === "shipping" && cartTotal < FREE_SHIPPING_THRESHOLD
      ? SHIPPING_PRICE
      : 0;

  return (
    <form
      onSubmit={handleCheckout}
      className="max-w-md mx-auto mt-10 p-4 rounded backdrop-blur-lg border border-white/20 shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>

      {/* RESUMEN */}
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

      {/* RESUMEN DE COSTOS */}
      <div className="space-y-1 mb-4 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{toCLP(cartTotal)}</span>
        </div>

        {cartTotal < FREE_SHIPPING_THRESHOLD && deliveryMethod === "shipping" && (
          <p className="text-sm text-green-400">
            ¡Supera {toCLP(FREE_SHIPPING_THRESHOLD)} y obtén envío gratis!
          </p>
        )}

        {deliveryMethod === "shipping" && (
          <div className="flex justify-between">
            <span>Envío</span>
            <span>
              {cartTotal >= FREE_SHIPPING_THRESHOLD
                ? "Gratis 🎉"
                : toCLP(SHIPPING_PRICE)}
            </span>
          </div>
        )}

        <div className="flex justify-between font-bold text-base border-t pt-2">
          <span>Total</span>
          <span>{toCLP(cartTotal + shippingCost)}</span>
        </div>
      </div>

      {/* TELÉFONO PARA RETIRO */}
      {deliveryMethod === "pickup" && (
        <div className="mb-4 space-y-2">
          <label className="text-sm font-medium">Teléfono de contacto</label>
          <input
            type="tel"
            placeholder="Ej: +56912345678"
            value={shipping.phone}
            onChange={(e) =>
              setShipping({
                ...shipping,
                phone: e.target.value,
                street: "Retiro en persona",
                city: "Los Andes",
                state: "Valparaíso",
              })
            }
            className="w-full p-2 rounded bg-neutral-900 border border-white/20"
            required
          />
        </div>
      )}

      {/* EMAIL INVITADO */}
      {!auth?.success && (
        <input
          type="email"
          placeholder="Tu email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-neutral-900 border border-white/20"
          required
        />
      )}

      {/* MÉTODO DE ENTREGA */}
      <div className="mb-4 space-y-2">
        <h3 className="font-semibold">Método de entrega</h3>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="deliveryMethod"
            value="shipping"
            checked={deliveryMethod === "shipping"}
            onChange={() => setDeliveryMethod("shipping")}
          />
          <span>Envío a domicilio</span>
          <span className="ml-auto text-sm">
            {cartTotal >= FREE_SHIPPING_THRESHOLD ? "Gratis 🎉" : toCLP(SHIPPING_PRICE)}
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="deliveryMethod"
            value="pickup"
            checked={deliveryMethod === "pickup"}
            onChange={() => setDeliveryMethod("pickup")}
          />
          <span>Retiro en persona</span>
          <span className="ml-auto text-sm text-green-400">Gratis</span>
        </label>

        {deliveryMethod === "pickup" && (
          <p className="text-sm text-neutral-400">
            📍 Retiro en <b>Los Andes</b>
          </p>
        )}
      </div>

      {/* ENVÍO */}
      {deliveryMethod === "shipping" && (
        <ShippingForm defaultAddress={defaultAddress} onChange={setShipping} />
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 w-full cursor-pointer mt-4 disabled:opacity-60"
      >
        {loading ? "Redirigiendo..." : "Pagar"}
      </button>
    </form>
  );
};

export default CheckoutPage;