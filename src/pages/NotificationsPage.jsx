import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getUserNotificationsFetching, markNotificationAsReadFetching } from "../services/NotificationFetching";
import NotificationCard from "../components/Notifications/NotificationCard";
import Spinner from "../components/Spinner/Spinner";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();
  const currentUserId = auth?.user?._id;

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await getUserNotificationsFetching();
    if (res.success) {
      const mappedNotifications = res.data.map(n => ({
        ...n,
        read: n.readBy?.includes(currentUserId) || n.read || false
      }));
      setNotifications(mappedNotifications);
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    const res = await markNotificationAsReadFetching(id);
    if (res.success) {
      setNotifications(prev =>
        prev.map(n =>
          n._id === id
            ? { ...n, read: true, readBy: [...(n.readBy || []), currentUserId] }
            : n
        )
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-full"><Spinner size="2em" /></div>;

  if (notifications.length === 0)
    return <p className="text-center mt-6 text-gray-400">No tienes notificaciones 😢</p>;

  return (
    <div className="max-w-4xl mx-auto p-2">
      <h1 className="text-xl font-semibold mb-6">Notificaciones</h1>
      <div className="flex flex-col gap-3">
        {notifications.map(n => (
          <NotificationCard
            key={n._id}
            notification={n}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;