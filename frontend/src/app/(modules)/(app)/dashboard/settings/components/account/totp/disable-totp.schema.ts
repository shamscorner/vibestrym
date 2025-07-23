import { z } from 'zod';

export const disableTotpSchema = z.object({
  pin: z.string().length(6),
});

export type DisableTotpSchema = z.infer<typeof disableTotpSchema>;
