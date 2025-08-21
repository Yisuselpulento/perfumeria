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
    const { data } = await axiosInstance.post("/api/orders/checkout", orderData);
    return data;
  } catch (error) {
    console.error("Error creando orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error creando orden";
    return { success: false, message: errorMessage };
  }
};


export const getOrdersFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/orders");
    return data;
  } catch (error) {
    console.error("Error al obtener órdenes:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener órdenes";
    return { success: false, message: errorMessage };
  }
};

// Obtener las órdenes del usuario logeado
export const getUserOrdersFetching = async () => {
  try {
    const { data } = await axiosInstance.get("/api/orders/my-orders");
    return data;
  } catch (error) {
    console.error("Error al obtener mis órdenes:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener mis órdenes";
    return { success: false, message: errorMessage };
  }
};

// Obtener una orden por ID
export const getOrderByIdFetching = async (orderId) => {
  try {
    const { data } = await axiosInstance.get(`/api/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error al obtener la orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al obtener la orden";
    return { success: false, message: errorMessage };
  }
};

// Actualizar estado de una orden (solo admin)
export const updateOrderStatusFetching = async (orderId, status) => {
  try {
    const { data } = await axiosInstance.put(`/api/orders/${orderId}`, { status });
    return data;
  } catch (error) {
    console.error("Error al actualizar la orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al actualizar la orden";
    return { success: false, message: errorMessage };
  }
};

// Eliminar una orden (solo admin)
export const deleteOrderFetching = async (orderId) => {
  try {
    const { data } = await axiosInstance.delete(`/api/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("Error al eliminar la orden:", error.response?.data?.message);
    const errorMessage = error.response?.data?.message || "Error al eliminar la orden";
    return { success: false, message: errorMessage };
  }
};

