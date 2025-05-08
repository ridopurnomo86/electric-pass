import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { AuthorizationError } from "remix-auth";

const LoginAction = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      failureRedirect: "/login",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response || error instanceof AuthorizationError) return error;
  }
};

export default LoginAction;
