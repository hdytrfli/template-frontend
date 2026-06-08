import { AlertTriangle } from 'lucide-react';
import { Outlet } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const { theme, icon, rotate } = useTheme();
  const ThemeIcon = icon;

  return (
    <div className='container'>
      <header className='flex items-center justify-between py-6'>
        <span>Welcome, {user?.name}!</span>

        <div className='flex items-center gap-2'>
          <Button type='button' variant='destructive' onClick={logout}>
            <AlertTriangle size={16} />
            <span>Logout</span>
          </Button>

          <Button variant='ghost' onClick={rotate}>
            <span key={theme} className='animate-in fade-in spin-in-90 duration-300 ease-in-out'>
              <ThemeIcon size={16} />
            </span>
          </Button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
