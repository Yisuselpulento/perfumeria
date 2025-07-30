import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import { getProductByIdFetching } from "../services/ProductsFetching";
import Spinner from "../components/Spinner/Spinner";
import { getTagColor } from "../helpers/tagscolors";

const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductByIdFetching(id);
        console.log(res)
        if (res.success) {
          setProduct(res.data);
          setError("");
        } else {
          setError(res.message || "Producto no encontrado");
        }
      } catch (e) {
        setError("Error al obtener el producto");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

 if (loading) return (
  <div className="flex justify-center items-center h-full min-h-92">
    <Spinner />
  </div>
   );
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full  max-h-96 object-contain mb-4 rounded"
      />
       <h1 className="text-xl font-bold mb-4 text-gray-700">{product.name}</h1>
      <p><strong>Marca:</strong> {product.brand}</p>
      <p><strong>Categoría:</strong> {product.category}</p>
      <p><strong>Estado:</strong> {product.status}</p>
      <p className="mt-2">{product.description}</p>

      <section className="mt-6">
        <ul>
          {product.variants.map((v, i) => (
            <li key={i}>
              {v.volume} ml - Precio: ${v.price} - Stock: {v.stock}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>
        <ul className="flex flex-wrap gap-4">
          {product.ingredients.map((ing, i) => (
            <li key={i} className="flex flex-col items-center">
              <img
                src={ing.image}
                alt={ing.name}
                className="w-20 h-20 object-cover rounded"
              />
              <span>{ing.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Tags</h2>
  <ul className="flex flex-col gap-4">
    {product.tags.map((tag, i) => (
      <li key={i} className="flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="font-medium">{tag.name}</span>
          <span className="text-sm text-gray-600">{tag.intensity}/10</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded">
          <div
           className={`h-full rounded transition-all ${getTagColor(tag.name)}`}
            style={{ width: `${(tag.intensity / 10) * 100}%` }}
          />
        </div>
      </li>
    ))}
  </ul>
</section>
    </div>
  );
};

export default ProductId;