import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "services/auth.server";
import { AuthorizationError } from "remix-auth";
import { csrf } from "services/csrf.server";
import { CSRFError } from "remix-utils/csrf/server";

const LoginAction = async ({ request }: ActionFunctionArgs) => {
  try {
    await csrf.validate(request);
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      failureRedirect: "/login",
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof CSRFError)
      throw new Response(null, {
        status: 403,
        statusText: "Forbidden",
      });
    if (error instanceof Response || error instanceof AuthorizationError) return error;
  }
};

export default LoginAction;
