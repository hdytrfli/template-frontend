export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type PaginatedApiResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PageParams = Partial<{
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
  filter: Record<string, unknown>;
}>;
