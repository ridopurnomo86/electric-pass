import { z } from "zod";

export type AddEventValidationType = z.infer<typeof AddEventValidation>;

export const AddEventValidation = z.object({
  event_name: z.string().min(1, { message: "The field is required." }),
  event_type: z.string().min(1, { message: "The field is required." }),
  country: z.string().min(1, { message: "The field is required." }),
  price: z.string().min(1, { message: "The field is required." }),
  city: z.string().min(1, { message: "The field is required." }),
  datetime: z.coerce
    .date()
    .refine((data) => data > new Date(), { message: "Start date must be in the future" }),
  description: z.string().min(1, { message: "The field is required." }),
});
