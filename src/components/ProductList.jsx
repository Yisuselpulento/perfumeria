import { useEffect, useState } from "react";
import { getProductsFetching } from "../services/ProductsFetching";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner/Spinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const query = searchParams.toString();
        const res = await getProductsFetching(query);

        if (res.success) {
          setProducts(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError("Error al cargar productos", err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 w-full">
        <Spinner />
      </div>
    );
  }

  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No se encontraron productos.</p>;

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4 items-start justify-start">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;