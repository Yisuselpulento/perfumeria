import axiosInstance from "../helpers/axiosConfig.js";

/* -------------------------- HANDLE REQUEST -------------------------- */
const handleRequest = async (request) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
};

/* ========================== PRODUCTS ========================== */
export const createProductFetching = async (productData) =>
  handleRequest(
    axiosInstance.post("/api/products", productData)
  );

export const getProductsFetching = async (query = "") =>
  handleRequest(
    axiosInstance.get(
      query ? `/api/products?${query}` : "/api/products"
    )
  );

export const getProductByIdFetching = async (productId) =>
  handleRequest(
    axiosInstance.get(`/api/products/${productId}`)
  );

export const updateProductFetching = async (productId, updatedData) =>
  handleRequest(
    axiosInstance.put(`/api/products/${productId}`, updatedData)
  );

export const deleteProductFetching = async (productId) =>
  handleRequest(
    axiosInstance.delete(`/api/products/${productId}`)
  );

export const getBestSellingProductsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/products/bestsellers")
  );

  export const getRandomProductsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/products/random")
  );