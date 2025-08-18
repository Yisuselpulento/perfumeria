import useCart from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center gap-3 text-black">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg border"
        />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">
            {item.variant.volume}ml - ${item.price}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={() =>
                updateQuantity(item.id, item.variant._id, item.quantity - 1)
              }
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-2">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item.id, item.variant._id, item.quantity + 1)
              }
              className="px-2 py-1 border rounded hover:bg-gray-100 "
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item.id, item.variant._id)}
        className="text-red-500 hover:underline"
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;