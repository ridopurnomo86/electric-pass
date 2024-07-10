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
import useGetCountries from "~/hooks/useGetCountries";
import Input from "~/components/core/Form/components/Input";
import Select from "~/components/core/Form/components/Select";
import INPUT_DATA from "./input-data";

type FormDialogPropsType = {
  form: UseFormReturn<AddEventValidationType>;
  onSubmit: (values: AddEventValidationType) => void;
  isSubmit: boolean;
};

const FormDialog = ({
  onSubmit,
  form,
  isSubmit = false,
}: FormDialogPropsType) => {
  const { country } = useGetCountries();

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
              placeholder="United States"
              data={country}
              emptyState="No Country Available"
              control={form.control}
            />
            <Input
              id="city"
              label="City"
              name="city"
              placeholder="New Jersey"
              control={form.control}
            />
          </div>
          <AlertDialogFooter className="gap-4">
            <Button
              type="submit"
              className="flex items-center"
              disabled={isSubmit}
            >
              <Icon
                icon="material-symbols:check-small-rounded"
                className="mr-1 text-2xl text-neutral-200"
              />
              <p className="text-sm font-medium text-neutral-200 antialiased">
                Save
              </p>
            </Button>
            <AlertDialogCancel disabled={isSubmit}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormDialog;
