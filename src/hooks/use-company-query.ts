import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { CompanyService } from '@/services/company';
import type { PaginationParam } from '@/types/api';

const companyService = new CompanyService();

export const companyKeys = {
  all: ['companies'] as const,
  list: (params: PaginationParam) => [...companyKeys.all, 'list', params] as const,
  detail: (id: string) => [...companyKeys.all, 'detail', id] as const,
};

export const useCompanies = (params: PaginationParam = {}) => {
  return useQuery({
    queryKey: companyKeys.list(params),
    queryFn: () => companyService.index(params),
  });
};

export const useCompany = (id: string) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => companyService.findById(id),
    enabled: !!id,
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyService.update,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: companyService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
};
