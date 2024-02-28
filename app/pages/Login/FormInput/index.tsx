import Logo from "~/assets/elastic-pass-logo.svg";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/Form";
import { UseFormReturn } from "react-hook-form";
import { LoginValidationType } from "~/data/form-validation/LoginValidation";
import { Link } from "@remix-run/react";

type FormInputPropsType = {
  form: UseFormReturn<LoginValidationType>;
  onSubmit: (values: LoginValidationType) => void;
};

const FormInput = ({ onSubmit, form }: FormInputPropsType) => (
  <div className="w-[500px] px-8 lg:px-16 min-h-screen flex flex-col justify-center">
    <div className="w-full mb-4">
      <img src={Logo} alt="elastic-pass-logo" className="w-[200px]" />
    </div>
    <p className="font-semibold text-lg lg:text-xl antialiased text-neutral-900 mt-4">
      Welcome Back
    </p>
    <p className="font-medium text-sm antialiased text-neutral-600 mt-2">
      Join and feel experience the ease of transactions and managing events at the Elastic Pass.
    </p>
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
        <Button type="submit" className="text-neutral-200">
          Login
        </Button>
        <p className="text-sm font-medium text-neutral-600 antialiased mt-8">
          Need an account?&nbsp;
          <Link to="/create-account">
            <span className="text-black">Create an Account.</span>
          </Link>
        </p>
      </form>
    </Form>
  </div>
);

export default FormInput;
