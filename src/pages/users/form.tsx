import { zodResolver } from '@hookform/resolvers/zod';
import { AtSign, Lock, Mail, Phone, User } from 'lucide-react';
import type { FieldError } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUserSchema, updateUserSchema } from '@/services/user';

export type UserFormData = z.infer<typeof createUserSchema> | z.infer<typeof updateUserSchema>;

interface UserFormProps {
  defaultValues?: Partial<z.infer<typeof createUserSchema>>;
  onSubmit: (data: UserFormData) => Promise<void>;
  isUpdate?: boolean;
  isPending?: boolean;
  onCancel?: () => void;
}

export const UserForm = ({
  defaultValues,
  onSubmit,
  isUpdate,
  isPending,
  onCancel,
}: UserFormProps) => {
  const schema = isUpdate ? updateUserSchema : createUserSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const err = form.formState.errors as Record<string, FieldError | undefined>;

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      {!isUpdate && (
        <Field error={err.username}>
          <Label htmlFor='username' required>
            Username
          </Label>
          <Input
            id='username'
            placeholder='Username'
            {...form.register('username')}
            icon={AtSign}
          />
        </Field>
      )}

      {!isUpdate && (
        <Field error={err.password} description='At least 6 characters'>
          <Label htmlFor='password' required>
            Password
          </Label>
          <Input
            id='password'
            type='password'
            placeholder='Password'
            {...form.register('password')}
            icon={Lock}
          />
        </Field>
      )}

      <Field error={err.name}>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' placeholder='Full name' {...form.register('name')} icon={User} />
      </Field>

      <Field error={err.level}>
        <Label htmlFor='level' required>
          Level
        </Label>
        <Input id='level' placeholder='Level' {...form.register('level')} />
      </Field>

      <Field error={err.email} description='Used for notifications'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='Email (optional)'
          {...form.register('email')}
          icon={Mail}
        />
      </Field>

      <Field error={err.phone}>
        <Label htmlFor='phone'>Phone</Label>
        <Input id='phone' placeholder='Phone (optional)' {...form.register('phone')} icon={Phone} />
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
