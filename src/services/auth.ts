import apiClient from '@/libs/auth-client';
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

class AuthService {
  register(data: RegisterData) {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
  }

  login(data: LoginData) {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
  }

  refresh() {
    return apiClient.post<ApiResponse<RefreshResponse>>('/auth/refresh');
  }

  profile() {
    return apiClient.get<ApiResponse<User>>('/auth/profile');
  }

  logout() {
    return apiClient.post<ApiResponse<null>>('/auth/logout');
  }

  changePassword(id: string, data: ChangePasswordData) {
    return apiClient.patch<ApiResponse<null>>('/auth/' + id + '/password', data);
  }

  updateProfile(id: string, data: UpdateProfileData) {
    return apiClient.patch<ApiResponse<User>>('/auth/' + id + '/profile', data);
  }
}

export const authService = new AuthService();
