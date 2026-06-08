import { Header } from '@/components/ui/header';
import { useAuth } from '@/hooks/use-auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className='grid gap-8'>
      <Header>Dashboard</Header>
      {user && (
        <pre className='text-foreground rounded-lg border border-zinc-100 bg-zinc-50 p-8'>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
};
