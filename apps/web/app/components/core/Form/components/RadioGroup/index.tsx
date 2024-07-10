import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/Form";
import {
  RadioGroup as CoreRadioGroup,
  RadioGroupItem as CoreRadioItem,
} from "~/components/ui/RadioGroup";
import { InputPropsType } from "../../types";

const RadioGroup = ({ label, control, id, name, items = [] }: InputPropsType) => (
  <FormField
    key={id}
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="py-3">
        <FormLabel className="flex items-center gap-1">{label}</FormLabel>
        <FormControl>
          <CoreRadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex"
          >
            {items.map((item) => (
              <FormItem
                key={item.id}
                className="flex w-auto items-center space-x-3 space-y-0 rounded border px-4 py-2"
              >
                <FormControl>
                  <CoreRadioItem value={item.value} />
                </FormControl>
                <FormLabel className="ml-2 font-normal">{item.label}</FormLabel>
              </FormItem>
            ))}
          </CoreRadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default RadioGroup;
