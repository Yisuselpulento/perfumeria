import { useEffect, useState } from "react";
import {
  getAllStockRequestsFetching,
  updateStockRequestStatusFetching,
  deleteStockRequestFetching,
} from "../../services/StockRequestFetching";
import { toast } from "sonner";
import Spinner from "../../components/Spinner/Spinner";
import StockRequestCard from "../StockRequestCard";

const StockRequestsSection = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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

  const handleDelete = async (requestId) => {
    setDeletingId(requestId);

    const res = await deleteStockRequestFetching(requestId);

    if (res.success) {
      toast.success("Solicitud eliminada");
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } else {
      toast.error(res.message || "Error al eliminar");
    }

    setDeletingId(null);
  };

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">
        Solicitudes de productos sin stock
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="2.5rem" />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg font-semibold">No hay solicitudes de stock</p>
          <p className="text-sm">Todo está al día por ahora 🚀</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <StockRequestCard
              key={req._id}
              request={req}
              updating={updatingId === req._id}
              deleting={deletingId === req._id}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockRequestsSection;
