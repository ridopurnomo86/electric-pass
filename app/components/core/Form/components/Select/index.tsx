import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/Popover";
import { Button } from "~/components/ui/Button";
import cn from "~/modules/cn";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/Command";
import React, { useState } from "react";
import CircularLoading from "~/components/core/CircularLoading";
import { InputPropsType } from "../../types";

const renderContent = ({
  data = [],
  isLoading,
  emptyState,
  content,
}: {
  data: InputPropsType["data"];
  isLoading: InputPropsType["isLoading"];
  emptyState: InputPropsType["emptyState"];
  content: React.ReactNode;
}) => {
  if (isLoading)
    return (
      <CommandGroup className="flex items-center justify-center py-10">
        <CircularLoading />
      </CommandGroup>
    );

  if (data?.length < 0 || !data?.length) return <CommandEmpty>{emptyState}</CommandEmpty>;

  return content;
};

const Select = ({
  label,
  placeholder,
  control,
  description,
  id,
  name,
  isDisabled = false,
  emptyState = "",
  data = [],
  isLoading = false,
  hasIcon = false,
  defaultValue,
}: InputPropsType) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");

  return (
    <FormField
      key={id}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                >
                  {selectedValue
                    ? data.find((item) => item.value === selectedValue)?.label
                    : placeholder}
                  <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput disabled={isDisabled} placeholder={placeholder} className="h-9" />
                <CommandList>
                  {renderContent({
                    isLoading,
                    data,
                    emptyState,
                    content: (
                      <CommandGroup>
                        {data?.map((item, idx) => (
                          <CommandItem
                            value={item.value}
                            key={idx}
                            onSelect={(currentValue) => {
                              setSelectedValue(currentValue);
                              field.onChange(currentValue === selectedValue ? "" : currentValue);
                              setOpen(false);
                            }}
                          >
                            {hasIcon && (
                              <div className="size-8">
                                <img className="size-full" src={item.image} alt={item.value} />
                              </div>
                            )}
                            &nbsp;
                            {item.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto size-4",
                                item.value === field.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ),
                  })}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Select;
