import { useEffect, useState } from "react";
import { getUserNotificationsFetching } from "../../services/NotificationFetching";
import NotificationIcon from "../../icons/NotificationIcon";

const NotificationButton = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const res = await getUserNotificationsFetching();
    if (res.success) {
      const unread = res.data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full cursor-pointer"
    >
      <NotificationIcon width={23} height={23} className="hover:text-primary" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;