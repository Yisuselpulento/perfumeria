import { Link } from "react-router-dom";

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const isOrder = notification.type === "order";

  const content = (
    <div
      className={`rounded-lg p-2 mb-2 shadow-sm flex justify-between items-center ${
        notification.read ? "bg-neutral-900" : "bg-neutral-800"
      }`}
    >
      <div>
        <p className="font-semibold text-gray-300">{notification.title}</p>
        <p className="text-sm text-gray-100 py-2">{notification.message}</p>
        <span className="text-xs text-gray-400">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>

      {!notification.read && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // para que no active el link
            onMarkAsRead(notification._id);
          }}
          className="text-blue-600 hover:underline text-xs cursor-pointer"
        >
          Marcar como leída
        </button>
      )}
    </div>
  );

  return isOrder ? <Link to="/my-orders">{content}</Link> : content;
};

export default NotificationCard;