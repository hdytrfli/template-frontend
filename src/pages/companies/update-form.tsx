import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Building2, Globe, Mail, Type, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateCompanySchema, type UpdateCompanyData } from '@/services/company';

interface CompanyUpdateFormProps {
  defaultValues: UpdateCompanyData;
  onSubmit: (data: UpdateCompanyData) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export const CompanyUpdateForm = ({
  defaultValues,
  onSubmit,
  isPending,
  onCancel,
}: CompanyUpdateFormProps) => {
  const form = useForm<UpdateCompanyData>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues,
  });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Field error={form.formState.errors.name} description='Up to 200 characters'>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' placeholder='Company name' {...form.register('name')} icon={Building2} />
      </Field>

      <Field error={form.formState.errors.country} description='Country of operation'>
        <Label htmlFor='country' required>
          Country
        </Label>
        <Input id='country' placeholder='Country' {...form.register('country')} icon={Globe} />
      </Field>

      <Field error={form.formState.errors.email}>
        <Label htmlFor='email' required>
          Email
        </Label>
        <Input
          id='email'
          type='email'
          placeholder='Company email'
          {...form.register('email')}
          icon={Mail}
        />
      </Field>

      <Field
        error={form.formState.errors.companyType}
        description='e.g. Retail, Technology, Finance'>
        <Label htmlFor='companyType' required>
          Company Type
        </Label>
        <Input id='companyType' placeholder='Type' {...form.register('companyType')} icon={Type} />
      </Field>

      <div className='flex gap-4'>
        <Button type='button' variant='ghost' onClick={onCancel} disabled={isPending}>
          <X size={16} />
          <span>Cancel</span>
        </Button>
        <Button type='submit' variant='primary' disabled={isPending}>
          <span>Update</span>
          <ArrowUpRight size={16} />
        </Button>
      </div>
    </Form>
  );
};
