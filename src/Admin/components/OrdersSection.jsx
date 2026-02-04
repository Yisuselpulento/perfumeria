import { useEffect, useState } from "react";
import { getAllOrdersFetching } from "../../services/OrderFetching.js";
import OrderCardAdmin from "./OrderCardAdmin.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

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
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

   if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner size="2.5rem" />
      </div>
    );
  }
  if (error) return <p>{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <p className="text-lg font-semibold">No hay órdenes aún</p>
        <p className="text-sm">Cuando entren pedidos aparecerán aquí</p>
      </div>
    );
  }

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
