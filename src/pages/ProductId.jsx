import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdFetching } from "../services/ProductsFetching";
import Spinner from "../components/Spinner/Spinner";
import { getTagColor } from "../helpers/tagscolors";
import { capitalize } from "../helpers/capitalize.js";
import { toCLP } from "../helpers/toClp.js";
import useCart from "../hooks/useCart.jsx";
import { toast } from "sonner";
import ReviewUserSection from "../components/Reviews/ReviewUserSection.jsx";
import RequestStockButton from "../components/Buttons/RequestStockButton.jsx";

const formatTimeOfDay = (time) => {
  if (!time) return "";
  return time.replace(/_/g, " "); 
};

const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [alert, setAlert] = useState(""); 

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductByIdFetching(id);
        if (res.success) {
          setProduct(res.data);
          setError("");
        } else {
          setError(res.message || "Producto no encontrado");
        }
      } catch (e) {
        setError("Error al obtener el producto", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full min-h-92">
        <Spinner />
      </div>
    );
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  const {
    name,
    brand,
    category,
    status,
    timeOfDay,
    seasons,
    description,
    brandSlug,  
    image,
    variants,
    ingredients,
    tags,
  } = product;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setAlert("Debes seleccionar un volumen.");
      return;
    }

    if (selectedVariant.stock === 0) {
      setAlert("Este volumen está agotado.");
      return;
    }

    setAlert("");
    addToCart(product, selectedVariant, 1);
    toast.success(<div className="text-green-600">Agregado al carrito </div>);
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <div className="w-full flex justify-start mb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:text-primary/80 cursor-pointer"
        >
          Atrás
        </button>
      </div>

      <h1 className="text-xl font-semibold mb-2  md:text-2xl">{name}</h1>
       <div className="flex justify-center mb-2 md:mb-10 ">
              {product.isTopSeller && (
                      <li className="px-1 py-0.5 rounded-sm text-xs text-white bg-yellow-400">
                        Mas vendidos
                      </li>
                    )}

                    {product.onSale && (
            <div className="px-3 py-1 text-xs text-white bg-red-500">
              EN OFERTA
            </div>
          )}
              </div>

      <div className="flex flex-col md:flex-row justify-between">
          <div>
              <ul className="flex justify-center flex-wrap gap-2 mb-2">
                {tags.map((tag, i) => (
                  <li
                    key={i}
                    className={`px-1 py-0.5 rounded-sm text-xs text-black ${getTagColor(
                      tag.name
                    )}`}
                  >
                    {capitalize(tag.name)}
                  </li>
                ))}
              </ul>

              <div className="w-full h-90 md:h-[650px] md:w-[650px] flex justify-center items-center mb-4 rounded overflow-hidden">
                <img src={image.url} alt={name} className="object-cover w-full h-full" />
              </div>
              <div className="flex flex-col items-center mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((n) => (
                      <span key={n} className={`text-xl ${n <= product.averageRating ? "text-yellow-400" : "text-gray-400"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {product.numReviews} reseña{product.numReviews !== 1 ? "s" : ""} | {product.averageRating.toFixed(1)} de 5
                  </p>
                </div>
          </div>
        {/*  <div className="flex justify-center items-center gap-4 mb-4">
            <img
              src={`/images/logos/${brandSlug}_logo.webp`}
              alt={`${brand} logo`}
              className="w-40 h-12 object-contain"
            />
          </div> */}
          <div>
              <p className="text-sm">{category}</p>

              <section className="mt-6 md:mt-2">
                <p className="text-lg font-semibold">
                  {toCLP(variants[0].price)} -{" "}
                  {toCLP(variants[variants.length - 1].price)}
                </p>
              </section>

              <section className="mt-3">
                <p className="text-xl font-bold mt-4 mb-2">Selecciona un volumen:</p>
                <p className="text-start md:text-center mb-3 text-xs mx-3">Tamaños:</p>
                <ul className="flex flex-wrap gap-4 md:w-full items-center justify-between w-[80%] mx-auto">
                  {variants.map((v, i) => (
                    <li key={i} className="relative">
                      <button
                        onClick={() => setSelectedVariant(v)}
                        className={`border rounded p-1 cursor-pointer ${
                          selectedVariant?._id === v._id
                            ? "border-primary ring-2 ring-primary "
                            : "border-gray-300"
                        } relative`}
                      >
                        <img
                          src="/images/pote.jpg"
                          alt={v.name}
                          className="w-20 h-20 object-cover"
                        />

                        {v.stock === 0 && (
                          <div className="cursor-auto absolute inset-0 bg-black/60 flex items-center justify-center rounded">
                            <span className="text-white text-xs font-bold">AGOTADO</span>
                          </div>
                        )}

                        <p className="text-xs mt-1">{v.volume} ml</p>
                      </button>
                    </li>
                  ))}
                </ul>

                {selectedVariant && (
                      <>
                        <p className="mt-2 text-sm text-gray-400">
                          {selectedVariant.volume === 4 && "De 60 a 70 atomizaciones"}
                          {selectedVariant.volume === 7 && "De 100 a 120 atomizaciones"}
                          {selectedVariant.volume === 10 && "De 140 a 160 atomizaciones"}
                        </p>
                        <p className="mt-1 text-lg font-semibold">{toCLP(selectedVariant.price)}</p>
                      </>
                    )}
              </section>

              <section className="mt-6">
                    <h2 className="mb-2">Ingredientes</h2>
                    <ul className="flex flex-wrap gap-4 justify-center">
                      {ingredients.map((ing, i) => {
                        // Crear nombre de archivo a partir del nombre del ingrediente
                        const imageName = ing.name
                          .toLowerCase()
                          .replace(/\s+/g, "_") // espacios -> guiones bajos
                          .replace(/[áéíóúñ]/g, (char) =>
                            ({ á: "a", é: "e", í: "i", ó: "o", ú: "u", ñ: "n" }[char])
                          ); // quitar acentos
                        const imagePath = `/ingredients/${imageName}.jpg`;

                        return (
                          <li key={i} className="flex flex-col items-center">
                            <img
                              src={imagePath}
                              alt={ing.name}
                              className="w-14 h-14 object-cover rounded"
                              onError={(e) => {
                                e.target.src = "/images/ingredientes/default.webp"; // por si no existe la imagen
                              }}
                            />
                            <span className="text-xs">{ing.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </section>

              <section className="mt-6 ">
                <h2 className="mb-2">Intensidad</h2>
                <ul className="flex flex-col gap-1">
                  {tags.map((tag, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[1fr_3fr_auto] items-center gap-4"
                    >
                      <span className="font-medium text-xs">
                        {" "}
                        {capitalize(tag.name)}
                      </span>

                      <div className="w-full h-4 bg-gray-200 rounded">
                        <div
                          className={`h-full rounded transition-all ${getTagColor(
                            tag.name
                          )}`}
                          style={{ width: `${(tag.intensity / 10) * 100}%` }}
                        />
                      </div>

                      <span className="text-xs text-gray-400">
                        {tag.intensity}/10
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
          </div>
      </div>


      <div className="w-[90%] md:w-[50%] mx-auto">
            {status !== "sin_stock" ? (
              <button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/60 cursor-pointer p-3 rounded-full mt-10 w-full text-xl font-bold"
              >
                Agregar al carrito
              </button>
            ) : (
              <RequestStockButton
                productId={product._id}
                productStatus={status}
              />
            )}

            {alert && <p className="text-red-600 mt-2 text-sm">{alert}</p>}
          </div>

      <section className="mt-6 text-sm text-gray-300 md:w-[70%] mx-auto">
        <h2 className="text-md font-bold mb-4">Detalles del producto</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span className="font-medium">Momento del día:</span>
            <span>{formatTimeOfDay(timeOfDay)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span className="font-medium">Temporadas:</span>
            <span>{seasons.join(", ")}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span className="font-medium">Marca:</span>
            <span>{brand}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-1">
            <span className="font-medium">Categoría:</span>
            <span>{category}</span>
          </div>
        </div>
      </section>

      <section className="my-4 ">
        <p className="mb-2">Descripción</p>
        <p className="text-gray-300">{description}</p>
      </section>

      <section>
        <ReviewUserSection productId={id} />
      </section>
    </div>
  );
};

export default ProductId;
