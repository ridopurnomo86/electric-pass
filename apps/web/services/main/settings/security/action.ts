import { zodResolver } from "@hookform/resolvers/zod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { getValidatedFormData } from "remix-hook-form";
import {
  ChangePasswordValidation,
  ChangePasswordValidationType,
} from "~/data/form-validation/ChangePasswordValidation";
import { authenticator } from "services/auth.server";
import { Prisma, db } from "services/prisma.server";
import { getSession } from "services/session.server";
import { decrypt, encrypt } from "services/utils/cipher/encrypt";

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

  try {
    const checkingUser = await db.user.findFirst({
      where: {
        id: user?.id,
      },
    });

    const match = await decrypt({
      hash: checkingUser?.password as string,
      value: data.password,
    });

    if (match) {
      const { hash } = await encrypt({ value: data.newPassword });

      await db.user.update({
        where: { id: user?.id },
        data: { password: hash },
      });

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
    }

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
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError)
      return json({
        status: "Error",
        type: "error",
        message: "Something gone wrong",
      });

    throw json(err);
  }
};

export default SecurityAction;
