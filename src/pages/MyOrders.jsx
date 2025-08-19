import { useEffect, useState } from "react";
import { getUserOrdersFetching } from "../services/OrdersFetching";
import Spinner from "../components/Spinner/Spinner";
import { toCLP } from "../helpers/toClp";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getUserOrdersFetching();
      if (res.success) {
        setOrders(res.data);
        setError("");
      } else {
        setError(res.message || "Error al obtener órdenes");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;
  if (orders.length === 0) return <p className="text-center mt-6">No tienes órdenes aún 😢</p>;

  return (
    <div className="">
  <h1 className="text-2xl font-semibold mb-4">Mis Órdenes</h1>
  <ul className="flex flex-col gap-4">
    {orders.map((order) => (
      <li key={order._id} className="border p-4 rounded shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">Orden ID: {order._id}</span>
          <span
            className={`font-bold capitalize ${
              order.status === "pending"
                ? "text-yellow-500"
                : order.status === "paid"
                ? "text-green-500"
                : "text-gray-500"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center gap-3 border-b pb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.volume}ml - {toCLP(item.price)}
                </p>
                <p className="text-sm">Cantidad: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between items-center font-bold">
          <span>Total: {toCLP(order.total)}</span>
          <span>Creada: {new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default MyOrders;