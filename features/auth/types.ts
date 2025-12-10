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

export type VerifyResponse = UserData;

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
