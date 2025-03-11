import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  SettingsBasicInfoValidation,
  SettingsBasicInfoValidationType,
} from "~/data/form-validation/ProfileValidation";
import { authenticator } from "services/auth.server";
import db from "@monorepo/database";
import { getSession } from "services/session.server";

const SettingsBasicInfoAction = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const session = await getSession(request.headers.get("Cookie"));

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<SettingsBasicInfoValidationType>(
    request,
    zodResolver(SettingsBasicInfoValidation)
  );

  if (errors) return json({ errors, defaultValues });

  const updateUser = await db.UserModel.updateUser({
    id: Number(user?.id),
    data: {
      name: data?.name,
      email: data?.email,
      bio: data?.bio,
    },
  });

  if (updateUser) {
    session.flash("update-basic-info", {
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

export default SettingsBasicInfoAction;
