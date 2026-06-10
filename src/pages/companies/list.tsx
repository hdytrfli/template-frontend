import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { Table, Tbody, Td, Th, Thead, Tr } from '@/components/ui/table';
import { useCompanies, useDeleteCompany } from '@/hooks/use-company-query';

export const CompanyList = () => {
  const { data, isLoading } = useCompanies();
  const deleteCompany = useDeleteCompany();

  const handleDelete = async (id: string) => {
    try {
      await deleteCompany.mutateAsync(id);
      toast.success('Company deleted');
    } catch {
      toast.error('Failed to delete company');
    }
  };

  const navigate = useNavigate();

  return (
    <div className='grid gap-8'>
      <div className='flex items-center justify-between'>
        <Header>Companies</Header>
        <Button variant='primary' onClick={() => navigate('/companies/create')}>
          <Plus size={16} />
          <span>Create Company</span>
        </Button>
      </div>

      <Card>
        <CardHeader title='All Companies' />
        <CardContent>
          {isLoading && <p className='text-muted-foreground py-8 text-center'>Loading...</p>}
          {!isLoading && !data?.data?.length && (
            <p className='text-muted-foreground py-8 text-center'>No companies found.</p>
          )}
          {!isLoading && data?.data?.length && (
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Country</Th>
                  <Th>Email</Th>
                  <Th>Type</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.data.map((company) => (
                  <Tr key={company._id}>
                    <Td className='font-medium'>{company.name}</Td>
                    <Td>{company.country}</Td>
                    <Td>{company.email}</Td>
                    <Td>{company.companyType}</Td>
                    <Td>
                      <div className='flex gap-2'>
                        <Link to={'/companies/' + company._id + '/edit'}>Edit</Link>
                        <span className='cursor-pointer' onClick={() => handleDelete(company._id)}>
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
