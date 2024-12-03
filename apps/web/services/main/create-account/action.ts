import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  CreateAccountValidation,
  CreateAccountValidationType,
} from "~/data/form-validation/CreateAccountValidation";
import { commitSession, getSession } from "services/session.server";
import { encrypt } from "services/utils/cipher/encrypt";
import UserModel from "services/models/user";
import { csrf } from "services/csrf.server";
import { CSRFError } from "remix-utils/csrf/server";
import { CreateAccountResponseType } from "./types";

const CreateAccountAction = async ({
  request,
}: ActionFunctionArgs): Promise<CreateAccountResponseType> => {
  const session = await getSession(request.headers.get("Cookie"));

  await csrf.validate(request).catch((err) => {
    if (err instanceof CSRFError) {
      throw new Response(null, {
        status: 403,
        statusText: "Forbidden",
      });
    }
  });

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateAccountValidationType>(
    request,
    zodResolver(CreateAccountValidation)
  );

  if (errors) throw json({ errors, defaultValues });

  const { hash, salt } = await encrypt({ value: data.password });

  const registerUser = await UserModel.registerUser({
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
    message: "User / Email has been registered.",
  });
};

export default CreateAccountAction;
