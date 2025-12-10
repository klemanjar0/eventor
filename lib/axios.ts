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

        // Retry the original request
        // The new access token cookie will be sent automatically
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("CATCH");
        console.log(refreshError);
        // If refresh fails, redirect to login (but only if not already on a public page)
        if (typeof window !== "undefined") {
          const publicPaths = ["/login", "/register"];
          const currentPath = window.location.pathname;

          if (!publicPaths.includes(currentPath)) {
            window.location.href = "/login";
          }
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
