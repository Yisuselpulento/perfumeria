import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { deleteReviewFetching } from "../../services/ReviewFetching";
import { toast } from "sonner";

const CardReviewUser = ({ review, onDeleted }) => {
  const { auth } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const res = await deleteReviewFetching(review._id);

    if (res.success) {
      toast.success("Reseña eliminada");
      onDeleted(review._id); // 🔑 el hijo avisa QUÉ se borró
    } else {
      toast.error(res.message);
    }

    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <div className="relative p-3 border rounded bg-gray-800 text-left">
      <div className="flex justify-between items-center">
        <strong>{review.userId?.fullName || "Usuario"}</strong>
        <span>{review.rating} ⭐</span>
      </div>

      <p className="mt-1 text-sm">{review.comment}</p>

      <small className="text-gray-400 text-xs block mt-1">
        {new Date(review.createdAt).toLocaleDateString()}
      </small>

      {auth?.user?.isAdmin && (
        <div className="absolute bottom-2 right-2">
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs text-red-500 hover:text-red-400  cursor-pointer"
            >
              Eliminar
            </button>
          ) : (
            <div className="flex gap-2 bg-gray-900 p-2 rounded shadow-md">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="text-xs text-red-500 hover:text-red-400 cursor-pointer"
              >
                {loading ? "Eliminando..." : "Confirmar"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="text-xs text-gray-400 hover:text-gray-300  cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardReviewUser;
