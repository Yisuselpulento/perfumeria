import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductsFetching, deleteProductFetching, updateProductFetching } from "../../services/ProductsFetching";
import ProductCardAdmin from "../ProductCardAdmin";
import SearchBar from "../../components/SearchBar";
import ProductForm from "../ProductForm";

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
    prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
  );
};

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Columna izquierda → lista de productos */}
      <div className="flex-1">
        <SearchBar />
        {loading ? (
          <p>Cargando los productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col gap-4">
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

      {/* Columna derecha → formulario en desktop */}
      <div className="hidden md:block w-1/3">
        <ProductForm onCreate={handleCreated} />
      </div>

      {/* Botón y modal en móvil */}
      <div className="md:hidden">
        <button
          onClick={() => setShowFormMobile(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
        >
          Crear Producto
        </button>

        {showFormMobile && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-1">
            <div className="rounded w-full max-w-md relative">
              <button
                onClick={() => setShowFormMobile(false)}
                className="absolute top-2 right-2 text-gray-500 text-lg"
              >
                &times;
              </button>
              <div className="rounded w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <ProductForm onCreate={handleCreated} onCancel={() => setShowFormMobile(false)} />
              </div>  
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;