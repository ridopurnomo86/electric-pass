import { Control, FieldValues } from "react-hook-form";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Form as FormCore } from "~/components/ui/Form";
import TextArea from "./components/TextArea";
import Input from "./components/Input";
import Password from "./components/Password";
import RadioGroup from "./components/RadioGroup";
import { FormPropstype } from "./types";
import Date from "./components/Date";
import Select from "./components/Select";

const getComponent = (type: string) => {
  switch (type) {
    case "select":
      return Select;
    case "date":
      return Date;
    case "textarea":
      return TextArea;
    case "password":
      return Password;
    case "radio":
      return RadioGroup;
    default:
      return Input;
  }
};

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  forms = [],
  children,
  className = "",
  isSubmit = false,
}: FormPropstype<T>) => (
  <FormCore {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      <AuthenticityTokenInput name="csrf" />
      {forms.map((item) => {
        const Comp = getComponent(item.type);

        return (
          <Comp
            key={item.id}
            control={form.control as Control<FieldValues>}
            id={item.id}
            label={item.label}
            name={item.name}
            description={item.description}
            placeholder={item.placeholder}
            items={item.items}
            isDisabled={item.isDisabled || isSubmit}
            icon={item.icon}
            data={item.data}
            emptyState={item.emptyState}
            isLoading={item.isLoading}
          />
        );
      })}
      {children}
    </form>
  </FormCore>
);

export default Form;
