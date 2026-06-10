import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Globe, Mail, Type } from 'lucide-react';
import type { FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCompanySchema, updateCompanySchema } from '@/services/company';

type CompanyFormData = z.infer<typeof createCompanySchema> | z.infer<typeof updateCompanySchema>;

interface CompanyFormProps {
  defaultValues?: Partial<z.infer<typeof createCompanySchema>>;
  onSubmit: (data: CompanyFormData) => Promise<void>;
  isUpdate?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
}

export const CompanyForm = ({
  defaultValues,
  onSubmit,
  isUpdate,
  isPending,
  onCancel,
}: CompanyFormProps) => {
  const schema = isUpdate ? updateCompanySchema : createCompanySchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const err = form.formState.errors as Record<string, FieldError | undefined>;

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Field error={err.name}>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' placeholder='Company name' {...form.register('name')} icon={Building2} />
      </Field>

      <Field error={err.country}>
        <Label htmlFor='country' required>
          Country
        </Label>
        <Input id='country' placeholder='Country' {...form.register('country')} icon={Globe} />
      </Field>

      <Field error={err.email}>
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

      <Field error={err.companyType}>
        <Label htmlFor='companyType' required>
          Company Type
        </Label>
        <Input id='companyType' placeholder='Type' {...form.register('companyType')} icon={Type} />
      </Field>

      <div className='flex gap-4'>
        {onCancel && (
          <Button type='button' variant='ghost' onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        )}
        <Button type='submit' variant='primary' disabled={isPending}>
          {isUpdate ? 'Update' : 'Create'}
        </Button>
      </div>
    </Form>
  );
};
