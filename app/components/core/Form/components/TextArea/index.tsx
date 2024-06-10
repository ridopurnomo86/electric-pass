import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Textarea as TextareaCore } from "~/components/ui/TextArea";
import { InputPropsType } from "../../types";

const TextArea = ({
  label,
  placeholder,
  control,
  description,
  id,
  name,
  isDisabled = false,
}: InputPropsType) => (
  <FormField
    key={id}
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <TextareaCore
            disabled={isDisabled}
            placeholder={placeholder}
            className="resize-none"
            {...field}
          />
        </FormControl>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default TextArea;
