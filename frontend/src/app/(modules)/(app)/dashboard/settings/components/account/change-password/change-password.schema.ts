import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, "Old password is required")
      .min(8, "Old password must be at least 8 characters long"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "New password must be at least 8 characters long"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from old password",
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
