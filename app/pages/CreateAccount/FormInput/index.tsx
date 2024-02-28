import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "~/components/ui/Form";
import { UseFormReturn } from "react-hook-form";
import { Link } from "@remix-run/react";
import { CreateAccountValidationType } from "~/data/form-validation/CreateAccountValidation";
import { Icon } from "@iconify/react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/RadioGroup";

type FormInputPropsType = {
  form: UseFormReturn<CreateAccountValidationType>;
  onSubmit: (values: CreateAccountValidationType) => void;
};

const FormInput = ({ onSubmit, form }: FormInputPropsType) => (
  <div className="w-full flex flex-col justify-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="zed@email.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
              <div className="flex items-center mt-8">
                <Icon icon="ph:check-fat-fill" className="text-md text-neutral-600 mr-1" />
                <FormDescription>Must be at least 8 characters</FormDescription>
              </div>
              <div className="flex items-center">
                <Icon icon="ph:check-fat-fill" className="text-md text-neutral-600 mr-1" />
                <FormDescription>Does not contain your email address</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_type"
          render={({ field }) => (
            <FormItem className="pt-3 pb-3">
              <FormLabel className="flex gap-1 items-center">
                Select type of your account
                <Icon icon="mingcute:information-line" className="mt-[2px]" />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 border px-4 py-2 w-auto rounded w-fit">
                    <FormControl>
                      <RadioGroupItem value="visitor" />
                    </FormControl>
                    <FormLabel className="font-normal ml-2">Visitor</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border px-4 py-2 w-auto rounded w-fit">
                    <FormControl>
                      <RadioGroupItem value="event_organizer" />
                    </FormControl>
                    <FormLabel className="font-normal ml-2">Event Organizer</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-sm font-medium text-neutral-600 antialiased">
          By clicking continue, you agree to our Terms of Service and Privacy Policy.
        </p>
        <Button type="submit" className="text-neutral-200">
          Create an Account.
        </Button>
        <p className="text-sm font-medium text-neutral-600 antialiased">
          have an account?&nbsp;
          <Link to="/login">
            <span className="text-black">login an account.</span>
          </Link>
        </p>
      </form>
    </Form>
  </div>
);

export default FormInput;
