import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionData, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import Form from "~/components/core/Form";
import { useToast } from "~/components/ui/Toaster/useToast";
import {
  AccountProfileValidation,
  AccountProfileValidationType,
} from "~/data/form-validation/AccountProfileValidation";
import Select from "~/components/core/Form/components/Select";
import useGetCountries from "~/hooks/useGetCountries";
import { SettingsAccountLoader } from "services/main/settings/account";
import Input from "~/components/core/Form/components/Input";
import useUploadImage from "../hooks/useUploadImage";
import ProfileLayout from "../components/Layout";
import INPUT_DATA from "./input-data";
import Picture from "./Picture";

const Account = () => {
  const { toast } = useToast();
  const submit = useSubmit();
  const actionData = useActionData<{
    message: string;
    type: string;
    status: string;
  }>();
  const { user } = useLoaderData<typeof SettingsAccountLoader>();
  const { state } = useNavigation();
  const form = useForm<AccountProfileValidationType>({
    resolver: zodResolver(AccountProfileValidation),
    defaultValues: {
      address: user?.address ?? "",
      city: user?.city ?? "",
      country: user?.country ?? "",
      dialing_code: user?.dialing_code ?? "",
      phone_number: user?.phone_number ?? "",
    },
  });

  const { country, dialCode } = useGetCountries();

  const { isLoading, onSelectedImage, onUploadImage, previewImage, isImageEmpty, onDeleteImage } =
    useUploadImage({
      currentImage: user.image,
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

  const onSubmit = (values: AccountProfileValidationType) => {
    const submitValues = {
      ...values,
      phone_number: `${values.phone_number}`,
    };

    submit(submitValues, { method: "post", encType: "application/json" });
  };

  return (
    <ProfileLayout resolve={user}>
      <section>
        <div className="mb-4 border-b pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">Account</p>
          <p className="text-sm font-medium text-neutral-500">Update your account details here.</p>
        </div>
        <Picture
          isImageEmpty={isImageEmpty}
          name={user.name}
          isLoading={isLoading || state === "submitting"}
          onSelectedImage={onSelectedImage}
          onUploadImage={onUploadImage}
          onDeleteImage={onDeleteImage}
          previewImage={previewImage}
        />
        <Form form={form} onSubmit={onSubmit} forms={INPUT_DATA}>
          <div className="grid grid-cols-[10%_20%] gap-4">
            <Select
              id="dialing_code"
              label="Dialing Code"
              name="dialing_code"
              placeholder="+1"
              data={dialCode}
              control={form.control}
              hasIcon
            />
            <Input
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              placeholder="Phone Number"
              control={form.control}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              id="country"
              label="Country"
              name="country"
              placeholder="Choose Country"
              data={country}
              emptyState="No Country Available"
              control={form.control}
              defaultValue={form.getValues("country")}
            />
            <Input
              id="city"
              label="City"
              name="city"
              placeholder="New Jersey"
              control={form.control}
            />
          </div>
          <Button
            type="submit"
            className="text-neutral-200"
            disabled={state === "submitting" || isLoading}
          >
            Update Account
          </Button>
        </Form>
      </section>
    </ProfileLayout>
  );
};

export default Account;
