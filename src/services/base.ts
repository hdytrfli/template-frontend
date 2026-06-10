import apiClient from '@/libs/auth-client';
import type { ApiResponse, PageParams } from '@/types/api';

export class ApiClient<T, C = Partial<T>, U = Partial<T>> {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  index(params: PageParams) {
    return apiClient.get<ApiResponse<T[]>>(this.basePath, { params });
  }

  create(data: C) {
    return apiClient.post<ApiResponse<T>>(this.basePath, data);
  }

  findById(id: string) {
    return apiClient.get<ApiResponse<T>>(`${this.basePath}/${id}`);
  }

  update(id: string, data: U) {
    return apiClient.patch<ApiResponse<T>>(`${this.basePath}/${id}`, data);
  }

  delete(id: string) {
    return apiClient.delete<ApiResponse<null>>(`${this.basePath}/${id}`);
  }
}
