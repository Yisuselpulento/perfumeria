import axiosInstance from "../helpers/axiosConfig.js";

const handleRequest = async (request) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
};

/* -------------------------- ADD ADDRESS -------------------------- */
export const addAddressFetching = async (addressData) =>
  handleRequest(
    axiosInstance.post("/api/user/address", addressData)
  );

/* -------------------------- GET ADDRESSES -------------------------- */
export const getAddressesFetching = async () =>
  handleRequest(
    axiosInstance.get("/api/user/address")
  );

/* -------------------------- UPDATE ADDRESS -------------------------- */
export const updateAddressFetching = async (addressId, updatedData) =>
  handleRequest(
    axiosInstance.put(`/api/user/address/${addressId}`, updatedData)
  );

/* -------------------------- DELETE ADDRESS -------------------------- */
export const deleteAddressFetching = async (addressId) =>
  handleRequest(
    axiosInstance.delete(`/api/user/address/${addressId}`)
  );
