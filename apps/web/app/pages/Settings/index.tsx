"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/Button";
import Form from "~/components/core/Form";
import {
  SettingsBasicInfoValidation,
  SettingsBasicInfoValidationType,
} from "~/data/form-validation/ProfileValidation";
import { Icon } from "@iconify/react";
import { useCachedLoaderData } from "remix-client-cache";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { SettingsBasicInfoLoader } from "services/main/settings";
import { useToast } from "~/components/ui/Toaster/useToast";
import { useEffect } from "react";
import INPUT_DATA from "./input-data";
import ProfileLayout from "./components/Layout";

const Profile = () => {
  const submit = useSubmit();
  const { state } = useNavigation();
  const { user } = useCachedLoaderData<typeof SettingsBasicInfoLoader>();

  const { toast } = useToast();
  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();

  const form = useForm({
    resolver: zodResolver(SettingsBasicInfoValidation),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      bio: user?.bio || "",
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

  const onSubmit = (values: SettingsBasicInfoValidationType) =>
    submit({ ...values }, { method: "post", action: "/settings" });

  return (
    <ProfileLayout resolve={user}>
      <section>
        <div className="mb-4 border-b pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">Basic Info</p>
          <p className="text-sm font-medium text-neutral-500">
            Tell us about your basic info details.
          </p>
        </div>
        <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
          <Button
            type="submit"
            className="mt-6 flex items-center"
            disabled={state === "submitting"}
          >
            <Icon
              icon="material-symbols:check-small-rounded"
              className="mr-1 text-2xl text-neutral-200"
            />
            <p className="text-sm font-medium text-neutral-200 antialiased">Save</p>
          </Button>
        </Form>
      </section>
    </ProfileLayout>
  );
};

export default Profile;
