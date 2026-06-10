import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';

import { companyService, createCompanySchema, updateCompanySchema } from '@/api/company';

export const companyKeys = {
  all: ['companies'] as const,
  list: (params?: Record<string, unknown>) => [...companyKeys.all, 'list', params] as const,
  detail: (id: string) => [...companyKeys.all, 'detail', id] as const,
};

export const useCompanies = (params?: {
  page?: number;
  limit?: number;
  filter?: Record<string, unknown>;
}) => {
  return useQuery({
    queryKey: companyKeys.list(params),
    queryFn: async () => {
      const { data: res } = await companyService.index(params);
      return res;
    },
  });
};

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: async () => {
      const { data: res } = await companyService.findById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof createCompanySchema>) => {
      const { data: res } = await companyService.create(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: z.infer<typeof updateCompanySchema> & { id: string }) => {
      const { data: res } = await companyService.update(id, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: res } = await companyService.delete(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};
