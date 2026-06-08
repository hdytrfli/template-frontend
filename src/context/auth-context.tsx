import * as React from 'react';

import { AuthService as auth, type LoginData, type RegisterData, type User } from '@/api/auth';
import { setAccessToken } from '@/libs/client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = React.createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const login = React.useCallback(async (data: LoginData) => {
    const { data: res } = await auth.login(data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  }, []);

  const register = React.useCallback(async (data: RegisterData) => {
    const { data: res } = await auth.register(data);
    setUser(res.data.user);
    setAccessToken(res.data.accessToken);
  }, []);

  const logout = React.useCallback(async () => {
    await auth.logout();
    setUser(null);
    setAccessToken(null);
  }, []);

  React.useEffect(() => {
    const init = async () => {
      try {
        const { data: res } = await auth.refresh();
        setAccessToken(res.data.accessToken);

        const { data: userRes } = await auth.profile();
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
