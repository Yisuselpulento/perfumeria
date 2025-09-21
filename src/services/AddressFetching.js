import axiosInstance from "../helpers/axiosConfig.js";

// ➕ Agregar una nueva dirección
export const addAddressFetching = async (addressData) => {
  try {
    const { data } = await axiosInstance.post("/api/address", addressData);
    return data;
  } catch (error) {
    console.error("Error al agregar dirección:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al agregar dirección"
    };
  }
};

// 📦 Obtener todas las direcciones del usuario
export const getAddressesFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/address");
    return data;
  } catch (error) {
    console.error("Error al obtener direcciones:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al obtener direcciones"
    };
  }
};

// ✏️ Actualizar una dirección
export const updateAddressFetching = async (addressId, updatedData) => {
  try {
    const { data } = await axiosInstance.put(`/api/address/${addressId}`, updatedData);
    return data;
  } catch (error) {
    console.error("Error al actualizar dirección:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al actualizar dirección"
    };
  }
};

// 🗑️ Eliminar una dirección
export const deleteAddressFetching = async (addressId) => {
  try {
    const { data } = await axiosInstance.delete(`/api/address/${addressId}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar dirección:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error al eliminar dirección"
    };
  }
};