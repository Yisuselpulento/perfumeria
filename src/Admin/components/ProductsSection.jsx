import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getProductsFetching,
  deleteProductFetching,
} from "../../services/ProductsFetching";
import ProductCardAdmin from "../ProductCardAdmin";
import SearchBar from "../../components/SearchBar";
import ProductForm from "../ProductForm";
import Spinner from "../../components/Spinner/Spinner"; // ajusta path si es necesario

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFormMobile, setShowFormMobile] = useState(false);

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

  const handleCreated = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setShowFormMobile(false);
  };

  const handleDeleted = async (id) => {
    const res = await deleteProductFetching(id);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleUpdated = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-2">
      {/* Columna izquierda */}
      <div className="flex-1">
        <SearchBar />

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner size="2.5rem" />
          </div>
        ) : error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-lg font-semibold">
              No hay productos
            </p>
            <p className="text-sm">
              Crea uno para comenzar 🧴✨
            </p>

            <button
              onClick={() => setShowFormMobile(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 md:hidden"
            >
              Crear Producto
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 mt-3">
            <button
              onClick={() => setShowFormMobile(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-2 md:hidden"
            >
              Crear Producto
            </button>

            {products.map((product) => (
              <ProductCardAdmin
                key={product._id}
                product={product}
                onDeleted={handleDeleted}
                onUpdated={handleUpdated}
              />
            ))}
          </div>
        )}
      </div>

      {/* Formulario desktop */}
      <div className="hidden md:block w-1/3">
        <ProductForm onCreate={handleCreated} />
      </div>

      {/* Modal móvil */}
      {showFormMobile && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-2 md:hidden">
          <div className="rounded w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFormMobile(false)}
              className="absolute top-2 right-2 text-gray-500 text-lg"
            >
              &times;
            </button>

            <ProductForm
              onCreate={handleCreated}
              onCancel={() => setShowFormMobile(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
