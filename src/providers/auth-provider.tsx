import * as React from 'react';

import { AuthContext } from '@/context/auth-context';
import { setAccessToken } from '@/libs/auth-client';
import { authService } from '@/services/auth';
import type { LoginData, RegisterData } from '@/types/auth';
import type { User } from '@/types/user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const login = React.useCallback(async (data: LoginData) => {
    const { data: res } = await authService.login(data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  }, []);

  const register = React.useCallback(async (data: RegisterData) => {
    const { data: res } = await authService.register(data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  }, []);

  const logout = React.useCallback(async () => {
    await authService.logout();
    setUser(null);
    setAccessToken(null);
  }, []);

  React.useEffect(() => {
    const init = async () => {
      try {
        const { data: res } = await authService.refresh();
        setAccessToken(res.data.accessToken);

        const { data: userRes } = await authService.profile();
        setUser(userRes.data);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: loading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
