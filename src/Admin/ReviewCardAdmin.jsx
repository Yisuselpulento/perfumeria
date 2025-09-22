const ReviewCardAdmin = ({ review, onApprove, onDelete }) => {
  return (
    <div className="p-4 border rounded shadow-md bg-white flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{review.productName}</h3>
        <p className="text-gray-700">{review.message}</p>
        <small className="text-gray-500">
          Usuario: {review.userId?.fullName || "Anonimo"} | Rating: {review.rating} | Fecha: {new Date(review.createdAt).toLocaleDateString()}
        </small>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <button onClick={() => onApprove(review._id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
          Aprobar
        </button>
        <button onClick={() => onDelete(review._id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ReviewCardAdmin;