import { Control, FieldValues, UseFormReturn } from "react-hook-form";

type RadioItemsType = {
  id: string;
  value: string;
  label: string;
};

export type Forms = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type: string;
  description?: string;
  items?: Array<RadioItemsType>;
  isDisabled?: boolean;
};

export type InputPropsType = {
  label: string;
  placeholder?: string;
  control: Control<FieldValues>;
  description?: string;
  id: string;
  name: string;
  items?: Array<RadioItemsType>;
  isDisabled?: boolean;
};

export type FormPropstype<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  forms: Array<Forms>;
  children?: React.ReactNode | React.ReactElement;
  className?: string;
};
