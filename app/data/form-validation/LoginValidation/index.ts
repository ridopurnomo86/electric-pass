import { z } from "zod";

export type LoginValidationType = z.infer<typeof LoginValidation>;

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
