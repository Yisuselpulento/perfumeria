import { useEffect, useState } from "react";
import { getOrdersFetching } from "../../services/OrdersFetching";

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getOrdersFetching();
      if (res.success) {
        setOrders(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 flex flex-col gap-4 ">
      {orders.length === 0 && <p>No hay órdenes.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 rounded-md  flex flex-col gap-2 backdrop-blur-lg border border-white/20 shadow-md"
        >
          <p><strong>Usuario:</strong> {order.userId.fullName} ({order.userId.email})</p>
          <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total.toLocaleString()}</p>
          <p>
            <strong>Dirección:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.zip}
          </p>
          <div className="mt-2">
            <strong>Productos:</strong>
            <ul className="ml-4 list-disc">
              {order.items.map((item) => (
                <li key={item.variantId}>
                  {item.name} - {item.volume}ml - Cantidad: {item.quantity} - Precio: ${item.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSection;