import { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, loaded, setLoaded }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
