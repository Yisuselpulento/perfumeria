import { useEffect, useState } from "react";
import { getBestSellingProductsFetching } from "../services/ProductsFetching";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  const [bestSellers, setBestSellers] = useState([]);
  const [loadingBest, setLoadingBest] = useState(true);
  const [errorBest, setErrorBest] = useState("");

  console.log("Auth:", auth);

  useEffect(() => {
    const fetchBestSellers = async () => {
      setLoadingBest(true);
      const res = await getBestSellingProductsFetching();
      if (res.success) {
        setBestSellers(res.data);
        setErrorBest("");
      } else {
        setErrorBest(res.message);
      }
      setLoadingBest(false);
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm text-gray-500">Bienvenido {auth?.user?.fullName || "invitado"}</p>
      <img 
        className="w-full h-60 object-cover mb-4 rounded-lg"
        src="images/perfumes.webp" 
      />

      <h2 className="text-xl font-semibold mb-2 w-full text-left">Top Ventas</h2>

      <div className="grid grid-cols-2 gap-4 w-full">
        {loadingBest ? (
          <p className="col-span-2 text-center">Cargando los productos más vendidos...</p>
        ) : errorBest ? (
          <p className="col-span-2 text-red-600">{errorBest}</p>
        ) : (
          bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>

      <div className="mt-10 w-full">
        <Link className="bg-yellow-500 hover:bg-yellow-500/80 p-3 w-full rounded-full text-center" to="/products">
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
};

export default Home;