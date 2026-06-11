import { useParams, useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useCompany, useUpdateCompany } from '@/hooks/use-company-query';
import { CompanyForm } from '@/pages/companies/form';
import type { CompanyFormData } from '@/pages/companies/form';

export const CompanyEdit = () => {
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading } = useCompany(id!);
  const updateCompany = useUpdateCompany();
  const navigate = useNavigate();

  const onSubmit = async (data: CompanyFormData) => {
    try {
      await updateCompany.mutateAsync({ ...data, id: id! });
      toast.success('Company updated');
      navigate('/companies');
    } catch {
      toast.error('Failed to update company');
    }
  };

  if (isLoading) return <p className='text-muted-foreground py-8 text-center'>Loading...</p>;
  if (!company) return <p className='text-muted-foreground py-8 text-center'>Company not found.</p>;

  return (
    <div className='grid gap-8'>
      <Header>Edit Company</Header>
      <Card>
        <CardHeader title='Company Details' />
        <CardContent>
          <CompanyForm
            defaultValues={company}
            onSubmit={onSubmit}
            isUpdate
            isPending={updateCompany.isPending}
            onCancel={() => navigate('/companies')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
