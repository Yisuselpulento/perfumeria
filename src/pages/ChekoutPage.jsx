import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCart from "../hooks/useCart";
import { toCLP } from "../helpers/toClp";
import { createOrderWithPayment, createPaymentIntent } from "../services/OrdersFetching.js";
import ShippingForm from "../components/Checkout/ShippingForm.jsx";

// Inicializa Stripe con tu clave publicable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shipping, setShipping] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handlePayment = async (e) => {
  e.preventDefault();

  if (!shipping) {
    setError("Por favor completa los datos de envío");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // Armamos el orderData sin pasar por Stripe
    const orderData = {
      items: cartItems.map(item => ({
        id: item.id,
        variant: { _id: item.variant._id },
        quantity: item.quantity
      })),
      shippingAddress: shipping,
      paymentInfo: {
        method: "manual",           // Método de pago "fake"
        transactionId: "debug",     // Puedes poner cualquier string
        paidAt: new Date()           // Marcamos como pagado directamente
      }
    };

    const orderResponse = await createOrderWithPayment(orderData);

    if (!orderResponse.success) throw new Error(orderResponse.message);

    clearCart();
    setSuccess(true);
    navigate("/my-orders");

  } catch (err) {
    setError(err.message || "Error creando la orden");
  } finally {
    setLoading(false);
  }
};

/*  const handlePayment = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

   if (!shipping) {
      setError("Por favor completa los datos de envío");
      return;
    }

  setLoading(true);
  setError("");

  try {
    const clientData = await createPaymentIntent(cartTotal * 100);
     if (!clientData.clientSecret) throw new Error(clientData.message);

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
      clientData.clientSecret,
      { payment_method: { card: cardElement } }
    );

     if (stripeError) {
        setError(stripeError.message);
        return;
      }

    if (paymentIntent.status === "succeeded") {
        const orderData = {
          items: cartItems.map(item => ({
            id: item.id,
            variant: { _id: item.variant._id },
            quantity: item.quantity
          })),
          shippingAddress: shipping,
          paymentInfo: {
            method: "card",
            transactionId: paymentIntent.id,
            paidAt: new Date()
          }
        };
      
      const orderResponse = await createOrderWithPayment(orderData);

       if (!orderResponse.success) throw new Error(orderResponse.message);

      clearCart();
      setSuccess(true);
      navigate("/my-orders");
    }
  } catch (err) {
     setError(err.message || "Error procesando el pago");
  } finally {
    setLoading(false);
  }
}; */
  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Resumen de compra</h2>
      <ul className="mb-4">
        {cartItems.map(item => (
          <li key={item.id + item.variant._id} className="flex justify-between mb-2">
            <span>{item.name} ({item.variant.volume}ml) x {item.quantity}</span>
            <span>{toCLP(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <div className="font-bold mb-4">Total: {toCLP(cartTotal)}</div>

       <ShippingForm onChange={setShipping} />

      <h3 className="mb-2 font-semibold">Datos de tarjeta</h3>
      <div className="mb-4 p-2 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">Pago exitoso!</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 w-full"
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;