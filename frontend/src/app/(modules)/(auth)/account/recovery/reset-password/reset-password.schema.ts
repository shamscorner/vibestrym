import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z.email().min(3, 'Email must be at least 3 characters long'),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
