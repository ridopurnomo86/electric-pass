import { useRemixForm } from "remix-hook-form";
import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateAccountValidation,
  CreateAccountValidationType,
} from "~/data/form-validation/CreateAccountValidation";
import Mainlayout from "~/components/layout/MainLayout";
import { useActionData, useNavigation } from "@remix-run/react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/Alert";
import { CreateAccountResponseType } from "~/services/create-account/types";

const CreateAccount = () => {
  const { state } = useNavigation();
  const actionData = useActionData<CreateAccountResponseType>();
  const form = useRemixForm<CreateAccountValidationType>({
    resolver: zodResolver(CreateAccountValidation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      account_type: "visitor",
    },
    mode: "onSubmit",
  });

  return (
    <Mainlayout>
      <main className="flex min-h-screen items-center justify-center py-8">
        <section className="mx-4 w-[600px]">
          <div className="rounded border bg-transparent p-8">
            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
            <p className="mb-4 text-sm text-muted-foreground">
              Enter your email below to create your account.
            </p>
            {actionData?.type === "error" && state !== "submitting" && (
              <Alert variant="destructive">
                <AlertTitle>{actionData?.status}</AlertTitle>
                <AlertDescription>{actionData?.message}</AlertDescription>
              </Alert>
            )}
            <FormInput
              form={form}
              onSubmit={form.handleSubmit}
              isLoading={state === "submitting"}
            />
          </div>
        </section>
      </main>
    </Mainlayout>
  );
};

export default CreateAccount;
