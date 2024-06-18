/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, UseFormReturn } from "react-hook-form";

type RadioItemsType = {
  id: string;
  value: string;
  label: string;
};

type SelectDataType = {
  value: string;
  label: string;
};

export type Forms = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  description?: string;
  items?: Array<RadioItemsType>;
  isDisabled?: boolean;
  icon?: string;
  type: string;
  data?: Array<SelectDataType>;
  emptyState?: string;
  isLoading?: boolean;
};

export type InputPropsType = {
  label: string;
  placeholder?: string;
  control: Control<FieldValues | any>;
  description?: string;
  id: string;
  name: string;
  items?: Array<RadioItemsType>;
  isDisabled?: boolean;
  icon?: string;
  data?: Array<SelectDataType>;
  emptyState?: string;
  isLoading?: boolean;
};

export type FormPropstype<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  forms: Array<Forms>;
  children?: React.ReactNode | React.ReactElement;
  className?: string;
};
