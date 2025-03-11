import { z } from "zod";

export type BookingBillingValidationType = z.infer<typeof BookingBillingValidation>;

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const IdentificationRegex = new RegExp(/^\d{6}-?\d{4}$/);

export const BookingBillingValidation = z.object({
  first_name: z.string().min(1, { message: "The field is required." }),
  last_name: z.string().min(1, { message: "The field is required." }),
  email: z.string().email(),
  id_number: z
    .string()
    .min(1, { message: "The field is required." })
    .regex(IdentificationRegex, "Invalid Identification!"),
  dialing_code: z.string().min(1, { message: "The field is required." }),
  phone_number: z.string().regex(phoneRegex, "Invalid Number!"),
});
