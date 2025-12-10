import { AuthUser, UserData } from "@/features/auth/types";

export const transformApiResponseToUser = (user: UserData): AuthUser => {
  return {
    id: user.user_id,
    email: user.email,
  };
};
