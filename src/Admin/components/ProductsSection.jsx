import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsFetching } from "../../services/ProductsFetching";
import ProductCardAdmin from "../ProductCardAdmin";
import SearchBar from "../../components/SearchBar";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
        setError("");     
    setProducts([]);

    const formattedQuery = query ? `q=${query}` : "";

    const res = await getProductsFetching(formattedQuery);

    if (res.success) {
      setProducts(res.data);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  fetchProducts();
}, [query]);

  const handleDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p>Cargando los productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 flex flex-col gap-2">
      <SearchBar />
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCardAdmin
            key={product._id}
            product={product}
            onDeleted={handleDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;