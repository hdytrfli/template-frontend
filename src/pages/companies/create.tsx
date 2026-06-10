import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { useCreateCompany } from '@/hooks/use-company-query';
import { CompanyForm } from '@/pages/companies/form';
import { createCompanySchema, updateCompanySchema } from '@/services/company';

export const CompanyCreate = () => {
  const createCompany = useCreateCompany();
  const navigate = useNavigate();

  const onSubmit = async (
    data: z.infer<typeof createCompanySchema> | z.infer<typeof updateCompanySchema>,
  ) => {
    try {
      await createCompany.mutateAsync(data as z.infer<typeof createCompanySchema>);
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
          <CompanyForm
            onSubmit={onSubmit}
            isPending={createCompany.isPending}
            onCancel={() => navigate('/companies')}
          />
        </CardContent>
      </Card>
    </div>
  );
};
