import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useUpdateUser, useUser } from '@/hooks/use-user-query';
import { UserForm } from '@/pages/users/form';
import { createUserSchema, updateUserSchema } from '@/services/user';

export const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useUser(id!);
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  const onSubmit = async (
    data: z.infer<typeof createUserSchema> | z.infer<typeof updateUserSchema>,
  ) => {
    try {
      await updateUser.mutateAsync({ ...data, id: id! } as Parameters<
        typeof updateUser.mutateAsync
      >[0]);
      toast.success('User updated');
      navigate('/users');
    } catch {
      toast.error('Failed to update user');
    }
  };

  if (isLoading) return <p className='text-muted-foreground py-8 text-center'>Loading...</p>;
  if (!user) return <p className='text-muted-foreground py-8 text-center'>User not found.</p>;

  return (
    <div className='grid gap-8'>
      <Header>Edit User</Header>
      <Card>
        <CardHeader title='User Details' />
        <CardContent>
          <UserForm
            defaultValues={user}
            onSubmit={onSubmit}
            isUpdate
            isPending={updateUser.isPending}
            onCancel={() => navigate('/users')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
