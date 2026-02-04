import { useEffect, useState } from "react";
import {
  getAllStockRequestsFetching,
  updateStockRequestStatusFetching,
} from "../../services/StockRequestFetching";
import { toast } from "sonner";

const StockRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await getAllStockRequestsFetching();

    if (res.success) {
      setRequests(res.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (requestId, status) => {
    setUpdatingId(requestId);

    const res = await updateStockRequestStatusFetching(requestId, status);

    if (res.success) {
      toast.success("Estado actualizado");
      fetchRequests();
    } else {
      toast.error(res.message || "Error al actualizar");
    }

    setUpdatingId(null);
  };

  if (loading) return <p>Cargando solicitudes de stock...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Solicitudes de productos sin stock
      </h2>

      {requests.length === 0 ? (
        <p>No hay solicitudes</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Producto: {req.productId?.name || "Producto eliminado"}
                </p>
                <p className="text-sm text-gray-500">
                  Usuario: {req.userId?.email || "Usuario desconocido"}
                </p>
                <p className="text-sm">
                  Estado: <b>{req.status}</b>
                </p>
              </div>

              {/* 🔘 Acciones solo si está pendiente */}
              {req.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    disabled={updatingId === req._id}
                    onClick={() =>
                      handleUpdateStatus(req._id, "notified")
                    }
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Notificar stock
                  </button>

                  <button
                    disabled={updatingId === req._id}
                    onClick={() =>
                      handleUpdateStatus(req._id, "resolved")
                    }
                    className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
                  >
                    Cerrar solicitud
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockRequestsSection;
