import { z } from "zod";

export const deactivateSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  pin: z.string().optional(),
});

export type DeactivateSchema = z.infer<typeof deactivateSchema>;
