import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, name, brand, price, image, tags, status } = product;
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-500">{brand}</p>
      <p className="mt-1 font-bold text-green-700">${price}</p>
    </div>
  );
};

export default ProductCard;