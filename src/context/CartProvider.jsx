import { useState, useEffect, createContext } from "react";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

   useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


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
      prev.filter((item) => !(item.id === productId && item.variant._id === variantId))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const updateQuantity = (id, variantId, newQuantity) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id && item.variant._id === variantId
        ? { ...item, quantity: Math.max(1, newQuantity) } 
        : item
    )
  );
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider };
export default CartContext;