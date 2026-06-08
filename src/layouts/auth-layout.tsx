import { Navigate, Outlet } from 'react-router';

import Backdrop from '@/assets/backdrop.jpg';
import { PageLoader } from '@/components/page-loader';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

export const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme, icon, rotate } = useTheme();
  const ThemeIcon = icon;

  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to='/dashboard' replace />;

  return (
    <div className='relative grid h-screen overflow-hidden lg:grid-cols-3'>
      <div className='absolute top-0 right-0 m-6'>
        <Button variant='ghost' onClick={rotate}>
          <span key={theme} className='animate-in fade-in spin-in-90 duration-300 ease-in-out'>
            <ThemeIcon size={16} />
          </span>
        </Button>
      </div>

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
