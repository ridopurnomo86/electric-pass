import { z } from "zod";

export type AccountProfileValidationType = z.infer<typeof AccountProfileValidation>;

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const AccountProfileValidation = z.object({
  address: z.string().min(1, { message: "The field is required." }),
  country: z.string().min(1, { message: "The field is required." }),
  city: z.string().min(1, { message: "The field is required." }),
  dialing_code: z.string().min(1, { message: "The field is required." }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number!"),
});
