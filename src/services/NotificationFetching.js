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
export const getUserNotificationsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/notifications")
  );

export const markNotificationAsReadFetching = async (id) =>
  handleRequest(
    axiosInstance.put(`/api/notifications/${id}/read`)
  );

/* ========================== ADMIN ========================== */
export const getAllNotificationsFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/notifications/all")
  );

export const createNotificationFetching = async (notification) =>
  handleRequest(
    axiosInstance.post("/api/notifications", notification)
  );

export const updateNotificationFetching = async (id, update) =>
  handleRequest(
    axiosInstance.put(`/api/notifications/${id}`, update)
  );

export const deleteNotificationFetching = async (id) =>
  handleRequest(
    axiosInstance.delete(`/api/notifications/${id}`)
  );
