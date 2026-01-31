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

/* -------------------------- SIGN UP -------------------------- */
export const signUpFetching = async (userData) =>
  handleRequest(
    axiosInstance.post("/api/auth/signup", userData)
  );

/* -------------------------- LOGIN -------------------------- */
export const loginFetching = async (userData) =>
  handleRequest(
    axiosInstance.post("/api/auth/login", userData)
  );

/* -------------------------- LOGOUT -------------------------- */
export const logoutFetching = async () =>
  handleRequest(
    axiosInstance.post("/api/auth/logout")
  );

/* -------------------------- FORGOT PASSWORD -------------------------- */
export const forgotPasswordFetching = async (userData) =>
  handleRequest(
    axiosInstance.post("/api/auth/forgot-password", userData)
  );

/* -------------------------- RESET PASSWORD -------------------------- */
export const updatePasswordFetching = async (newPassword, TOKEN) =>
  handleRequest(
    axiosInstance.post(`/api/auth/reset-password/${TOKEN}`, newPassword)
  );

/* -------------------------- VERIFY EMAIL -------------------------- */
export const emailVerificationFetching = async (code) =>
  handleRequest(
    axiosInstance.post("/api/auth/verify-email", code)
  );

/* -------------------------- RESEND TOKEN -------------------------- */
export const resendTokenFetching = async () =>
  handleRequest(
    axiosInstance.post("/api/auth/resend-verification-token")
  );
