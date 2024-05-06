"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/Button";
import Form from "~/components/core/Form";
import ProfileLayout from "~/pages/Settings/components/Layout";
import INPUT_DATA from "./input-data";
import {
  ChangePasswordValidation,
  ChangePasswordValidationType,
} from "~/data/form-validation/ChangePasswordValidation";

const Security = () => {
  const form = useForm<ChangePasswordValidationType>({
    resolver: zodResolver(ChangePasswordValidation),
    defaultValues: {
      password: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordValidationType) => values;

  return (
    <ProfileLayout>
      <section>
        <div className="mb-4 border-b-[1px] pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">Security</p>
          <p className="text-sm font-medium text-neutral-500">
            Please enter your current password to change your password.
          </p>
        </div>
        <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
          <Button type="submit" className="text-neutral-200">
            Update Password
          </Button>
        </Form>
      </section>
    </ProfileLayout>
  );
};

export default Security;
