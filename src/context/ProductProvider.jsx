import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [lastQuery, setLastQuery] = useState(null); // 🔑

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, lastQuery, setLastQuery }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
