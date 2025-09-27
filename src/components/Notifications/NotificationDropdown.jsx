import { useEffect, useState } from "react";
import { getUserNotificationsFetching, markNotificationAsReadFetching } from "../../services/NotificationFetching";
import NotificationCard from "./NotificationCard";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner/Spinner";

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth()
  console.log(auth)
  const currentUserId = auth?.user?._id;

  const fetchNotifications = async () => {
    setLoading(true);
    const res = await getUserNotificationsFetching();
    if (res.success) {
      // Calculamos read según readBy o read
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
      setNotifications((prev) =>
        prev.map(n =>
          n._id === id
            ? { 
                ...n, 
                read: true,
                readBy: [...(n.readBy || []), currentUserId] 
              }
            : n
        )
      );
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="absolute top-full right-0 mt-2 md:w-92 w-80 p-1 text-gray-200 bg-neutral-950 rounded-lg shadow-lg z-50">
      <div className="flex justify-between items-center p-2 border-b">
        <h3 className="font-semibold0">Notificaciones</h3>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-500 pr-2  cursor-pointer">
          Cerrar
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto mt-1">
        {loading ? (
         <div className="min-h-[100px] flex justify-center items-center w-full">
           <Spinner size="2em" />
           </div>
        ) : notifications.length === 0 ? (
          <p className="text-gray-400">No tienes notificaciones</p>
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