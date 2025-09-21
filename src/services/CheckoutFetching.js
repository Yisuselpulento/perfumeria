import axiosInstance from "../helpers/axiosConfig.js";

// Crear una nueva orden
/* export const createOrderFetching = async (orderData) => {
  try {
    const { data } = await axiosInstance.post("/api/orders", orderData);
    return data;
  } catch (error) {
    console.error("Error al crear orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al crear orden";
    return { success: false, message: errorMessage };
  }
}; */

export const createPaymentIntent = async (total) => {
  try {
    const { data } = await axiosInstance.post("/api/payments/create-intent", {
      total
    });
    return data;
  } catch (error) {
    console.error("Error creando PaymentIntent:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error creando PaymentIntent";
    return { success: false, message: errorMessage };
  }
};

export const createOrderWithPayment = async (orderData) => {
  try {
    const { data } = await axiosInstance.post("/api/payments/checkout", orderData);
    return data;
  } catch (error) {
    console.error("Error creando orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error creando orden";
    return { success: false, message: errorMessage };
  }
};




export const failPaymentFetching = async (orderId) => {
  try {
    const { data } = await axiosInstance.post("/api/payments/fail", { orderId });
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al marcar pago como fallido" };
  }
};

// Reembolsar pago
export const refundPaymentFetching = async (paymentId) => {
  try {
    const { data } = await axiosInstance.post("/api/payments/refund", { paymentId });
    return data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error al reembolsar pago" };
  }
};