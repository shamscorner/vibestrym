import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(1, 'Username or email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  pin: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
