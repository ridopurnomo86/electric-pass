import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  AccountProfileValidationType,
  AccountProfileValidation,
} from "~/data/form-validation/AccountProfileValidation";
import { authenticator } from "services/auth.server";
import UserModel from "services/models/user";
import { getSession } from "services/session.server";

const SettingsAccountAction = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const session = await getSession(request.headers.get("Cookie"));

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<AccountProfileValidationType>(
    request,
    zodResolver(AccountProfileValidation)
  );

  if (errors) return json({ errors, defaultValues });

  const updateUser = await UserModel.updateUser({
    id: Number(user?.id),
    data: {
      address: data.address,
      dialing_code: data.dialing_code,
      phone_number: data.phone_number,
      country: data.country,
      city: data.city,
    },
  });

  if (updateUser) {
    session.flash("update-profile", {
      status: "Success",
      type: "success",
      message: "Success updating profile",
    });

    return json({
      status: "Success",
      type: "success",
      message: "Success updating profile",
    });
  }

  return json({
    status: "Error",
    type: "error",
    message: "Something gone wrong",
  });
};

export default SettingsAccountAction;
