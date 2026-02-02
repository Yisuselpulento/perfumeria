import { useState, useEffect, createContext } from "react";
import { refreshCartFetching } from "../services/CartFetching";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [cartChanged, setCartChanged] = useState(false);

  // 🔁 Persistencia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // recalcular total local (fallback)
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  // -------------------- REFRESH CART --------------------
  const refreshCart = async () => {
    if (cartItems.length === 0) return;

    const items = cartItems.map((item) => ({
      productId: item.id,
      variantId: item.variant._id,
      quantity: item.quantity
    }));

    const data = await refreshCartFetching(items);

    if (data?.items) {
      setCartItems(
        data.items.map((item) => ({
          id: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          variant: {
            _id: item.variantId,
            volume: item.volume,
            stock: item.stock
          },
          quantity: item.quantity
        }))
      );

      setCartTotal(data.total);
      setCartChanged(data.changed);
    }
  };

  // -------------------- CART ACTIONS --------------------
  const addToCart = (product, variant, quantity = 1) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product._id && item.variant._id === variant._id
      );

      if (exists) {
        return prev.map((item) =>
          item.id === product._id && item.variant._id === variant._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product._id,
          name: product.name,
          image: product.image,
          price: variant.price,
          variant,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId, variantId) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.variant._id === variantId)
      )
    );
  };

  const updateQuantity = (id, variantId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant._id === variantId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartTotal(0);
    setCartChanged(false);
  };

  const cartCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        cartChanged,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
export default CartContext;
