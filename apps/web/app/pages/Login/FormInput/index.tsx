import Logo from "~/assets/electric-pass-logo.svg";
import { Button } from "~/components/ui/Button";
import Form from "~/components/core/Form";
import { UseFormReturn } from "react-hook-form";
import { LoginValidationType } from "~/data/form-validation/LoginValidation";
import { Link } from "@remix-run/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/Alert";
import INPUT_DATA from "./input-data";

type FormInputPropsType = {
  form: UseFormReturn<LoginValidationType>;
  onSubmit: (values: LoginValidationType) => void;
  isSubmit: boolean;
  actionData?: {
    type: string;
    status: string;
    message: string;
  };
  state: string;
};

const FormInput = ({ onSubmit, form, isSubmit, actionData, state }: FormInputPropsType) => (
  <div className="flex min-h-screen w-[500px] flex-col justify-center px-8 lg:px-16">
    <div className="mb-4 w-full">
      <img src={Logo} alt="electric-pass-logo" className="w-[200px]" />
    </div>
    {actionData?.type === "error" && state !== "submitting" && (
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>{actionData?.status}</AlertTitle>
        <AlertDescription>{actionData?.message}</AlertDescription>
      </Alert>
    )}
    <p className="mt-4 text-lg font-semibold text-neutral-900 antialiased lg:text-xl">
      Welcome Back
    </p>
    <p className="mt-2 text-sm font-medium text-neutral-600 antialiased">
      Join and feel experience the ease of transactions and managing events at the Electric Pass.
    </p>
    <Form isSubmit={isSubmit} form={form} onSubmit={onSubmit} forms={INPUT_DATA} className="mt-4">
      <Button type="submit" className="text-neutral-200" disabled={isSubmit}>
        Login
      </Button>
      <p className="mt-8 text-sm font-medium text-neutral-600 antialiased">
        Need an account?&nbsp;
        <Link to="/create-account">
          <span className="text-black">Create an Account.</span>
        </Link>
      </p>
    </Form>
  </div>
);

export default FormInput;
