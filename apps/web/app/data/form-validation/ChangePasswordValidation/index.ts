import { z } from "zod";

export type ChangePasswordValidationType = z.infer<typeof ChangePasswordValidation>;

export const ChangePasswordValidation = z
  .object({
    password: z.string().min(2),
    newPassword: z.string().min(2, {
      message: "New Password must be at least 8 characters.",
    }),
    repeatNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords don't match",
    path: ["repeatNewPassword"],
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "Passwords must be different",
    path: ["password"],
  });
