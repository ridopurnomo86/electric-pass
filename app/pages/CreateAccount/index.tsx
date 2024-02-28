import { useForm } from "react-hook-form";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAccountValidation,
  CreateAccountValidationType,
} from "~/data/form-validation/CreateAccountValidation";
import Mainlayout from "~/components/layout/MainLayout";

const CreateAccount = () => {
  const form = useForm<CreateAccountValidationType>({
    resolver: zodResolver(CreateAccountValidation),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      account_type: "visitor",
    },
  });

  const onSubmit = (values: CreateAccountValidationType) => values;

  return (
    <Mainlayout>
      <main className="flex items-center justify-center min-h-screen py-8">
        <section className="w-[600px] mx-4">
          <div className="rounded bg-transparent p-8 border ">
            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your email below to create your account.
            </p>
            <FormInput form={form} onSubmit={onSubmit} />
          </div>
        </section>
      </main>
    </Mainlayout>
  );
};

export default CreateAccount;
