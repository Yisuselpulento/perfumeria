import { useNavigate } from "react-router-dom";
import { getTagColor } from "../helpers/tagscolors";
import { capitalize } from "../helpers/capitalize.js";
import { toCLP } from "../helpers/toClp.js";

const ProductCard = ({ product }) => {
  const { _id, name, brand, price, image, tags, status } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="shadow-md hover:shadow-lg transition cursor-pointer text-sm relative"
    >
      <div className="relative aspect-square">
        {status === "poco_stock" && (
          <div className="absolute bottom-0 right-0 bg-white text-black text-xs font-semibold px-2 py-0.5 z-20">
            Quedan pocos
          </div>
        )}

        {status === "sin_stock" && (
          <div className="absolute bottom-0 right-0 bg-white text-black text-sm font-bold px-3 py-1 z-20 shadow-lg">
            AGOTADO
          </div>
        )}

        <div className="absolute top-2 left-1 z-10 flex flex-wrap gap-1">
          {tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className={`bg-opacity-60 ${getTagColor(tag.name)} text-black text-xs px-1 py-0.5 rounded-sm`}
            >
              {capitalize(tag.name)}
            </span>
          ))}
        </div>

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pt-3">
        <h2 className="text-ms font-semibold">{name}</h2>
        <p className="text-gray-500">{brand}</p>
        <p className="mt-1">Desde <strong>{toCLP(price)}</strong></p>
      </div>
    </div>
  );
};


export default ProductCard;