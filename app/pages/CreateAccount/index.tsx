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
      <main className="flex min-h-screen items-center justify-center py-8">
        <section className="mx-4 w-[600px]">
          <div className="rounded border bg-transparent p-8 ">
            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
            <p className="mb-4 text-sm text-muted-foreground">
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
