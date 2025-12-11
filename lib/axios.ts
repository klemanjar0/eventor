import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import endpoints from "@/lib/endpoints";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      !error.config?.url?.includes("/login") &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Check if refresh token exists before attempting refresh
      if (typeof window !== "undefined") {
        try {
          const checkResponse = await fetch("/api/auth/has-refresh-token", {
            credentials: "include",
          });
          const { hasToken } = await checkResponse.json();

          if (!hasToken) {
            // No refresh token available, return the error without attempting refresh
            return Promise.reject(error);
          }
        } catch (checkError) {
          console.error("Error checking refresh token:", checkError);
          return Promise.reject(error);
        }
      }

      try {
        // Attempt to refresh the token
        // The refresh token cookie will be sent automatically due to withCredentials: true
        const response = await axiosInstance.post(
          `${baseUrl}${endpoints.refreshToken.url}`,
          {},
          {
            withCredentials: true,
          }
        );

        console.log("TOKEN REFRESHED: ", response.data);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        if (typeof window !== "undefined") {
          try {
            await fetch("/api/auth/clear-cookies", {
              method: "POST",
              credentials: "include",
            });
          } catch (clearError) {
            console.error("Error clearing cookies:", clearError);
          }
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
