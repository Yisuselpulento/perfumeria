import { useState } from "react";

const CardAddress = ({ address, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="border rounded-lg p-3 flex flex-col gap-1 shadow-sm">
      <p className="font-semibold">{address.label}</p>
      <p className="text-sm">{address.street}, {address.city}, {address.state}</p>
      <p className="text-sm">{address.zip}</p>
      <p className="text-sm">📞 {address.phone}</p>
      {address.isDefault && <span className="text-xs text-green-600">✔ Dirección principal</span>}

      <div className="flex gap-2 mt-2">
        <button
          onClick={onEdit}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
        >
          Editar
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
        >
          Eliminar
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md w-[300px]">
            <p className="mb-3">¿Seguro que deseas eliminar esta dirección?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 rounded border"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
                className="px-3 py-1 rounded bg-red-600 text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAddress;