import { ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";

const LoginAction = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      failureRedirect: "/login",
      throwOnError: true,
    });
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      // here the error is related to the authentication process
    }
    // here the error is a generic error that another reason may throw
  }
};

export default LoginAction;
