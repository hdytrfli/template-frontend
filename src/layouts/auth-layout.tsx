import { Navigate, Outlet } from 'react-router';

import Backdrop from '@/assets/backdrop.jpg';
import { PageLoader } from '@/components/page-loader';
import { useAuth } from '@/hooks/use-auth';

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to='/dashboard' replace />;

  return (
    <div className='grid h-screen overflow-hidden lg:grid-cols-3'>
      <div className='container flex h-full flex-col items-center justify-center overflow-auto'>
        <div className='w-full max-w-md'>
          <Outlet />
        </div>
      </div>
      <div className='hidden size-full lg:col-span-2 lg:block'>
        <img src={Backdrop} className='size-full object-cover' />
      </div>
    </div>
  );
};
