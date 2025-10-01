import { useState } from "react";

const ReviewCardAdmin = ({ review, onApprove, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(review._id);
    setShowModal(false);
  };

  return (
    <div className="p-4 border rounded shadow-md flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{review.productName}</h3>
        <p>{review.comment || "Sin comentario"}</p>
        <small className="text-gray-500">
          Usuario: {review.userId?.fullName || "Anónimo"} | Rating: {review.rating} | Fecha:{" "}
          {new Date(review.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <button
          onClick={() => onApprove(review._id)}
          className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Aprobar
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 text-center">
            <p className="mb-4">
              ¿Estás seguro que deseas eliminar la reseña de{" "}
              <span className="font-semibold">
                {review.userId?.fullName || "Anónimo"}
              </span>{" "}
              sobre <span className="font-semibold">{review.productName}</span>?
            </p>
            <div className="flex justify-around gap-4">
              <button
                onClick={handleConfirmDelete}
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

export default ReviewCardAdmin;