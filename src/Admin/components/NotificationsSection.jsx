import { useState, useEffect } from "react";
import { getAllNotificationsFetching, createNotificationFetching, deleteNotificationFetching, updateNotificationFetching } from "../../services/NotificationFetching";
import NotificationsCardsAdmin from "../NotificationsCardsAdmin";
import CreateNotificationForm from "../CreateNotificationForm";

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormMobile, setShowFormMobile] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await getAllNotificationsFetching();
    if (res.success) setNotifications(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCreate = async (data) => {
    const res = await createNotificationFetching(data);
    if (res.success) {
      setNotifications((prev) => [res.data, ...prev]);
      setShowFormMobile(false);
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteNotificationFetching(id);
    if (res.success) {
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    }
  };

  const handleUpdate = async (id) => {
    const newMessage = prompt("Ingresa el nuevo mensaje de la notificación:");
    if (newMessage) {
      const res = await updateNotificationFetching(id, { message: newMessage });
      if (res.success) {
        setNotifications((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1">
        {loading ? <p>Cargando notificaciones...</p> : <NotificationsCardsAdmin notifications={notifications} onDelete={handleDelete} onUpdate={handleUpdate} />}
      </div>

      {/* Formulario desktop */}
      <div className="hidden md:block w-1/3">
        <CreateNotificationForm onCreate={handleCreate} />
      </div>

      {/* Botón y formulario móvil */}
      <div className="md:hidden">
        <button onClick={() => setShowFormMobile(true)} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">
          Crear Notificación
        </button>
        {showFormMobile && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="bg-black rounded w-full max-w-md relative">
              <button onClick={() => setShowFormMobile(false)} className="absolute top-2 right-2 text-gray-500 text-lg">&times;</button>
              <CreateNotificationForm onCreate={handleCreate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsSection;