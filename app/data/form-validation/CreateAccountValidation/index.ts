import { z } from "zod";

const AccountTypeEnum = z.enum(["visitor", "event_organizer"]);

export type CreateAccountValidationType = z.infer<typeof CreateAccountValidation>;

export const CreateAccountValidation = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string().min(8),
  account_type: AccountTypeEnum,
});
