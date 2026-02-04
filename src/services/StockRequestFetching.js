import axiosInstance from "../helpers/axiosConfig.js";

/* -------------------------- HANDLE REQUEST -------------------------- */
const handleRequest = async (request) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    if (error.response?.data) {
      return error.response.data;
    }

    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
};

/* ========================== STOCK REQUESTS ========================== */

/**
 * USER
 * Solicitar producto sin stock
 */
export const requestOutOfStockProductFetching = async (productId) =>
  handleRequest(
    axiosInstance.post("/api/stock-requests", { productId })
  );

/**
 * ADMIN
 * Obtener todas las solicitudes de stock
 */
export const getAllStockRequestsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/stock-requests")
  );

/**
 * ADMIN
 * Actualizar estado de una solicitud
 */
export const updateStockRequestStatusFetching = async (
  requestId,
  status
) =>
  handleRequest(
    axiosInstance.put(`/api/stock-requests/${requestId}`, { status })
  );
