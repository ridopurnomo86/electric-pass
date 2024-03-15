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
import { Link } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { RadioGroup, RadioGroupItem } from "~/components/ui/RadioGroup";

type FormInputPropsType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  onSubmit: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void>;
  isLoading: boolean;
};

const FormInput = ({ onSubmit, form, isLoading }: FormInputPropsType) => (
  <div className="flex w-full flex-col justify-center">
    <Form {...form}>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name / Company Name</FormLabel>
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
              <div className="mt-8 flex items-center">
                <Icon icon="ph:check-fat-fill" className="mr-1 text-neutral-600" />
                <FormDescription>Must be at least 8 characters</FormDescription>
              </div>
              <div className="flex items-center">
                <Icon icon="ph:check-fat-fill" className="mr-1 text-neutral-600" />
                <FormDescription>Does not contain your email address</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="account_type"
          render={({ field }) => (
            <FormItem className="py-3">
              <FormLabel className="flex items-center gap-1">
                Select type of your account
                <Icon icon="mingcute:information-line" className="mt-[2px]" />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex"
                >
                  <FormItem className="flex w-auto items-center space-x-3 space-y-0 rounded border px-4 py-2">
                    <FormControl>
                      <RadioGroupItem value="visitor" />
                    </FormControl>
                    <FormLabel className="ml-2 font-normal">Visitor</FormLabel>
                  </FormItem>
                  <FormItem className="flex w-auto items-center space-x-3 space-y-0 rounded border px-4 py-2">
                    <FormControl>
                      <RadioGroupItem value="event_organizer" />
                    </FormControl>
                    <FormLabel className="ml-2 font-normal">Event Organizer</FormLabel>
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
        <Button type="submit" className="text-neutral-200" disabled={isLoading}>
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
