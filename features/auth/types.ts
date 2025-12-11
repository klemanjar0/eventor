export interface AuthUser {
  id: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  user_id: string;
}

export interface AuthResponse extends UserData {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  success: boolean;
  data: Anything;
}

export type VerifyResponse = UserData;
