import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Icon } from "@iconify/react";
import { Input as InputCore } from "~/components/ui/Input";
import { InputPropsType } from "../../types";

const Input = ({
  label,
  placeholder,
  control,
  description,
  id,
  name,
  isDisabled = false,
  icon = "",
}: InputPropsType) => (
  <FormField
    key={id}
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <div className="relative">
          <FormControl>
            <InputCore
              className={`${icon ? "pl-9" : ""}`}
              disabled={isDisabled}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <Icon
            icon={icon}
            className="absolute left-3 top-2 cursor-pointer text-xl text-neutral-600"
          />
        </div>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Input;
