import { useEffect, useState } from "react";
import { 
  getBestSellingProductsFetching,
  getRandomProductsFetching
} from "../services/ProductsFetching";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const Home = () => {
  const { auth } = useAuth();

  const [bestSellers, setBestSellers] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  const [loadingBest, setLoadingBest] = useState(true);
  const [loadingRandom, setLoadingRandom] = useState(true);

  const [errorBest, setErrorBest] = useState("");
  const [errorRandom, setErrorRandom] = useState("");

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

    const fetchRandomProducts = async () => {
      setLoadingRandom(true);
      const res = await getRandomProductsFetching();
      if (res.success) {
        setRandomProducts(res.data);
        setErrorRandom("");
      } else {
        setErrorRandom(res.message);
      }
      setLoadingRandom(false);
    };

    fetchBestSellers();
    fetchRandomProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm text-gray-400">
        {auth?.user
          ? `Bienvenid${auth.user.gender === "male" ? "o" : "a"} ${auth.user.fullName}`
          : ""}
      </p>

      {/* HERO */}
      <div className="relative left-0 right-0 w-screen">
        <img
          className="w-full h-60 object-cover mb-4 rounded-lg md:rounded-none md:h-[500px]"
          src="images/perfumes.webp"
        />
      </div>

      {/* 🔥 TOP VENTAS */}
      <section className="md:w-full md:px-20">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 w-full text-left">
          Top Ventas
        </h2>

        <div className="grid grid-cols-2 md:flex gap-4 w-full">
          {loadingBest ? (
            <div className="col-span-2 flex justify-center items-center h-60 w-full">
              <Spinner />
            </div>
          ) : errorBest ? (
            <p className="col-span-2 text-red-600">{errorBest}</p>
          ) : (
            bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* 🎲 RECOMENDADOS RANDOM */}
      <section className="md:w-full md:px-20 mt-14">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 w-full text-left">
          Recomendados para ti
        </h2>

        <div className="grid grid-cols-2 md:flex gap-4 w-full">
          {loadingRandom ? (
            <div className="col-span-2 flex justify-center items-center h-60 w-full">
              <Spinner />
            </div>
          ) : errorRandom ? (
            <p className="col-span-2 text-red-600">{errorRandom}</p>
          ) : (
            randomProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 w-[80%] flex flex-col items-center">
        <Link
          className="bg-yellow-500 hover:bg-yellow-500/80 p-3 w-full md:w-90 rounded-full text-center"
          to="/storage"
        >
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
};

export default Home;
