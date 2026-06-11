import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Mail, Phone, User, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserSchema, type UpdateUserData } from '@/services/user';

interface UserUpdateFormProps {
  defaultValues: UpdateUserData;
  onSubmit: (data: UpdateUserData) => Promise<void>;
  isPending: boolean;
  onCancel: () => void;
}

export const UserUpdateForm = ({
  defaultValues,
  onSubmit,
  isPending,
  onCancel,
}: UserUpdateFormProps) => {
  const form = useForm<UpdateUserData>({ resolver: zodResolver(updateUserSchema), defaultValues });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Field error={form.formState.errors.name} description='Full display name'>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' placeholder='Full name' {...form.register('name')} icon={User} />
      </Field>

      <Field error={form.formState.errors.level}>
        <Label htmlFor='level' required>
          Level
        </Label>
        <Input id='level' placeholder='Level' {...form.register('level')} />
      </Field>

      <Field
        error={form.formState.errors.email}
        description='Used for account recovery and notifications'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='Email (optional)'
          {...form.register('email')}
          icon={Mail}
        />
      </Field>

      <Field error={form.formState.errors.phone}>
        <Label htmlFor='phone'>Phone</Label>
        <Input id='phone' placeholder='Phone (optional)' {...form.register('phone')} icon={Phone} />
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
