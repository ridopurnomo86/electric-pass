import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  CreateAccountValidation,
  CreateAccountValidationType,
} from "~/data/form-validation/CreateAccountValidation";
import { commitSession, getSession } from "~/services/session.server";
import { encrypt } from "~/services/utils/cipher/encrypt";
import UserController from "~/services/controllers/user";
import { CreateAccountResponseType } from "./types";

const CreateAccountAction = async ({
  request,
}: ActionFunctionArgs): Promise<CreateAccountResponseType> => {
  const session = await getSession(request.headers.get("Cookie"));
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateAccountValidationType>(
    request,
    zodResolver(CreateAccountValidation),
  );

  if (errors) throw json({ errors, defaultValues });

  const { hash, salt } = await encrypt({ value: data.password });

  const registerUser = await UserController.registerUser({
    data,
    encryptPassword: hash,
    salt,
  });

  if (registerUser.status === 200) {
    session.flash("create-account", {
      status: "Success",
      type: "success",
      message: "Register Successfully",
    });

    json({
      status: "Success",
      type: "success",
      message: "Register Successfully",
    });

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({
    status: "Error",
    type: "error",
    message: "User has been registered.",
  });
};

export default CreateAccountAction;
