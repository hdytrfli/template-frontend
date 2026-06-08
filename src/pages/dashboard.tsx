import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useAuth } from '@/hooks/use-auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className='grid gap-8'>
      <Header>Dashboard</Header>
      {user && (
        <Card>
          <CardHeader title='User Data' />
          <CardContent>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
