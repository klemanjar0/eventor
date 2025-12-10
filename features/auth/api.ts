import { callApiTyped } from "@/lib/call-api";
import endpoints from "@/lib/endpoints";
import { LoginDto, RegisterDto, AuthResponse, VerifyResponse } from "./types";
import { clearAuthCookies } from "@/features/auth/actions";

export const authApi = {
  login: async (credentials: LoginDto): Promise<AuthResponse> => {
    return callApiTyped<AuthResponse, LoginDto>(endpoints.login, {
      data: credentials,
    });
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    return callApiTyped<AuthResponse, RegisterDto>(endpoints.register, {
      data,
    });
  },

  me: async (): Promise<VerifyResponse | null> => {
    return callApiTyped<VerifyResponse>(endpoints.me);
  },

  logout: async (): Promise<void> => {
    await callApiTyped(endpoints.logout);
    await clearAuthCookies();
  },
};
