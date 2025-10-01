import { useState, useEffect } from "react";
import { markNotificationAsReadFetching } from "../services/NotificationFetching";
import useAuth from "../hooks/useAuth";

const NotificationsCardsAdmin = ({ notifications, onDelete, onUpdate }) => {
  const { auth  } = useAuth();
   const userId = auth?.user?._id;

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [localNotifications, setLocalNotifications] = useState([]);

  // Sincronizamos con las notificaciones del padre
  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
    }
    setShowModal(false);
    setSelectedId(null);
  };

   const handleMarkAsRead = async (id) => {
    if (!userId) return;

    const res = await markNotificationAsReadFetching(id);
    if (res.success) {
      setLocalNotifications((prev) =>
        prev.map((n) => {
          if (n._id !== id) return n;

          // Scope user: marcar read true
          if (n.scope === "user") return { ...n, read: true };

          // Scope global/admin: actualizar readBy
          if (!n.readBy.includes(userId)) {
            return { ...n, readBy: [...n.readBy, userId] };
          }

          return n;
        })
      );
    }
  };

  return (
    <div className="space-y-3">
      {localNotifications.map((n) => {
        const isRead = n.read || (userId && n.readBy.includes(userId));

        return (
          <div
            key={n._id}
            className={`p-4 border rounded shadow-md flex justify-between items-start bg-white dark:bg-gray-900 ${
              isRead ? "opacity-60" : ""
            }`}
          >
            <div>
              <h3 className="font-semibold">{n.title}</h3>
              <p>{n.message}</p>
              <small className="text-gray-500">
                Tipo: {n.type} | Prioridad: {n.priority}
              </small>
            </div>
            <div className="flex flex-col gap-2 ml-4">
             {/*  {!isRead && (
                <button
                  onClick={() => handleMarkAsRead(n._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer"
                >
                  Marcar como leído
                </button>
              )} */}
              <button
                onClick={() => onUpdate(n._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleOpenModal(n._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        );
      })}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 text-center">
            <p className="mb-4">
              ¿Estás seguro que deseas eliminar esta notificación?
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

export default NotificationsCardsAdmin;