import Form from "~/components/core/Form";
import { Button } from "~/components/ui/Button";
import Select from "~/components/core/Form/components/Select";
import Input from "~/components/core/Form/components/Input";
import { useForm } from "react-hook-form";
import {
  BookingBillingValidation,
  BookingBillingValidationType,
} from "~/data/form-validation/BookingBillingValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetCountries from "~/hooks/useGetCountries";
import { useNavigation } from "@remix-run/react";
import INPUT_DATA from "./data";

type BillingFormPropsType = {
  callback: (values: BookingBillingValidationType) => void;
};

const BillingForm = ({ callback }: BillingFormPropsType) => {
  const { dialCode } = useGetCountries();
  const { state } = useNavigation();

  const form = useForm<BookingBillingValidationType>({
    resolver: zodResolver(BookingBillingValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      id_number: "",
      dialing_code: "",
      phone_number: "",
    },
  });

  const onSubmit = (values: BookingBillingValidationType) => {
    if (values) return callback(values);
  };

  return (
    <div className="size-full p-4 md:px-10">
      <p className="text-lg font-semibold tracking-tight text-neutral-900">Personal Information</p>
      <p className="mb-4 text-sm font-medium text-neutral-500">
        Personal information helps to verify who you are, ensuring that services or systems are
        accessed by the right person.
      </p>
      <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
        <div className="grid grid-cols-[10%_20%] gap-4">
          <Select
            id="dialing_code"
            label="Dialing Code"
            name="dialing_code"
            placeholder="+1"
            data={dialCode}
            defaultValue={form.getValues("dialing_code")}
            control={form.control}
            hasIcon
          />
          <Input
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            placeholder="Phone Number"
            control={form.control}
          />
        </div>
        <div className="flex w-full items-center justify-end border-t px-6 py-4 text-center">
          <p className="mr-2 text-xs font-medium text-neutral-600 antialiased">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </p>
          <Button
            type="submit"
            className="w-min bg-blue-500 hover:bg-blue-500 hover:opacity-60"
            disabled={state === "submitting" || !form.formState.isDirty}
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BillingForm;
