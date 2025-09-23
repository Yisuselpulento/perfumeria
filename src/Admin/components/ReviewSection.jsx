import { useEffect, useState } from "react";
import { approveReviewFetching, deleteReviewFetching, getPendingReviewsFetching } from "../../services/ReviewFetching";
import ReviewCardAdmin from "../ReviewCardAdmin";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const res = await getPendingReviewsFetching();
    if (res.success) setReviews(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    const res = await approveReviewFetching(id);
    if (res.success) {
      setReviews((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteReviewFetching(id);
    if (res.success) {
      setReviews((prev) => prev.filter((r) => r._id !== id));
    }
  };

  if (loading) return <p className="p-4">Cargando reseñas pendientes...</p>;
  if (reviews.length === 0) return <p className="p-4">No hay reseñas pendientes.</p>;

  return (
    <div className="p-4 flex flex-col gap-3">
      {reviews.map((review) => (
        <ReviewCardAdmin key={review._id} review={review} onApprove={handleApprove} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ReviewSection;