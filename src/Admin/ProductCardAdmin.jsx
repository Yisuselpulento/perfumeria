import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import ProductForm from "./ProductForm";

const ProductCardAdmin = ({ product, onDeleted, onUpdated }) => {
  const { _id, name, image, variants } = product;
  const [selected, setSelected] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="flex rounded-md shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition relative backdrop-blur-lg border border-black/20 md:w-[500px]">
        {/* Imagen */}
        <div className="w-20 h-20">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info del producto */}
        <div
          className="flex-1 p-2 flex flex-col justify-center"
          onClick={() => setSelected(!selected)}
        >
          <h2 className="text-sm font-semibold mb-2">{name}</h2>
          <div className="flex flex-col flex-wrap">
            {variants.map((variant) => (
              <span
                key={variant._id}
                className="rounded-md text-xs"
              >
                {variant.volume}ml - Stock: {variant.stock}
              </span>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        {selected && (
          <div className="flex flex-col gap-2 p-2 text-xs">
            <button
              className="bg-yellow-400 text-white py-1 px-2 rounded-md cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              Editar
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md cursor-pointer"
              onClick={() => setShowConfirm(true)}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <ConfirmModal
          productId={_id}
          onCancel={() => setShowConfirm(false)}
          onDeleted={onDeleted}
        />
      )}

      {/* Modal de edición */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-1 z-50">
          <div className="rounded w-full max-w-md relative max-h-[90vh] overflow-y-auto p-4">
            {/* Botón cerrar */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 text-lg"
            >
              &times;
            </button>

            {/* Formulario */}
            <ProductForm
              initialValues={product}
              onSubmit={(updatedProduct) => {
                if (onUpdated) onUpdated(updatedProduct);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardAdmin;