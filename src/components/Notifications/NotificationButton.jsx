import { useEffect, useState } from "react";
import { getUserNotificationsFetching } from "../../services/NotificationFetching";
import NotificationIcon from "../../icons/NotificationIcon";
import useAuth from "../../hooks/useAuth";
import BadgeCounter from "../BadgeCounter";

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
      className="relative rounded-full cursor-pointer flex"
    >
      <BadgeCounter count={unreadCount}>
        <NotificationIcon
          width={23}
          height={23}
          className="hover:text-primary"
        />
      </BadgeCounter>
    </button>
  );
};

export default NotificationButton;