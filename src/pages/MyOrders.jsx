import { useEffect, useState } from "react";
import { getUserOrdersFetching } from "../services/OrderFetching.js";
import Spinner from "../components/Spinner/Spinner";
import { toCLP } from "../helpers/toClp";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await getUserOrdersFetching();
      console.log(res)
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
 if (orders?.length === 0)
    return (
      <div className="text-center mt-6 flex flex-col items-center gap-4">
        <p>No tienes órdenes aún 😢</p>
        <p>Ve a nuestra tienda.</p>
        <Link
          to="/storage"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition-colors"
        >
          Ir a la tienda
        </Link>
      </div>
    );

  return (
   <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Mis Órdenes</h1>
      <ul className="flex flex-col gap-2">
        {orders?.map((order) => (
          <li key={order?._id} className="p-4 rounded backdrop-blur-lg border border-white/20 shadow-md">
            
            {/* Header Orden */}
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold">Orden ID: {order?._id}</span>
              <span
                className={`font-bold capitalize ${
                  order.status === "pending"
                    ? "text-yellow-500"
                    : order.status === "paid"
                    ? "text-green-500"
                    : order.status === "shipped"
                    ? "text-blue-500"
                    : order.status === "delivered"
                    ? "text-purple-500"
                    : "text-gray-500"
                }`}
              >
                {order?.status}
              </span>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-3 border-t border-b py-3">
              {order?.items.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img
                    src={item?.productId?.image?.url || "/placeholder.png"}
                    alt={item?.productId?.name || "Producto"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3>{item?.productId?.name || "Producto desconocido"}</h3>
                    {item?.volume && (
                      <p className="text-sm text-gray-200">{item.volume}ml</p>
                    )}
                    <p className="text-sm text-gray-400">
                      Precio: {toCLP(item.price)}
                    </p>
                    <p className="text-sm">Cantidad: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Footer orden */}
            <div className="mt-3 flex justify-between items-center">
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