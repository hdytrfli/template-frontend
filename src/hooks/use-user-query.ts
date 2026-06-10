import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';

import { userService, createUserSchema, updateUserSchema } from '@/api/user';

export const userKeys = {
  all: ['users'] as const,
  list: (params?: Record<string, unknown>) => [...userKeys.all, 'list', params] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
};

export const useUsers = (params?: {
  page?: number;
  limit?: number;
  filter?: Record<string, unknown>;
}) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      const { data: res } = await userService.index(params);
      return res;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const { data: res } = await userService.findById(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof createUserSchema>) => {
      const { data: res } = await userService.create(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: z.infer<typeof updateUserSchema> & { id: string }) => {
      const { data: res } = await userService.update(id, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: res } = await userService.delete(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
