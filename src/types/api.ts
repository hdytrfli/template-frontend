export type Identifier = string;
export type PageParam = { id: Identifier };
export type WithIdentifier<T> = T & PageParam;

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

export type PaginationParam = Partial<{
  page: number;
  limit: number;
  sort: string;
  order: 'asc' | 'desc';
  filter: Record<string, unknown>;
}>;
