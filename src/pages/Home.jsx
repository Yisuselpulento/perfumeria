import { useEffect, useState } from "react";
import { getBestSellingProductsFetching } from "../services/ProductsFetching";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoading(true);
      const res = await getBestSellingProductsFetching();
      if (res.success) {
        setBestSellers(res.data);
      } else {
        setError(res.message);
      }
      setLoading(false);
    };

    fetchBestSellers();
  }, []);

  if (loading) return <p>Cargando los productos más vendidos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm text-gray-500">Bienvenido {auth?.user.fullName || "invitado"}</p>
      <img 
      className="w-full h-60 object-cover mb-4 rounded-lg"
      src="images/perfumes.jpg" />

     <h2 className="text-xl font-semibold mb-2 w-full text-left">Top Ventas</h2>

      <div className="grid grid-cols-2 gap-4">
        {bestSellers.map((product) => (
          <ProductCard
           key={product._id}
            product={product} />
        ))}
      </div>

      <div className="mt-10 ">
        <Link className="bg-yellow-500 hover:bg-yellow-500/80 p-3 w-full rounded-full text-center" to="/products">
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
};

export default Home;