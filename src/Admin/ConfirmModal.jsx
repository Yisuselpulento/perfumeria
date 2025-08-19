import  { useState } from "react";
import { deleteProductFetching } from "../services/ProductsFetching";

const ConfirmModal = ({ productId, onCancel, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteProductFetching(productId);
    setLoading(false);

    if (res.success) {
      if (onDeleted) onDeleted(productId);
    } else {
      alert(res.message);
    }
    onCancel();
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white text-black p-4 rounded-md shadow-lg w-64 text-center">
        <p className="mb-4">¿Estás seguro de eliminar este producto?</p>
        <div className="flex justify-around">
          <button
            className="bg-gray-300 px-3 py-1 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Aceptar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;