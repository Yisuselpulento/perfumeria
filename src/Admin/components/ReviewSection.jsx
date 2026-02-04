import { useEffect, useState } from "react";
import {
  approveReviewFetching,
  deleteReviewFetching,
  getPendingReviewsFetching,
} from "../../services/ReviewFetching";
import ReviewCardAdmin from "../ReviewCardAdmin";
import Spinner from "../../components/Spinner/Spinner"; // ajusta path si hace falta

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

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner size="2.5rem" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <p className="text-lg font-semibold">
            No hay reseñas pendientes
          </p>
          <p className="text-sm">
            Todas las reseñas ya fueron moderadas
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <ReviewCardAdmin
              key={review._id}
              review={review}
              onApprove={handleApprove}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
