"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/Button";
import Form from "~/components/core/Form";
import ProfileLayout from "~/pages/Settings/components/Layout";
import {
  ChangePasswordValidation,
  ChangePasswordValidationType,
} from "~/data/form-validation/ChangePasswordValidation";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect } from "react";
import { useToast } from "~/components/ui/Toaster/useToast";
import INPUT_DATA from "./input-data";

const Security = () => {
  const submit = useSubmit();
  const { toast } = useToast();
  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();

  const { state } = useNavigation();
  const form = useForm<ChangePasswordValidationType>({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  useEffect(() => {
    if (actionData) {
      toast({
        title: actionData.status,
        description: actionData.message,
        variant: actionData.type === "success" ? "default" : "destructive",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  const onSubmit = (values: ChangePasswordValidationType) => {
    submit({ ...values }, { method: "post" });
  };

  return (
    <ProfileLayout>
      <section>
        <div className="mb-4 border-b pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">
            Security
          </p>
          <p className="text-sm font-medium text-neutral-500">
            Please enter your current password to change your password.
          </p>
        </div>
        <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
<<<<<<< HEAD:app/pages/Settings/Security/index.tsx
          <Button type="submit" className="text-neutral-200" disabled={state === "submitting"}>
=======
          <Button
            type="submit"
            className="text-neutral-200"
            disabled={state === "submitting"}
          >
>>>>>>> 4119967f4fd90070dabbb09e6375abaca5c4daeb:apps/web/app/pages/Settings/Security/index.tsx
            Update Password
          </Button>
        </Form>
      </section>
    </ProfileLayout>
  );
};

export default Security;
