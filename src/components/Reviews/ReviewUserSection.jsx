import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addReviewFetching, getProductReviewsFetching } from "../../services/ReviewFetching";
import CardReviewUser from "./CardReviewUser";

const ReviewUserSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const fetchReviews = async () => {
    setLoading(true);
    const res = await getProductReviewsFetching(productId);
    if (res.success) setReviews(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.comment.trim()) {
    return toast.error("Debes escribir un mensaje.");
  }

  setSubmitting(true);

  const reviewData = { ...form, productId };
  const res = await addReviewFetching(reviewData);

  if (res.success) {
    toast.success("Reseña enviada y pendiente de aprobación.");
    setForm({ rating: 5, comment: "" });
    fetchReviews();
  } else {
    toast.error(res.message);
  }

  setSubmitting(false);
};

  const handleDeleteLocal = (id) => {
  setReviews((prev) => prev.filter((r) => r._id !== id));
};


  return (
    <div className="max-w-3xl mx-auto my-8 p-4 border rounded shadow-md bg-gray-900 text-white">
      <h2 className="text-xl font-semibold mb-4">Reseñas del Producto</h2>

      {/* Formulario para crear review */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <label className="flex flex-col">
          Calificación:
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="mt-1 p-2 rounded bg-gray-800 text-white"
          >
            {[5,4,3,2,1].map((n) => (
              <option key={n} value={n}>{n} ⭐</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col">
          Comentario:
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            placeholder="Escribe tu reseña..."
            className="mt-1 p-2 rounded bg-gray-800 text-white resize-none"
            rows={4}
          />
        </label>

        <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded font-semibold flex items-center justify-center gap-2
              ${submitting
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 cursor-pointer"}
            `}
          >
            {submitting ? "Enviando..." : "Enviar Reseña"}
          </button>
      </form>

      {/* Listado de reviews */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <p>Cargando reseñas...</p>
        ) : reviews.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reviews.map((r) => 
          <CardReviewUser
              key={r._id}
              review={r}
              onDeleted={() => handleDeleteLocal(r._id)}
            />)
        )}
      </div>
    </div>
  );
};

export default ReviewUserSection;