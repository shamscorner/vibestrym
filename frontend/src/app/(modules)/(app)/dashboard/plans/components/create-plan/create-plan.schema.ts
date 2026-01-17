import { z } from "zod";

export const createPlanSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive() as z.ZodCoercedNumber<number>,
});

export type CreatePlanSchema = z.infer<typeof createPlanSchema>;
