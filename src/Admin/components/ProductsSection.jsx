import { useEffect, useState } from "react";
import { getProductsFetching } from "../../services/ProductsFetching";
import ProductCardAdmin from "../ProductCardAdmin";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProductsFetching();
      if (res.success) {
        setProducts(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

   const handleDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p>Cargando los productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="border p-2 rounded-md mb-4"
      />

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