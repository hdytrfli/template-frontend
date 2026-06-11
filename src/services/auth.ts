import apiClient from '@/libs/api-client';
import type { ApiResponse } from '@/types/api';
import type {
  AuthResponse,
  ChangePasswordData,
  LoginData,
  RefreshResponse,
  RegisterData,
  UpdateProfileData,
  User,
} from '@/types/auth';

export class AuthService {
  async register(data: RegisterData) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  }

  async login(data: LoginData) {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  }

  async refresh() {
    const response = await apiClient.post<ApiResponse<RefreshResponse>>('/auth/refresh');
    return response.data;
  }

  async profile() {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  }

  async logout() {
    const response = await apiClient.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  }

  async changePassword(id: string, data: ChangePasswordData) {
    const response = await apiClient.patch<ApiResponse<null>>('/auth/' + id + '/password', data);
    return response.data;
  }

  async updateProfile(id: string, data: UpdateProfileData) {
    const response = await apiClient.patch<ApiResponse<User>>('/auth/' + id + '/profile', data);
    return response.data;
  }
}
