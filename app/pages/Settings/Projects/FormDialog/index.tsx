import { Icon } from "@iconify/react";
import { Button } from "~/components/ui/Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/AlertDialog";
import Form from "~/components/core/Form";
import { AddEventValidationType } from "~/data/form-validation/AddEventValidation";
import { UseFormReturn } from "react-hook-form";
import axios from "axios";
import useSWR from "swr";
import Select from "~/components/core/Form/components/Select";
import COUNTRY_DATA from "~/data/static-data/country";
import INPUT_DATA from "./input-data";

type ResponseType = {
  error: boolean;
  data: string[];
  msg: string;
};

type FormDialogPropsType = {
  form: UseFormReturn<AddEventValidationType>;
  onSubmit: (values: AddEventValidationType) => void;
  isSubmit: boolean;
  country: string;
};

const FormDialog = ({ onSubmit, form, isSubmit = false, country }: FormDialogPropsType) => {
  const fetcher = (url: string) =>
    axios
      .post(url, {
        country,
      })
      .then((res) => res.data);

  const { data: cities, isLoading: isCitiesLoading } = useSWR<ResponseType>(
    country ? "https://countriesnow.space/api/v0.1/countries/cities" : null,
    fetcher
  );

  const allCities = cities?.data?.map((item) => ({ label: item, value: item })) || [];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Icon icon="mi:add" className="mr-1 text-base font-medium" />
          <p className="text-sm font-medium antialiased">Add Event</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded">
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Event</AlertDialogTitle>
        </AlertDialogHeader>
        <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
          <div className="grid grid-cols-2 gap-4">
            <Select
              id="country"
              label="Country"
              name="country"
              placeholder="Choose Country"
              data={COUNTRY_DATA}
              emptyState="No Country Available"
              control={form.control}
            />
            <Select
              id="city"
              label="City"
              name="city"
              placeholder="Choose City"
              data={allCities}
              emptyState="No City Available"
              isLoading={isCitiesLoading}
              control={form.control}
            />
          </div>
          <AlertDialogFooter className="gap-4">
            <Button type="submit" className="flex items-center" disabled={isSubmit}>
              <Icon
                icon="material-symbols:check-small-rounded"
                className="mr-1 text-2xl text-neutral-200"
              />
              <p className="text-sm font-medium text-neutral-200 antialiased">Save</p>
            </Button>
            <AlertDialogCancel disabled={isSubmit}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormDialog;
