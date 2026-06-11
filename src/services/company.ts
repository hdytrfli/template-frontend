import * as z from 'zod';

import { ApiClient } from '@/services/base';
import type { Company } from '@/types/company';

export const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  email: z.email(),
  companyType: z.string().min(1).max(100),
});

export const updateCompanySchema = z.object({
  name: z.string().min(1).max(200).optional(),
  country: z.string().min(1).max(100).optional(),
  email: z.email().optional(),
  companyType: z.string().min(1).max(100).optional(),
});

export type CreateCompanyData = z.infer<typeof createCompanySchema>;
export type UpdateCompanyData = z.infer<typeof updateCompanySchema>;

export class CompanyService extends ApiClient<Company, CreateCompanyData, UpdateCompanyData> {
  constructor() {
    super('/companies');
  }
}
