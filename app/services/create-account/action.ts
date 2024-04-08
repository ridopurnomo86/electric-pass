import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  CreateAccountValidation,
  CreateAccountValidationType,
} from "~/data/form-validation/CreateAccountValidation";
import bcrypt from "bcryptjs";
import { Prisma, db } from "../prisma.server";
import { commitSession, getSession } from "../session.server";

const CreateAccountAction = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<CreateAccountValidationType>(
    request,
    zodResolver(CreateAccountValidation)
  );

  if (errors) return json({ errors, defaultValues });

  const salt = await bcrypt.genSalt();
  const encryptPassword = await bcrypt.hash(data.password, salt);

  try {
    const createUser = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: encryptPassword,
        role: data.account_type,
      },
    });

    const session = await getSession(request.headers.get("Cookie"));

    session.flash("create-account", {
      status: "Success",
      type: "success",
      message: "Register Successfully",
    });

    if (createUser) {
      json({ status: "Success", type: "success", message: "Register Successfully" });
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }
    return json({ status: "Error", type: "error", message: "Sorry, email is exist" });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError)
      return json({
        status: "Error",
        type: "error",
        message: "A new user cannot be created with this email.",
      });
    throw json(err);
  }
};

export default CreateAccountAction;
