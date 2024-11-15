// src/types/userProfile.ts

export interface UserProfile {
  id: string;
  username: string;
}

export interface AuthRegisterRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
}

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface AuthLoginResult {
  email: String | null;
  username: String | null;
  roles: String[] | null;
}

export interface UserResponse {
  user: User;
  token: string;
}
