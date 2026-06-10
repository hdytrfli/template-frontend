import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useDeleteUser, useUsers } from '@/hooks/use-user-query';

export const UserList = () => {
  const { data, isLoading } = useUsers();
  const deleteUser = useDeleteUser();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser.mutateAsync(id);
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const navigate = useNavigate();

  return (
    <div className='grid gap-8'>
      <div className='flex items-center justify-between'>
        <Header>Users</Header>
        <Button variant='primary' onClick={() => navigate('/user/create')}>
          <Plus size={16} />
          <span>Create User</span>
        </Button>
      </div>

      <Card>
        <CardHeader title='All Users' />
        <CardContent>
          {isLoading && <p className='text-muted-foreground py-8 text-center'>Loading...</p>}
          {!isLoading && !data?.data?.length && (
            <p className='text-muted-foreground py-8 text-center'>No users found.</p>
          )}

          {!isLoading && data?.data?.length && (
            <Table>
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Name</Th>
                  <Th>Level</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.map((user) => (
                  <Tr key={user._id}>
                    <Td className='font-medium'>{user.username}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.level}</Td>
                    <Td>{user.email ?? '—'}</Td>
                    <Td>
                      <div className='flex gap-2'>
                        <Link to={'/users/' + user._id + '/edit'}>Edit</Link>
                        <span className='cursor-pointer' onClick={() => handleDelete(user._id)}>
                          Delete
                        </span>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
