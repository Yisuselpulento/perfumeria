import { useNavigate } from "react-router-dom";
import { getTagColor } from "../helpers/tagscolors";

const ProductCard = ({ product }) => {
  const { _id, name, brand, price, image, tags, status } = product;
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
      <div
      onClick={handleClick}
      className="shadow-md hover:shadow-lg transition cursor-pointer text-sm"
    >
      <div className="relative w-full h-[400px] mb-2">
        <div className="absolute top-2 left-2 space-y-1 z-10 flex flex-raw gap-1">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className={` bg-opacity-60 ${getTagColor(tag.name)} text-black text-xs px-2 py-0.5 rounded-md`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h2 className="text-ms font-semibold">{name}</h2>
        <p className="text-gray-500">{brand}</p>
        <p className="mt-1">Desde $<strong>{price}</strong></p>
      </div>
    </div>
  );
};

export default ProductCard;