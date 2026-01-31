import { useEffect, useState } from "react";
import { getProductsFetching } from "../services/ProductsFetching";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import { useProducts } from "../context/ProductProvider";

const ProductList = () => {
  const { products, setProducts, loaded, setLoaded } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      // ✅ si ya cargó una vez y NO hay filtros, no vuelve a fetchear
      if (loaded && !searchParams.toString()) return;

      setLoading(true);
      setError("");

      const query = searchParams.toString();
      const res = await getProductsFetching(query);

      if (res.success) {
        setProducts(res.data);
        if (!query) setLoaded(true); // solo marcar loaded para la carga inicial
      } else {
        setError(res.message);
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
    <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
