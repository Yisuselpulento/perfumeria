import { useState } from "react";
import Spinner from "../components/Spinner/Spinner";

const StockRequestCard = ({
  request,
  onUpdateStatus,
  onDelete,
  updating,
  deleting,
}) => {
  const { _id, productId, userId, status } = request;
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <li className="border p-4 rounded flex justify-between items-start">
        <div>
          <p className="font-semibold">
            Producto: {productId?.name || "Producto eliminado"}
          </p>

          <p className="text-sm text-gray-500">
            Usuario: {userId?.email || "Usuario desconocido"}
          </p>

          <p className="text-sm">
            Estado: <b>{status}</b>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {status === "pending" && (
            <div className="flex gap-2">
              <button
                disabled={updating}
                onClick={() => onUpdateStatus(_id, "notified")}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {updating ? (
                  <>
                    <Spinner size="1rem" />
                    Procesando
                  </>
                ) : (
                  "Notificar stock"
                )}
              </button>

              <button
                disabled={updating}
                onClick={() => onUpdateStatus(_id, "resolved")}
                className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* DELETE */}
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Eliminar solicitud
          </button>
        </div>
      </li>

      {/* MODAL CONFIRMACIÓN */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-black rounded p-5 w-full max-w-sm border">
            <h3 className="text-lg font-semibold mb-2">
              ¿Eliminar solicitud?
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Esta acción es permanente y no se puede deshacer.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 border rounded"
                disabled={deleting}
              >
                Cancelar
              </button>

              <button
                onClick={() => onDelete(_id)}
                disabled={deleting}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <Spinner size="1rem" />
                    Eliminando
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StockRequestCard;
