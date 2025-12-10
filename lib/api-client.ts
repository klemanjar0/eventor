import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axios";
import { ApiError, ApiResponse } from "@/types/api";

class ApiClient {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, config);
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        url,
        data,
        config
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(
        url,
        data,
        config
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.patch(
        url,
        data,
        config
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(
        url,
        config
      );
      return {
        data: response.data,
        status: response.status,
        success: true,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
      return {
        message:
          error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status || 500,
        code: error.code,
        details: error.response?.data,
      };
    }

    return {
      message: "An unexpected error occurred",
      status: 500,
    };
  }
}

export const apiClient = new ApiClient();
