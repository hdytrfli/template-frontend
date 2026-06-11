import * as React from 'react';

import { AuthContext } from '@/context/auth-context';
import { setAccessToken } from '@/libs/api-client';
import { AuthService } from '@/services/auth';
import type { LoginData, RegisterData } from '@/types/auth';
import type { User } from '@/types/user';

const authService = new AuthService();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const login = React.useCallback(async (formData: LoginData) => {
    const { data } = await authService.login(formData);
    setUser(data.user);
    setAccessToken(data.accessToken);
  }, []);

  const register = React.useCallback(async (formData: RegisterData) => {
    const { data } = await authService.register(formData);
    setUser(data.user);
    setAccessToken(data.accessToken);
  }, []);

  const logout = React.useCallback(async () => {
    await authService.logout();
    setUser(null);
    setAccessToken(null);
  }, []);

  React.useEffect(() => {
    const init = async () => {
      try {
        const { data } = await authService.refresh();
        setAccessToken(data.accessToken);
        const { data: userData } = await authService.profile();
        setUser(userData);
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
