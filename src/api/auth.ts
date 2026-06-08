import authClient from '@/libs/client';

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface User {
  _id: string;
  username: string;
  name: string;
  level: string;
  email?: string;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

type ApiResponse<T> = {
  succes: boolean;
  data: T;
};

export const AuthService = {
  register: (data: RegisterData) => {
    return authClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
  },
  login: (data: LoginData) => {
    return authClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
  },
  refresh: () => {
    return authClient.post<ApiResponse<{ accessToken: string }>>('/auth/refresh');
  },
  profile: () => {
    return authClient.get<ApiResponse<User>>('/auth/profile');
  },
  logout: () => {
    return authClient.post<{ success: true; message: string }>('/auth/logout');
  },
};
