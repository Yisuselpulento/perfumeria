import axiosInstance from "../helpers/axiosConfig.js";

// ----------------- Usuario -----------------
export const getUserNotificationsFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/notifications");
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al obtener notificaciones" };
  }
};

export const markNotificationAsReadFetching = async (id) => {
  try {
    const { data } = await axiosInstance.put(`/api/notifications/${id}/read`);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al marcar notificación como leída" };
  }
};

// ----------------- Admin -----------------
export const getAllNotificationsFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/notifications/all");
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al obtener todas las notificaciones" };
  }
};

export const createNotificationFetching = async (notification) => {
  try {
    const { data } = await axiosInstance.post("/api/notifications", notification);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al crear notificación" };
  }
};

export const updateNotificationFetching = async (id, update) => {
  try {
    const { data } = await axiosInstance.put(`/api/notifications/${id}`, update);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al actualizar notificación" };
  }
};

export const deleteNotificationFetching = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/api/notifications/${id}`);
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al eliminar notificación" };
  }
};