import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Input as InputCore } from "~/components/ui/Input";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { InputPropsType } from "../../types";

const Password = ({
  label,
  placeholder,
  control,
  description,
  id,
  name,
  isDisabled = false,
}: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
                disabled={isDisabled}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
              />
            </FormControl>
            {showPassword ? (
              <Icon
                onClick={() => setShowPassword((prev) => !prev)}
                icon="ion:eye-off-outline"
                className="absolute right-3 top-2 cursor-pointer text-xl text-neutral-600"
              />
            ) : (
              <Icon
                onClick={() => setShowPassword((prev) => !prev)}
                icon="ion:eye-outline"
                className="absolute right-3 top-2 cursor-pointer text-xl text-neutral-600"
              />
            )}
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Password;
