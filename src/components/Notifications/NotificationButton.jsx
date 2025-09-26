import { useEffect, useState } from "react";
import { getUserNotificationsFetching } from "../../services/NotificationFetching";
import NotificationIcon from "../../icons/NotificationIcon";
import useAuth from "../../hooks/useAuth";

const NotificationButton = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { auth } = useAuth();
  const currentUserId = auth?.user._id;

  const fetchNotifications = async () => {
    const res = await getUserNotificationsFetching();
    if (res.success) {
      // Contamos como no leídas solo las notificaciones que no incluyen al usuario en readBy
      const unread = res.data.filter(
        (n) => !n.readBy?.includes(currentUserId) && !(n.read || false)
      ).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, [currentUserId]);

  return (
    <button
      onClick={onClick}
      className="relative rounded-full cursor-pointer"
    >
      <NotificationIcon width={23} height={23} className="hover:text-primary" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;