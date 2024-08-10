import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Icon } from "@iconify/react";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import { Button } from "~/components/ui/Button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "~/components/ui/Calendar";
import cn from "~/modules/cn";
import { format } from "date-fns";
import { InputPropsType } from "../../types";

const Date = ({
  label,
  control,
  description,
  id,
  name,
  isDisabled = false,
  icon = "",
  className,
}: InputPropsType) => (
  <FormField
    key={id}
    control={control}
    name={name}
    disabled={isDisabled}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground",
                  className
                )}
              >
                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                {icon ? (
                  <Icon icon={icon} />
                ) : (
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              disabled={isDisabled}
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormDescription>{description}</FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Date;
