import { useEffect, useState } from "react";
import { getProductsFetching } from "../services/ProductsFetching";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";


const Storage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await getProductsFetching();
      if (res.success) {
        console.log(res.data);
        setProducts(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando los productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2 flex flex-col gap-2">
       <Link className="text-primary hover:text-primary/80" to="/">
        Atras
      </Link>

    <div className="grid grid-cols-2 gap-2">
      {products.map((product) => (
        <ProductCard 
         isTopSeller={product.sold >= 2}
        key={product._id} product={product} />
      ))}
    </div>
    </div>
  );
};

export default Storage;