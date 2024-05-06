import { z } from "zod";

export type ProfileValidationType = z.infer<typeof ProfileValidation>;

export const ProfileValidation = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});
