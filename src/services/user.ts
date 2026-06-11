import * as z from 'zod';

import { ApiClient } from '@/services/base';
import type { User } from '@/types/user';

export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(128),
  name: z.string().min(1).max(100),
  level: z.string().min(1),
  email: z.email().optional(),
  phone: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  level: z.string().min(1).optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
});

export class UserService extends ApiClient<
  User,
  z.infer<typeof createUserSchema>,
  z.infer<typeof updateUserSchema>
> {
  constructor() {
    super('/users');
  }
}
