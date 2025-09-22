const CardReviewUser = ({ review }) => {
  return (
    <div className="p-3 border rounded bg-gray-800">
      <div className="flex justify-between items-center">
        <strong>{review.userId?.fullName || "Usuario"}</strong>
        <span>{review.rating} ⭐</span>
      </div>
      <p className="mt-1 text-sm">{review.message}</p>
      <small className="text-gray-400 text-xs">{new Date(review.createdAt).toLocaleDateString()}</small>
    </div>
  );
};

export default CardReviewUser;