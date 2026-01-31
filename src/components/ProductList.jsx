import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsFetching } from "../services/ProductsFetching";
import { useProducts } from "../context/ProductProvider";
import Spinner from "./Spinner/Spinner";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, setProducts, lastQuery, setLastQuery } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();

    // ✅ si ya tenemos data para ESTE query, no refetch
    if (lastQuery === query && products.length) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      const res = await getProductsFetching(query);

      if (res.success) {
        setProducts(res.data);
        setLastQuery(query);
      } else {
        setError(res.message);
        setProducts([]);
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
  if (!products.length) return <p>No se encontraron productos.</p>;

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4">
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
