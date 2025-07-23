import { z } from 'zod';

export const changeEmailSchema = z.object({
  email: z.email(),
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;
