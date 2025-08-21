import axiosInstance from "../helpers/axiosConfig.js";

export const createProductFetching = async (productData) => {
  try {
    const { data } = await axiosInstance.post("/api/products", productData);
    return data;
  } catch (error) {
    console.error("Error al crear producto:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al crear producto";
    return { success: false, message: errorMessage };
  }
};

export const getProductsFetching = async (query = "") => {
  try {
    const url = query ? `/api/products?${query}` : "/api/products";
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener productos";
    return { success: false, message: errorMessage };
  }
};

export const getProductByIdFetching = async (productId) => {
  try {
    const { data } = await axiosInstance.get(`/api/products/${productId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener producto:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener producto";
    return { success: false, message: errorMessage };
  }
};

export const updateProductFetching = async (productId, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`/api/products/${productId}`, updatedData);
    return data;
  } catch (error) {
    console.error("Error al actualizar producto:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al actualizar producto";
    return { success: false, message: errorMessage };
  }
};

export const deleteProductFetching = async (productId) => {
  try {
    const { data } = await axiosInstance.delete(`/api/products/${productId}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar producto:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al eliminar producto";
    return { success: false, message: errorMessage };
  }
};

export const getBestSellingProductsFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/products/bestsellers");
    return data;
  } catch (error) {
    console.error("Error al obtener productos más vendidos:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener productos más vendidos";
    return { success: false, message: errorMessage };
  }
};
