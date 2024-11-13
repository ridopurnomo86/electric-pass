import Input from "~/components/core/Form/components/Input";
import CoreDate from "~/components/core/Form/components/Date";
import CoreForm from "~/components/core/Form";
import Select from "~/components/core/Form/components/Select";
import useGetCountries from "~/hooks/useGetCountries";
import { Button } from "~/components/ui/Button";
import { Icon } from "@iconify/react";
import { useNavigation } from "@remix-run/react";
import { useForm } from "react-hook-form";
import {
  CreateEventAboutValidation,
  CreateEventAboutValidationType,
} from "~/data/form-validation/CreateEventValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject } from "react";
import dayjs from "dayjs";
import { CurrentDataRefType, StepType } from "../..";
import INPUT_DATA from "./input-data";

type AboutPropsType = {
  category: { value: string; label: string }[];
  onStep: (value: StepType) => void;
  currentData: MutableRefObject<CurrentDataRefType>;
};

const About = ({ category, onStep, currentData }: AboutPropsType) => {
  const { state } = useNavigation();
  const { country } = useGetCountries();

  const form = useForm<CreateEventAboutValidationType>({
    resolver: zodResolver(CreateEventAboutValidation),
    defaultValues: {
      event_name: "",
      topic_type: "",
      category_type: 0,
      start_date: new Date(),
      ended_date: new Date(),
      time: "08:00",
      duration: "0",
      country: "",
      city: "",
    },
  });

  const onSubmit = (values: CreateEventAboutValidationType) => {
    const [hours, minutes] = values.time.split(":");
    const formatStartDate = values.start_date.setHours(Number(hours), Number(minutes));

    const submitValues = {
      event_name: values.event_name,
      topic_type: values.topic_type,
      category_type: values.category_type,
      start_date: dayjs(formatStartDate).format(),
      ended_date: dayjs(values.ended_date).format(),
      duration: values.duration,
      country: values.country,
      city: values.city,
      time: values.time,
      description: "",
      image: {} as File,
      plans: [
        {
          description: "",
          price: "0",
          pricing_name: "",
        },
      ],
    };

    if (submitValues) {
      currentData.current = submitValues;
      onStep("description");
    }

    return submitValues;
  };

  return (
    <CoreForm
      className="mb-8"
      form={form}
      onSubmit={onSubmit}
      forms={INPUT_DATA({ categoryData: category })}
    >
      <div className="grid grid-cols-3 items-start gap-4">
        <CoreDate
          id="start_date"
          label="Start Date"
          name="start_date"
          control={form.control}
          className="w-full"
        />
        <CoreDate
          id="ended_date"
          label="Ended Date"
          name="ended_date"
          control={form.control}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-3 items-start gap-4">
        <Input
          min="08:00:00"
          max="18:00:00"
          name="time"
          type="time"
          id="time"
          step="any"
          label="Select Time:"
          control={form.control}
        />
        <Select
          id="duration"
          label="Duration"
          name="duration"
          placeholder="Duration"
          data={[
            { value: 1800, label: "30 Minutes" },
            { value: 3600, label: "1 hour" },
            { value: 7200, label: "2 hour" },
            { value: 10800, label: "More or Less 3 hour" },
          ]}
          control={form.control}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="country"
          label="Country"
          name="country"
          placeholder="United States"
          data={country}
          emptyState="No Country Available"
          control={form.control}
        />
        <Input id="city" label="City" name="city" placeholder="New Jersey" control={form.control} />
      </div>
      <Button type="submit" className="flex items-center" disabled={state === "submitting"}>
        <Icon
          icon="material-symbols:check-small-rounded"
          className="mr-1 text-2xl text-neutral-200"
        />
        <p className="text-sm font-medium text-neutral-200 antialiased">Next</p>
      </Button>
    </CoreForm>
  );
};

export default About;
