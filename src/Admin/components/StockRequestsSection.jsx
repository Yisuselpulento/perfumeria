import { useEffect, useState } from "react";
import {
  getAllStockRequestsFetching,
  updateStockRequestStatusFetching,
} from "../../services/StockRequestFetching";
import { toast } from "sonner";
import Spinner from "../../components/Spinner/Spinner"; // ajusta path si hace falta

const StockRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await getAllStockRequestsFetching();
    if (res.success) setRequests(res.data);
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
      await fetchRequests();
    } else {
      toast.error(res.message || "Error al actualizar");
    }

    setUpdatingId(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Solicitudes de productos sin stock
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="2.5rem" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg font-semibold">
            No hay solicitudes de stock
          </p>
          <p className="text-sm">
            Todo está al día por ahora 🚀
          </p>
        </div>
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

              {req.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    disabled={updatingId === req._id}
                    onClick={() =>
                      handleUpdateStatus(req._id, "notified")
                    }
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updatingId === req._id ? "Procesando..." : "Notificar stock"}
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
