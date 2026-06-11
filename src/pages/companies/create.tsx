import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useCreateCompany } from '@/hooks/use-company-query';
import { CompanyCreateForm } from '@/pages/companies/create-form';
import type { CreateCompanyData } from '@/services/company';

export const CompanyCreate = () => {
  const createCompany = useCreateCompany();
  const navigate = useNavigate();

  const onSubmit = async (data: CreateCompanyData) => {
    try {
      await createCompany.mutateAsync(data);
      toast.success('Company created');
      navigate('/companies');
    } catch {
      toast.error('Failed to create company');
    }
  };

  return (
    <div className='grid gap-8'>
      <Header>Create Company</Header>
      <Card>
        <CardHeader title='Company Details' />
        <CardContent>
          <CompanyCreateForm
            onSubmit={onSubmit}
            isPending={createCompany.isPending}
            onCancel={() => navigate('/companies')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
