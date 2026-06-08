import { Navigate, Outlet } from 'react-router';

import { PageLoader } from '@/components/page-loader';
import { useAuth } from '@/hooks/use-auth';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to='/login' replace />;

  return <Outlet />;
};
