import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";
import { Endpoint, Method } from "./endpoints";
import { ApiResponse, ApiError } from "@/types/api";

interface CallApiOptions<TData = any> {
  data?: TData;
  params?: Record<string, any>;
  config?: AxiosRequestConfig;
  urlParams?: any[];
}

export async function callApi<TResponse = Anything, TRequest = Anything>(
  endpoint: Endpoint,
  options: CallApiOptions<TRequest> = {}
): Promise<ApiResponse<TResponse>> {
  const { data, params, config = {}, urlParams = [] } = options;

  const url =
    typeof endpoint.url === "function"
      ? endpoint.url(...urlParams)
      : endpoint.url;

  const requestConfig: AxiosRequestConfig = {
    ...config,
    params: params || config.params,
    withCredentials: true,
  };

  try {
    let response;

    switch (endpoint.method) {
      case Method.GET:
        response = await axiosInstance.get<TResponse>(url, requestConfig);
        break;

      case Method.POST:
        response = await axiosInstance.post<TResponse>(
          url,
          data,
          requestConfig
        );
        break;

      case Method.PUT:
        response = await axiosInstance.put<TResponse>(url, data, requestConfig);
        break;

      case Method.PATCH:
        response = await axiosInstance.patch<TResponse>(
          url,
          data,
          requestConfig
        );
        break;

      case Method.DELETE:
        response = await axiosInstance.delete<TResponse>(url, requestConfig);
        break;

      default:
        throw new Error(`Unsupported HTTP method: ${endpoint.method}`);
    }

    return {
      data: response.data,
      status: response.status,
      success: true,
    };
  } catch (error: Anything) {
    const apiError: ApiError = {
      message:
        error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status || 500,
      code: error.code,
      details: error.response?.data,
    };

    throw apiError;
  }
}

export async function callApiTyped<TResponse, TRequest = any>(
  endpoint: Endpoint,
  options: CallApiOptions<TRequest> = {}
): Promise<TResponse> {
  const response = await callApi<TResponse, TRequest>(endpoint, options);
  return response.data;
}
