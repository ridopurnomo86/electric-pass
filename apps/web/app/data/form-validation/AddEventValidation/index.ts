import { z } from "zod";

const MAX_FILE_SIZE = 1000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export type CreateEventValidationType = z.infer<typeof CreateEventValidation>;

export type CreateEventDescriptionValidationType = z.infer<typeof CreateEventDescriptionValidation>;

export const CreateEventValidation = z
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

export const CreateEventDescriptionValidation = z.object({
  image: z
    .any()
    .refine((file) => file?.size >= MAX_FILE_SIZE, `Max image size is 1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  description: z.string().min(1, { message: "The field is required." }),
});
