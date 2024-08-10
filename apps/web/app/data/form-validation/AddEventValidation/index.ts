import { z } from "zod";

export type AddEventValidationType = z.infer<typeof AddEventValidation>;

export const AddEventValidation = z
  .object({
    event_name: z.string().min(1, { message: "The field is required." }),
    topic_type: z.string().min(1, { message: "The field is required." }),
    category_type: z.string().min(1, { message: "The field is required." }),
    country: z.string().min(1, { message: "The field is required." }),
    price: z.string().min(1, { message: "The field is required." }),
    city: z.string().min(1, { message: "The field is required." }),
    start_date: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    time: z.string(),
    ended_date: z.coerce.date(),
    duration: z.string().min(1, { message: "The field is required." }),
  })
  .refine((data) => data.ended_date > data.start_date, {
    message: "End date cannot be earlier than start date.",
    path: ["ended_date"],
  });
