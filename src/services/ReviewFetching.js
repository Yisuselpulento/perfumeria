// src/services/reviewFetching.js
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

/* ========================== USER ========================== */
export const addReviewFetching = async (reviewData) =>
  handleRequest(
    axiosInstance.post("/api/reviews", reviewData)
  );

/* ========================== PUBLIC ========================== */
export const getProductReviewsFetching = async (productId) =>
  handleRequest(
    axiosInstance.get(`/api/reviews/product/${productId}`)
  );

/* ========================== ADMIN ========================== */
export const approveReviewFetching = async (reviewId) =>
  handleRequest(
    axiosInstance.put(`/api/reviews/approve/${reviewId}`)
  );

export const deleteReviewFetching = async (reviewId) =>
  handleRequest(
    axiosInstance.delete(`/api/reviews/${reviewId}`)
  );

export const getPendingReviewsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/reviews/pending/all")
  );
