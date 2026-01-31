import { useNavigate } from "react-router-dom";
import { getTagColor } from "../helpers/tagscolors";
import { capitalize } from "../helpers/capitalize.js";
import { toCLP } from "../helpers/toClp.js";

const ProductCard = ({ product }) => {
  console.log(product);
  const { _id, name, brand, price, image, tags, status, isTopSeller, onSale } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="hover:shadow-lg transition cursor-pointer text-sm relative backdrop-blur-lg border border-black/30 bg-neutral-950 shadow-md md:w-72 hover:bg-neutral-900"
    >
      <div className="relative aspect-square">
        {status === "poco_stock" && (
          <div className="absolute bottom-0 right-0 bg-white text-black text-xs font-semibold px-2 py-0.5 z-20">
            Quedan pocos
          </div>
        )}

        {onSale && (
    <div className="absolute bottom-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 z-20 shadow-md">
      OFERTA
    </div>
  )}

        {status === "sin_stock" && (
          <div className="absolute bottom-0 right-0 bg-white text-black text-sm font-bold px-3 py-1 z-20 shadow-lg">
            AGOTADO
          </div>
        )}

        <div className="absolute top-1 left-1 z-10 flex flex-wrap gap-1">
          {tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className={`bg-opacity-60 ${getTagColor(tag.name)} text-black text-xs px-1 py-0.5 rounded-sm`}
            >
              {capitalize(tag.name)}
            </span>
          ))}
        </div>
          {isTopSeller && (
          <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs px-1 py-1 z-20 shadow-md">
            Top Ventas
          </div>
        )} 

        <img
          src={image.url}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pt-3 p-2">
        <h2 className="text-ms font-semibold">{name}</h2>
        <p className="text-gray-500">{brand}</p>
        <p className="mt-1">Desde <strong>{toCLP(price)}</strong></p>
      </div>
    </div>
  );
};


export default ProductCard;