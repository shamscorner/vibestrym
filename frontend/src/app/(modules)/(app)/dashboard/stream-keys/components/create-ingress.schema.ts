import { z } from "zod";

export const IngressType = {
  RTMP: 0,
  WHIP: 1,
} as const;

export const createIngressSchema = z.object({
  ingressType: z.enum(IngressType),
});

export type CreateIngressSchema = z.infer<typeof createIngressSchema>;
