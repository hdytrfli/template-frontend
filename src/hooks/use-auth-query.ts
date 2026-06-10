import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { authService } from '@/api/auth';
import { setAccessToken } from '@/libs/auth-client';
import type {
  AuthResponse,
  ChangePasswordData,
  LoginData,
  RefreshResponse,
  RegisterData,
  UpdateProfileData,
  User,
} from '@/types/auth';

export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const { data: res } = await authService.profile();
      return res.data;
    },
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const { data: res } = await authService.login(data);
      return res.data;
    },
    onSuccess: (result: AuthResponse) => {
      setAccessToken(result.accessToken);
      queryClient.setQueryData(authKeys.profile(), result.user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const { data: res } = await authService.register(data);
      return res.data;
    },
    onSuccess: (result: AuthResponse) => {
      setAccessToken(result.accessToken);
      queryClient.setQueryData(authKeys.profile(), result.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(authKeys.profile(), null);
      queryClient.clear();
    },
  });
};

export const useRefresh = () => {
  return useMutation({
    mutationFn: async () => {
      const { data: res } = await authService.refresh();
      return res.data;
    },
    onSuccess: (data: RefreshResponse) => {
      setAccessToken(data.accessToken);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({ id, ...data }: ChangePasswordData & { id: string }) => {
      const { data: res } = await authService.changePassword(id, data);
      return res.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...rest }: UpdateProfileData & { id: string }) => {
      const { data: res } = await authService.updateProfile(id, rest);
      return res.data;
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(authKeys.profile(), user);
    },
  });
};
