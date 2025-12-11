import { callApiTyped } from "@/lib/call-api";
import endpoints from "@/lib/endpoints";
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  VerifyResponse,
  RegisterResponse,
} from "./types";
import { clearAuthCookies } from "@/features/auth/actions";

export async function login(credentials: LoginDto): Promise<AuthResponse> {
  return callApiTyped<AuthResponse, LoginDto>(endpoints.login, {
    data: credentials,
  });
}

export async function register(data: RegisterDto): Promise<RegisterResponse> {
  return callApiTyped<RegisterResponse, RegisterDto>(endpoints.register, {
    data,
  });
}

export async function me(): Promise<VerifyResponse | null> {
  return callApiTyped<VerifyResponse>(endpoints.me);
}

export async function logout(): Promise<void> {
  await callApiTyped(endpoints.logout);
  await clearAuthCookies();
}
