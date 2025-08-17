import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import { getProductByIdFetching } from "../services/ProductsFetching";
import Spinner from "../components/Spinner/Spinner";
import { getTagColor } from "../helpers/tagscolors";
import { capitalize } from "../helpers/capitalize.js";

const formatTimeOfDay = (time) => {
  if (!time) return "";
  return time.replace(/_/g, " "); 
};

const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductByIdFetching(id);
        console.log(res)
        if (res.success) {
          setProduct(res.data);
          setError("");
        } else {
          setError(res.message || "Producto no encontrado");
        }
      } catch (e) {
        setError("Error al obtener el producto");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

 if (loading) return (
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

  return (
    <div className="max-w-4xl mx-auto text-center">

      <h1 className="text-xl font-semibold mb-2">{name}</h1>

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

      <div className="w-full h-72 flex justify-center items-center mb-4 rounded overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>

      <div className="flex justify-center items-center gap-4 mb-4 ">
          <img
            src={`/images/logos/${brandSlug}_logo.webp`}
            alt={`${brand} logo`}
            className="w-40 h-20 object-contain"
          />
        </div>

      <p className="text-sm">
      {category}
      </p>

      <section className="mt-6">
          <p className="text-lg font-semibold">
              ${variants[0].price} - ${variants[variants.length - 1].price}
          </p>
        </section>
        <section className="mt-3">
          <p className="text-start mb-3 text-xs mx-3">Tamaños:</p> 
          <ul className="flex flex-wrap gap-4 items-center justify-between w-[80%] mx-auto"> 
          {variants.map((v, i) => (

             <img 
               src="/images/pote.jpg"
                alt={v.name}
                className="w-20 h-20 object-cover border "
             key={i}/> 
        

            ))}
              </ul>
         </section>

      <section className="mt-6">
        <h2 className="mb-2">Ingredientes</h2>
        <ul className="flex flex-wrap gap-4">
          {ingredients.map((ing, i) => (
            <li key={i} className="flex flex-col items-center">
              <img
                src={ing.image}
                alt={ing.name}
                className="w-16 h-16 object-cover rounded"
              />
              <span>{ing.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
  <h2 className="mb-2">Intensidad</h2>
  <ul className="flex flex-col gap-3">
    {tags.map((tag, i) => (
      <li
        key={i}
        className="grid grid-cols-[1fr_3fr_auto] items-center gap-4"
      >
        <span className="font-medium text-xs"> {capitalize(tag.name)}</span>

        <div className="w-full h-4 bg-gray-200 rounded">
          <div
            className={`h-full rounded transition-all ${getTagColor(tag.name)}`}
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
          <div className="w-[90%] mx-auto">
              <button className="bg-primary hover:bg-primary/60 cursor-pointer p-3 rounded-full mt-10 w-full text-xl font-bold">Agregar al carrito</button>
          </div>
       <section className="mt-6 text-sm text-gray-300">
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
    </div>
  );
};

export default ProductId;