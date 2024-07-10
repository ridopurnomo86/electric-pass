import { LoaderFunction } from "@remix-run/node";
import { getSession } from "~/services/session.server";
import { authenticator } from "~/services/auth.server";
import sessionResponse from "~/services/utils/response/sessionResponse";

const LoginLoader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const createAccountSessionMessage = session.get("create-account") || null;
  const errorSessionMessage =
    session.get(authenticator.sessionErrorKey) || null;

  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  if (errorSessionMessage || errorSessionMessage?.message)
    return sessionResponse(
      errorSessionMessage,
      JSON.parse(errorSessionMessage?.message),
    );

  if (createAccountSessionMessage)
    return sessionResponse(
      createAccountSessionMessage,
      createAccountSessionMessage,
    );

  return user;
};

export default LoginLoader;
