import { Button } from "~/components/ui/Button";
import { Link } from "@remix-run/react";
import { UseFormReturn } from "react-hook-form";
import { CreateAccountValidationType } from "~/data/form-validation/CreateAccountValidation";
import Form from "~/components/core/Form";
import INPUT_DATA from "./input-data";

type FormInputPropsType = {
  form: UseFormReturn<CreateAccountValidationType>;
  onSubmit: (values: CreateAccountValidationType) => void;
  isSubmit: boolean;
};

const FormInput = ({ onSubmit, form, isSubmit }: FormInputPropsType) => (
  <div className="flex w-full flex-col justify-center">
    <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA} className="mt-4">
      <p className="text-sm font-medium text-neutral-600 antialiased">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </p>
      <Button type="submit" className="text-neutral-200" disabled={isSubmit}>
        Create an Account.
      </Button>
      <p className="text-sm font-medium text-neutral-600 antialiased">
        have an account?&nbsp;
        <Link to="/login">
          <span className="text-black">login an account.</span>
        </Link>
      </p>
    </Form>
  </div>
);

export default FormInput;
