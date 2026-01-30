import axiosInstance from "../helpers/axiosConfig.js";

// 🔹 Crear orden + generar link de Mercado Pago
export const createOrderWithPayment = async (orderData) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/payments/checkout",
      orderData
    );
    return data;
  } catch (error) {
    console.error("Error creando orden:", error.response?.data?.message);
    return {
      success: false,
      message: error.response?.data?.message || "Error creando orden",
    };
  }
};

