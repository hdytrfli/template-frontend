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

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data);
      toast.success('Welcome back!');
      navigate('/dashboard', {
        replace: true,
      });
    } catch {
      toast.error('Invalid credentials', {
        description: 'Please check your username and password and try again.',
      });
    }
  };

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <Header>Welcome back!</Header>

      <Field error={form.formState.errors.username}>
        <Label htmlFor='username'>Username</Label>
        <Input id='username' placeholder='Username' {...form.register('username')} />
      </Field>

      <Field error={form.formState.errors.password} description='Enter your password'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          placeholder='Password'
          {...form.register('password')}
        />
      </Field>

      <Button type='submit' variant='primary'>
        <span>Login</span>
        <ArrowUpRight size={16} />
      </Button>

      <p>
        Don't have an account?{' '}
        <Link to='/register' className='text-foreground'>
          Register
        </Link>
      </p>
    </Form>
  );
};
