const NotificationCard = ({ notification, onMarkAsRead }) => {
  return (
    <div
      className={`rounded-lg p-2 mb-2 shadow-sm flex justify-between items-center ${
        notification.read ? "bg-neutral-900" : "bg-neutral-950"
      }`}
    >
      <div>
          <p className="font-semibold text-gray-300">{notification.title}</p>
          <p className="text-sm text-gray-100">{notification.message}</p>
          <span className="text-xs text-gray-400">
            {new Date(notification.createdAt).toLocaleString()}
          </span>
        </div>

      {!notification.read && (
        <button
          onClick={() => onMarkAsRead(notification._id)}
          className="text-blue-600 hover:underline text-xs cursor-pointer"
        >
          Marcar como leída
        </button>
      )}
    </div>
  );
};

export default NotificationCard;