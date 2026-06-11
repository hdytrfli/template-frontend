import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useCreateUser } from '@/hooks/use-user-query';
import { UserForm } from '@/pages/users/form';
import type { UserFormData } from '@/pages/users/form';
import type { createUserSchema } from '@/services/user';

export const UserCreate = () => {
  const createUser = useCreateUser();
  const navigate = useNavigate();

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUser.mutateAsync(data as z.infer<typeof createUserSchema>);
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
          <UserForm
            onSubmit={onSubmit}
            isPending={createUser.isPending}
            onCancel={() => navigate('/users')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
