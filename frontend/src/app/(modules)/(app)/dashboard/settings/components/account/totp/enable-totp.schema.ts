import { z } from "zod";

export const enableTotpSchema = z.object({
  pin: z.string().length(6),
});

export type EnableTotpSchema = z.infer<typeof enableTotpSchema>;
