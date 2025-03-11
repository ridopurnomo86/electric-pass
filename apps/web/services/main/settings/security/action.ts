import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  ChangePasswordValidation,
  ChangePasswordValidationType,
} from "~/data/form-validation/ChangePasswordValidation";
import { authenticator } from "services/auth.server";
import { getSession } from "services/session.server";
import { encrypt } from "services/utils/cipher/encrypt";
import db from "@monorepo/database";

const SecurityAction = async ({ request }: ActionFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  const session = await getSession(request.headers.get("Cookie"));

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<ChangePasswordValidationType>(
    request,
    zodResolver(ChangePasswordValidation)
  );

  if (errors) return json({ errors, defaultValues });

  const matchUser = db.UserModel.authorizeUser({
    id: Number(user?.id),
    password: data.password,
  });

  if (!matchUser)
    return json({
      status: "Error",
      type: "error",
      message: "Something gone wrong",
    });

  const { hash } = await encrypt({ value: data.newPassword });

  const updatePassword = db.UserModel.updateUser({
    id: Number(user?.id),
    data: {
      password: hash,
    },
  });

  if (!updatePassword) {
    session.flash("change-password", {
      status: "Error",
      type: "error",
      message: "Password Incorrect",
    });

    return json({
      status: "Error",
      type: "error",
      message: "Password Incorrect",
    });
  }

  session.flash("change-password", {
    status: "Success",
    type: "success",
    message: "Success changing password",
  });

  return json({
    status: "Success",
    type: "success",
    message: `Success changing password`,
  });
};

export default SecurityAction;
