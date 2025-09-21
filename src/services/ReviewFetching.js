// src/services/reviewFetching.js
import axiosInstance from "../helpers/axiosConfig.js";

// ➕ Usuario: agregar reseña
export const addReviewFetching = async (reviewData) => {
  try {
    const { data } = await axiosInstance.post("/api/reviews", reviewData);
    return data;
  } catch (error) {
    console.error("Error al agregar reseña:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al agregar reseña",
    };
  }
};

// 🌍 Público: obtener reseñas de un producto
export const getProductReviewsFetching = async (productId) => {
  try {
    const { data } = await axiosInstance.get(`/api/reviews/product/${productId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener reseñas:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al obtener reseñas",
    };
  }
};

// 🟢 Admin: aprobar reseña
export const approveReviewFetching = async (reviewId) => {
  try {
    const { data } = await axiosInstance.put(`/api/reviews/approve/${reviewId}`);
    return data;
  } catch (error) {
    console.error("Error al aprobar reseña:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al aprobar reseña",
    };
  }
};

// 🗑️ Admin: eliminar reseña
export const deleteReviewFetching = async (reviewId) => {
  try {
    const { data } = await axiosInstance.delete(`/api/reviews/${reviewId}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar reseña:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al eliminar reseña",
    };
  }
};

// 📋 Admin: obtener reseñas pendientes
export const getPendingReviewsFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/reviews/pending/all");
    return data;
  } catch (error) {
    console.error("Error al obtener reseñas pendientes:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al obtener reseñas pendientes",
    };
  }
};