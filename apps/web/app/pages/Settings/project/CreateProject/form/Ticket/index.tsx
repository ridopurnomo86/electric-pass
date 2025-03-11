import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { MutableRefObject } from "react";
import CoreForm from "~/components/core/Form";
import dayjs from "dayjs";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateEventPriceValidation,
  CreateEventPriceValidationType,
} from "~/data/form-validation/CreateEventValidation";
import { Button } from "~/components/ui/Button";
import { useNavigation, useOutletContext, useSubmit } from "@remix-run/react";
import { CurrentDataRefType } from "../..";
import CardPlan from "./CardPlan";

type TicketPropsType = {
  currentData: MutableRefObject<CurrentDataRefType>;
};

const Ticket = ({ currentData }: TicketPropsType) => {
  const { user } = useOutletContext<{ user: { name: string; id: string } }>();
  const submit = useSubmit();
  const { state } = useNavigation();
  const form = useForm<CreateEventPriceValidationType>({
    resolver: zodResolver(CreateEventPriceValidation),
    defaultValues: {
      plans: [
        {
          description: "",
          price: "0",
          pricing_name: "",
          ended_date: dayjs(currentData.current.ended_date).format(),
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "plans",
    control: form.control,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    const formData = new FormData();

    const submitValues = {
      ...currentData.current,
      ...values,
    };

    formData.append("user_id", user.id);

    Object.keys(submitValues).forEach((item) => {
      if (item === "plans") return formData.append(item, JSON.stringify(submitValues.plans));
      return formData.append(item, submitValues[item]);
    });

    submit(formData, { method: "post", encType: "multipart/form-data" });
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="mt-2">
        <p className="mb-2 text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
          Detailed Event Pricing
        </p>
        <p className="text-sm font-normal text-neutral-600">
          Creating a detailed pricing plan for your event requires considering various factors.
          <br />
          Here&apos;s a breakdown to help you structure your pricing
        </p>
      </div>
      <div>
        <CoreForm form={form} onSubmit={onSubmit} forms={[]}>
          <div className="flex flex-col gap-4">
            {fields.map((field, idx: number) => (
              <div key={field.id}>
                <CardPlan
                  index={idx}
                  control={form.control}
                  // TODO:Collapse specific form
                  onCollapse={() => {}}
                  isCollapse={true}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                append({
                  description: "",
                  price: "0",
                  pricing_name: "",
                  ended_date: dayjs(currentData.current.ended_date).format(),
                })
              }
              className="flex items-center"
              disabled={state === "submitting"}
            >
              <Icon icon="eva:plus-outline" className="mr-1 text-lg text-neutral-900" />
              <p className="text-sm font-medium text-neutral-900 antialiased">Add New Plan</p>
            </Button>
            <Button type="submit" className="flex items-center" disabled={state === "submitting"}>
              <p className="text-sm font-medium text-neutral-200 antialiased">Create Event</p>
            </Button>
          </div>
        </CoreForm>
      </div>
    </div>
  );
};

export default Ticket;
