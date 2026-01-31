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
export const getUserOrdersFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/orders")
  );

/* ========================== ADMIN ========================== */
export const getAllOrdersFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/orders/all")
  );

export const updateOrderStatusFetching = async (orderId, status) =>
  handleRequest(
    axiosInstance.put(`/api/orders/${orderId}/status`, { status })
  );

export const deleteOrderFetching = async (orderId) =>
  handleRequest(
    axiosInstance.delete(`/api/orders/${orderId}`)
  );

/* ========================== SINGLE ORDER ========================== */
export const getOrderByIdFetching = async (id) =>
  handleRequest(
    axiosInstance.get(`/api/orders/${id}`)
  );
