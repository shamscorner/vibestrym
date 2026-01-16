import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    passwordRepeat: z
      .string()
      .min(1, "Password confirmation is required")
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "Passwords do not match",
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
