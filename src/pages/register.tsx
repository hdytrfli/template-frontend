import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Header } from '@/components/ui/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';

const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await register(data);
      toast.success('Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch {
      toast.error('Registration failed', {
        description: 'Could not create your account. Please try again.',
      });
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Header>Create new account</Header>

      <Field error={form.formState.errors.username}>
        <Label htmlFor='username' required>
          Username
        </Label>
        <Input id='username' placeholder='Username' {...form.register('username')} />
      </Field>

      <Field error={form.formState.errors.name} description='Your full display name'>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' placeholder='Name' {...form.register('name')} />
      </Field>

      <Field error={form.formState.errors.email} description='Used for account recovery'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' placeholder='Email (optional)' {...form.register('email')} />
      </Field>

      <Field error={form.formState.errors.password} description='At least 6 characters'>
        <Label htmlFor='password' required>
          Password
        </Label>
        <Input
          id='password'
          type='password'
          placeholder='Password'
          {...form.register('password')}
        />
      </Field>

      <Button type='submit' variant='primary'>
        <span>Register</span>
        <ArrowUpRight size={16} />
      </Button>

      <p>
        Already have an account?{' '}
        <Link to='/login' className='text-foreground'>
          Login
        </Link>
      </p>
    </Form>
  );
};
