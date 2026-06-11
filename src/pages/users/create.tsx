import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useCreateUser } from '@/hooks/use-user-query';
import { UserCreateForm } from '@/pages/users/create-form';
import type { CreateUserData } from '@/services/user';

export const UserCreate = () => {
  const createUser = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserData) => {
    try {
      await createUser.mutateAsync(data);
      toast.success('User created');
      navigate('/users');
    } catch {
      toast.error('Failed to create user');
    }
  };

  return (
    <div className='grid gap-8'>
      <Header>Create User</Header>
      <Card>
        <CardHeader title='User Details' />
        <CardContent>
          <UserCreateForm
            onSubmit={onSubmit}
            isPending={createUser.isPending}
            onCancel={() => navigate('/users')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
