import apiClient from '@/libs/api-client';
import type { ApiResponse, PageParams, PaginatedApiResponse } from '@/types/api';

export type Identifier = string;
export type WithIdentifier<T> = T & { id: Identifier };

export class ApiClient<T, C = Partial<T>, U = Partial<T>> {
  protected basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async index(params: PageParams) {
    const { data } = await apiClient.get<PaginatedApiResponse<T>>(this.basePath, { params });
    return data;
  }

  async create(data: C): Promise<T> {
    const { data: res } = await apiClient.post<ApiResponse<T>>(this.basePath, data);
    return res.data;
  }

  async findById(id: Identifier): Promise<T> {
    const { data: res } = await apiClient.get<ApiResponse<T>>(this.basePath + '/' + id);
    return res.data;
  }

  async update(data: WithIdentifier<U>): Promise<T> {
    const { id, ...rest } = data;
    const { data: res } = await apiClient.patch<ApiResponse<T>>(this.basePath + '/' + id, rest);
    return res.data;
  }

  async delete(id: Identifier) {
    const { data } = await apiClient.delete<ApiResponse<null>>(this.basePath + '/' + id);
    return data;
  }
}
