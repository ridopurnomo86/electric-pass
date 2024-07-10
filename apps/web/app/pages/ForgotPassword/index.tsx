import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD:app/pages/ForgotPassword/index.tsx
import { LoginValidation, LoginValidationType } from "~/data/form-validation/LoginValidation";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
=======
import {
  LoginValidation,
  LoginValidationType,
} from "~/data/form-validation/LoginValidation";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/pages/ForgotPassword/index.tsx
import { useToast } from "~/components/ui/Toaster/useToast";
import { useEffect } from "react";
import FormInput from "./FormInput";
import Thumbnail from "./Thumbnail";

const ForgotPassword = () => {
  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();
  const { state } = useNavigation();
  const submit = useSubmit();
  const { toast } = useToast();
  const loader =
    useLoaderData<{
      message: { message: string; type: string; status: string };
    }>() || {};
  const form = useForm<LoginValidationType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (loader?.message) {
      toast({
        title: loader?.message.status,
        description: loader?.message.message,
        variant: loader?.message.type === "success" ? "default" : "destructive",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loader]);

  const onSubmit = (values: LoginValidationType) => {
    submit({ ...values }, { method: "post" });
  };

  return (
    <main className="min-h-screen w-full overflow-hidden">
      <section className="relative flex">
        <FormInput
          form={form}
          onSubmit={onSubmit}
          isSubmit={state === "submitting"}
          actionData={actionData}
          state={state}
        />
        <Thumbnail />
      </section>
    </main>
  );
};

export default ForgotPassword;
