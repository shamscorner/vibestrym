'use client';

import { z } from 'zod';

export const createAccountFormSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/, 'Invalid username format')
    .max(50, 'Username must be at most 50 characters long'),
  email: z.email().min(3, 'Email must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'), // TODO: use a strong password policy on production
});

export type CreateAccountFormSchema = z.infer<typeof createAccountFormSchema>;
