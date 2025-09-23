const NotificationsCardsAdmin = ({ notifications, onDelete, onUpdate }) => {
  return (
    <div className="space-y-3">
      {notifications.map((n) => (
        <div key={n._id} className="p-4 border rounded shadow-md flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{n.title}</h3>
            <p>{n.message}</p>
            <small className="text-gray-500">Tipo: {n.type} | Prioridad: {n.priority}</small>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <button onClick={() => onUpdate(n._id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded cursor-pointer">Actualizar</button>
            <button onClick={() => onDelete(n._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsCardsAdmin;