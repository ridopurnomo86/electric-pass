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
  <div className="relative flex min-h-screen w-[500px] flex-col justify-center px-8 lg:px-16">
    <Link to="/" className="absolute top-8 mb-4 w-full">
      <img src={Logo} alt="electric-pass-logo" className="w-[200px]" />
    </Link>
    {actionData?.type === "error" && state !== "submitting" && (
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>{actionData?.status}</AlertTitle>
        <AlertDescription>{actionData?.message}</AlertDescription>
      </Alert>
    )}
    <p className="mt-4 text-lg font-semibold text-neutral-900 antialiased lg:text-xl">
      Forgot your password?
    </p>
    <p className="mt-2 text-sm font-medium text-neutral-600 antialiased">
      Enter your email below to receive a password reset link.
    </p>
    <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA} className="mt-4">
      <Button type="submit" className="text-neutral-200" disabled={isSubmit}>
        Reset Password
      </Button>
      <p className="mt-8 text-sm font-medium text-neutral-600 antialiased">
        Need an account?&nbsp;
        <Link to="/create-account">
          <span className="text-black">Create an Account.</span>
        </Link>
      </p>
    </Form>
    <footer className="absolute bottom-8">
      <div className="flex items-center gap-4">
        <Link to="#" className="text-sm font-medium text-neutral-600 antialiased">
          Help Center
        </Link>
        <Link to="#" className="text-sm font-medium text-neutral-600 antialiased">
          About
        </Link>
        <span className="h-[32px] w-px bg-neutral-600 text-neutral-600"></span>
        <Link to="#" className="text-sm font-medium text-neutral-600 antialiased">
          Terms
        </Link>
        <Link to="#" className="text-sm font-medium text-neutral-600 antialiased">
          Privacy Policy
        </Link>
      </div>
    </footer>
  </div>
);

export default FormInput;
