const NotificationCard = ({ notification, onMarkAsRead }) => {
  return (
    <div
      className={`border rounded-lg p-3 mb-2 shadow-sm flex justify-between items-center ${
        notification.read ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div>
          <p className="font-semibold text-gray-800">{notification.title}</p>
          <p className="text-sm text-gray-700">{notification.message}</p>
          <span className="text-xs text-gray-500">
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