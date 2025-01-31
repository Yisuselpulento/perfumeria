import axiosInstance from "../helpers/axiosConfig.js";

export const signUpFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.post("/api/auth/signup", userData);
   return data
} catch (error) {
  console.error('Error during signUp:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al registrar";
  return { success: false, message: errorMessage };
} 
};
 

export const loginFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.post("/api/auth/login", userData);
   return data
} catch (error) {
  console.error('Error during login:', error?.response.data.message);
  const errorMessage = error?.response?.data?.message || "Error al iniciar sesión";
  return { success: false, message: errorMessage };
} 
};

export const logoutFetching = async () => {  
  try {
  const { data } = await axiosInstance.post("/api/auth/logout");
   return data
} catch (error) {
  console.error('Error during logout:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al cerrar sesión";
  return { success: false, message: errorMessage };
} 
};

export const forgotPasswordFetching = async (userData) => { 
  try {
  const { data } = await axiosInstance.post("/api/auth/forgot-password", userData);
   return data
} catch (error) {
  console.error('Error al enviar', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al enviar";
  return { success: false, message: errorMessage };
} 
};

export const updatePasswordFetching = async (newPassword,TOKEN) => { 
  try {
  const { data } = await axiosInstance.post(`/api/auth/reset-password/${TOKEN}`, newPassword);
   return data
} catch (error) {
  console.error('Error al actualizar:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error al tratar de actualizar";
  return { success: false, message: errorMessage };
} 
};

export const emailVerificationFetching = async (code) => { 

  try {
  const { data } = await axiosInstance.post("/api/auth/verify-email", code);
   return data
} catch (error) {
  console.error('Error during login:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error token";
  return { success: false, message: errorMessage };
} 
};

export const resendTokenFetching = async () => { 
  try {
  const { data } = await axiosInstance.post("/api/auth/resend-verification-token");
   return data
} catch (error) {
  console.error('Error during login:', error.response.data.message);
  const errorMessage = error.response?.data?.message || "Error token";
  return { success: false, message: errorMessage };
} 
};

