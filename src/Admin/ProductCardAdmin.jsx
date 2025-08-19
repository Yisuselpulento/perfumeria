import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

const ProductCardAdmin = ({ product, onDeleted }) => {
  const { _id, name, image, variants } = product;
  const [selected, setSelected] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex  rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition relative backdrop-blur-lg border border-black/20 ">
      <div className="w-24 h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="flex-1 p-2 flex flex-col justify-center"
        onClick={() => setSelected(!selected)}
      >
        <h2 className="text-sm font-semibold mb-2">{name}</h2>
        <div className="flex flex-wrap gap-1">
          {variants.map((variant) => (
            <span
              key={variant._id}
              className="bg-gray-200 text-gray-800 px-1 py-1 rounded-md text-xs"
            >
              {variant.volume}ml - Stock: {variant.stock}
            </span>
          ))}
        </div>
      </div>

      {selected && (
        <div className="flex flex-col gap-2 p-2 text-xs">
          <button className="bg-yellow-400 text-white py-1 px-2 rounded-md">
            Editar
          </button>
          <button
            className="bg-red-500 text-white py-1 px-2 rounded-md"
            onClick={() => setShowConfirm(true)}
          >
            Eliminar
          </button>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          productId={_id}
          onCancel={() => setShowConfirm(false)}
          onDeleted={onDeleted}
        />
      )}
    </div>
  );
};

export default ProductCardAdmin;