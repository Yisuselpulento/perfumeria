import axiosInstance from "../helpers/axiosConfig.js";

// ----------------- Usuario -----------------
export const getUserOrdersFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/orders");
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al obtener órdenes" };
  }
};

// ----------------- Admin -----------------
export const getAllOrdersFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/orders/all");
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al obtener todas las órdenes" };
  }
};

export const updateOrderStatusFetching = async (orderId, status) => {
  try {
    const { data } = await axiosInstance.put(`/api/orders/${orderId}/status`, { status });
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al actualizar estado de la orden" };
  }
};

export const deleteOrderFetching = async (orderId) => {
  try {
    const { data } = await axiosInstance.delete(`/api/orders/${orderId}`);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al eliminar la orden" };
  }
};

// ----------------- Orden específica (usuario/admin) -----------------
export const getOrderByIdFetching = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/api/orders/${id}`);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al obtener la orden" };
  }
};