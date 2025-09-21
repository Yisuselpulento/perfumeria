import { useEffect, useState } from "react";
import { getAllOrdersFetching } from "../../services/OrderFetching.js";
import OrderCardAdmin from "./OrderCardAdmin.jsx";

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getAllOrdersFetching();
      if (res.success) {
        setOrders(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

   const handleDelete = (orderId) => {
    setOrders((prev) => prev.filter((o) => o._id !== orderId));
  };

  const handleUpdate = (orderId, newStatus) => {
    setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, status: newStatus } : o));
  };

  if (loading) return <p>Cargando órdenes...</p>;
  if (error) return <p>{error}</p>;

  return (
     <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCardAdmin
          key={order._id}
          order={order}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default OrdersSection;