import { useEffect, useState } from "react";
import { getUserNotificationsFetching, markNotificationAsReadFetching } from "../../services/NotificationFetching";
import NotificationCard from "./NotificationCard";

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await getUserNotificationsFetching();
    if (res.success) {
      setNotifications(res.data);
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    const res = await markNotificationAsReadFetching(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="absolute top-full mt-1 left-0 md:w-80 w-full bg-white rounded-lg shadow-lg border z-50"
>
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-semibold text-gray-800">Notificaciones</h3>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
          Cerrar
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto p-3">
        {loading ? (
          <p>Cargando...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No tienes notificaciones</p>
        ) : (
          notifications.map((n) => (
            <NotificationCard
              key={n._id}
              notification={n}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;