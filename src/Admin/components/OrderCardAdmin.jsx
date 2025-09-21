import { useState } from "react";
import { updateOrderStatusFetching, deleteOrderFetching } from "../../services/OrderFetching.js";
import { toast } from "sonner";
import { toCLP } from "../../helpers/toClp";

const OrderCardAdmin = ({ order, onDelete, onUpdate }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);
    try {
      const res = await updateOrderStatusFetching(order._id, newStatus);
      if (res.success) {
        setStatus(newStatus);
        toast.success("Estado actualizado");
        if (onUpdate) onUpdate(order._id, newStatus);
      } else {
        toast.error(res.message || "Error actualizando estado");
      }
    } catch (err) {
      toast.error(err.message || "Error actualizando estado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro quieres eliminar esta orden?")) return;
    setLoading(true);
    try {
      const res = await deleteOrderFetching(order._id);
      if (res.success) {
        toast.success("Orden eliminada");
        if (onDelete) onDelete(order._id);
      } else {
        toast.error(res.message || "Error eliminando orden");
      }
    } catch (err) {
      toast.error(err.message || "Error eliminando orden");
    } finally {
      setLoading(false);
    }
  };

  const shipping = order.shippingAddress || {};
  const user = order.userId || {};

  return (
    <div className="p-4 rounded-md flex flex-col gap-2 backdrop-blur-lg border border-white/20 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Usuario: {user.fullName || "Desconocido"} ({user.email || "N/A"})</span>
        <select
          className={`font-bold capitalize border rounded px-2 py-1 cursor-pointer ${
            status === "pending" ? "text-yellow-500" :
            status === "paid" ? "text-green-500" :
            status === "shipped" ? "text-blue-500" :
            status === "delivered" ? "text-purple-500" :
            "text-gray-500"
          }`}
          value={status}
          onChange={handleStatusChange}
          disabled={loading}
        >
          <option value="pending">pending</option>
          <option value="paid">paid</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
          <option value="cancelled">cancelled</option>
        </select>
      </div>

      <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Total:</strong> {toCLP(order.total)}</p>
      <p><strong>Dirección:</strong> {shipping.street || "-"}, {shipping.city || "-"}, {shipping.state || "-"}, {shipping.zip || "-"}</p>

      <div className="mt-2">
        <strong>Productos:</strong>
        <ul className="ml-4 list-disc">
          {order.items.map((item) => {
            const variant = item.variant || {};
            return (
              <li key={item.variantId || item._id}>
                {item.name || "Producto desconocido"} - {variant.volume || "-"}ml - Cantidad: {item.quantity} - Precio: {toCLP(item.price)}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
        >
          Eliminar
        </button>
      </div>
       {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 text-center">
            <p className="mb-4">¿Estás seguro que deseas eliminar esta orden?</p>
            <div className="flex justify-around gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCardAdmin;