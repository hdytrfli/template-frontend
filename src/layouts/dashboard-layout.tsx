import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className='container'>
      <header className='flex items-center justify-between py-6'>
        <span>Welcome, {user?.name}!</span>
        <Button type='button' variant='destructive' onClick={logout}>
          Logout
        </Button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
